"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { VoiceAgentStatus } from "@/lib/voice-agent-config";
import { orbVertexShader } from "./shaders/orb.vert";
import { orbFragmentShader } from "./shaders/orb.frag";

interface AudioReactiveOrbProps {
  status: VoiceAgentStatus;
  audioLevel: number;
  frequencyData: Float32Array;
}

// Status color mapping
const STATUS_COLORS: Record<VoiceAgentStatus, THREE.Color> = {
  idle: new THREE.Color(0x6366f1),
  listening: new THREE.Color(0xef4444),
  processing: new THREE.Color(0xf59e0b),
  speaking: new THREE.Color(0x22c55e),
  error: new THREE.Color(0xef4444),
};

const STATUS_SECONDARY_COLORS: Record<VoiceAgentStatus, THREE.Color> = {
  idle: new THREE.Color(0x818cf8),
  listening: new THREE.Color(0xfca5a5),
  processing: new THREE.Color(0xfcd34d),
  speaking: new THREE.Color(0x86efac),
  error: new THREE.Color(0xfca5a5),
};

const STATUS_INDEX: Record<VoiceAgentStatus, number> = {
  idle: 0,
  listening: 1,
  processing: 2,
  speaking: 3,
  error: 4,
};

export default function AudioReactiveOrb({
  status,
  audioLevel,
  frequencyData,
}: AudioReactiveOrbProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Reusable objects to avoid GC
  const targetColor = useMemo(() => new THREE.Color(), []);
  const targetSecondaryColor = useMemo(() => new THREE.Color(), []);
  const currentColor = useMemo(() => new THREE.Color(0x6366f1), []);
  const currentSecondaryColor = useMemo(() => new THREE.Color(0x818cf8), []);

  // Uniforms (stable reference)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAudioLevel: { value: 0 },
      uFrequencyData: { value: new Float32Array(128) },
      uColor: { value: new THREE.Color(0x6366f1) },
      uSecondaryColor: { value: new THREE.Color(0x818cf8) },
      uFresnelPower: { value: 2.0 },
      uDisplacementScale: { value: 0.15 },
      uNoiseScale: { value: 2.0 },
      uNoiseSpeed: { value: 0.5 },
      uIridescence: { value: 0.3 },
      uGlassiness: { value: 0.8 },
      uStatus: { value: 0 },
    }),
    []
  );

  // High-detail icosahedron geometry
  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(1, 64);
  }, []);

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    const mat = materialRef.current;

    // Update time
    mat.uniforms.uTime.value += delta;

    // Smoothly interpolate audio level
    mat.uniforms.uAudioLevel.value +=
      (audioLevel - mat.uniforms.uAudioLevel.value) * 0.1;

    // Update frequency data
    if (frequencyData.length > 0) {
      mat.uniforms.uFrequencyData.value = frequencyData;
    }

    // Smoothly transition colors
    targetColor.copy(STATUS_COLORS[status] || STATUS_COLORS.idle);
    targetSecondaryColor.copy(
      STATUS_SECONDARY_COLORS[status] || STATUS_SECONDARY_COLORS.idle
    );
    currentColor.lerp(targetColor, 0.05);
    currentSecondaryColor.lerp(targetSecondaryColor, 0.05);
    mat.uniforms.uColor.value.copy(currentColor);
    mat.uniforms.uSecondaryColor.value.copy(currentSecondaryColor);

    // Update status uniform
    mat.uniforms.uStatus.value = STATUS_INDEX[status] ?? 0;

    // Status-specific shader parameters
    switch (status) {
      case "idle":
        mat.uniforms.uNoiseSpeed.value = 0.3;
        mat.uniforms.uDisplacementScale.value = 0.08;
        mat.uniforms.uIridescence.value = 0.4;
        break;
      case "listening":
        mat.uniforms.uNoiseSpeed.value = 0.8;
        mat.uniforms.uDisplacementScale.value = 0.12 + audioLevel * 0.1;
        mat.uniforms.uIridescence.value = 0.2;
        break;
      case "processing":
        mat.uniforms.uNoiseSpeed.value = 1.2;
        mat.uniforms.uDisplacementScale.value = 0.15;
        mat.uniforms.uIridescence.value = 0.6;
        break;
      case "speaking":
        mat.uniforms.uNoiseSpeed.value = 0.6;
        mat.uniforms.uDisplacementScale.value = 0.1 + audioLevel * 0.25;
        mat.uniforms.uIridescence.value = 0.5;
        break;
      case "error":
        mat.uniforms.uNoiseSpeed.value = 1.5;
        mat.uniforms.uDisplacementScale.value = 0.2;
        mat.uniforms.uIridescence.value = 0.1;
        break;
    }
  });

  return (
    <mesh geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={orbVertexShader}
        fragmentShader={orbFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
