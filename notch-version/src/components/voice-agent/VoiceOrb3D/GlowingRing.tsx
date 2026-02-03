"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { VoiceAgentStatus } from "@/lib/voice-agent-config";

interface GlowingRingProps {
  status: VoiceAgentStatus;
  audioLevel: number;
  radius?: number;
}

// Soft Standards colors
const RING_COLOR = new THREE.Color(0x7c3aed);
const RING_EMISSIVE = new THREE.Color(0xa78bfa);

export default function GlowingRing({
  status,
  audioLevel,
  radius = 1.1,
}: GlowingRingProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!ringRef.current || !materialRef.current) return;

    const time = state.clock.elapsedTime;
    const isProcessing = status === "processing";
    const isSpeaking = status === "speaking";

    // Subtle breathing pulse for idle/listening
    let pulseScale = 1;
    let emissiveIntensity = 0.4;

    if (isProcessing) {
      // Faster pulse when processing
      pulseScale = 1 + Math.sin(time * 3) * 0.02;
      emissiveIntensity = 0.5 + Math.sin(time * 4) * 0.2;
    } else if (isSpeaking) {
      // Audio-reactive pulse when speaking
      pulseScale = 1 + audioLevel * 0.05;
      emissiveIntensity = 0.4 + audioLevel * 0.4;
    } else {
      // Gentle pulse for idle/listening
      pulseScale = 1 + Math.sin(time * 1.5) * 0.01;
      emissiveIntensity = 0.3 + Math.sin(time * 2) * 0.1;
    }

    ringRef.current.scale.setScalar(pulseScale);
    materialRef.current.emissiveIntensity = emissiveIntensity;
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial
        ref={materialRef}
        color={RING_COLOR}
        emissive={RING_EMISSIVE}
        emissiveIntensity={0.4}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}
