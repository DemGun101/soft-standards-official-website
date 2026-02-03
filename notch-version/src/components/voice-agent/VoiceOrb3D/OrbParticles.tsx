"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { VoiceAgentStatus } from "@/lib/voice-agent-config";

interface OrbParticlesProps {
  status: VoiceAgentStatus;
  audioLevel: number;
  count?: number;
}

const STATUS_COLORS: Record<VoiceAgentStatus, THREE.Color> = {
  idle: new THREE.Color(0x6366f1),
  listening: new THREE.Color(0xef4444),
  processing: new THREE.Color(0xf59e0b),
  speaking: new THREE.Color(0x22c55e),
  error: new THREE.Color(0xef4444),
};

interface ParticleData {
  position: THREE.Vector3;
  baseRadius: number;
  theta: number;
  phi: number;
  speed: number;
  scale: number;
  offset: number;
}

export default function OrbParticles({
  status,
  audioLevel,
  count = 150,
}: OrbParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const targetColor = useMemo(() => new THREE.Color(), []);
  const currentColor = useMemo(() => new THREE.Color(0x6366f1), []);

  // Particle data
  const particles = useMemo<ParticleData[]>(() => {
    const data: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.2 + Math.random() * 0.8;

      data.push({
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        baseRadius: radius,
        theta,
        phi,
        speed: 0.2 + Math.random() * 0.5,
        scale: 0.02 + Math.random() * 0.03,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return data;
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const particle = particles[i];
      let { theta, phi, baseRadius, speed, scale, offset } = particle;

      let currentRadius = baseRadius;
      let currentScale = scale;

      switch (status) {
        case "idle":
          theta += delta * speed * 0.3;
          currentRadius = baseRadius + Math.sin(time * 0.5 + offset) * 0.1;
          break;

        case "listening":
          currentRadius =
            baseRadius - audioLevel * 0.3 + Math.sin(time * 2 + offset) * 0.1;
          theta += delta * speed * 0.5;
          currentScale = scale * (1 + audioLevel * 0.5);
          break;

        case "processing":
          theta += delta * speed * 1.5;
          phi += delta * speed * 0.3;
          currentRadius = baseRadius + Math.sin(time * 3 + offset) * 0.15;
          break;

        case "speaking":
          currentRadius = baseRadius + audioLevel * 0.4;
          theta += delta * speed * 0.8;
          currentScale = scale * (1 + audioLevel * 0.8);
          break;

        case "error":
          theta += delta * speed * 2.0;
          currentRadius =
            baseRadius + Math.sin(time * 8 + offset) * 0.2 * audioLevel;
          currentScale = scale * (1 + Math.sin(time * 10) * 0.3);
          break;
      }

      // Update stored angles
      particles[i].theta = theta;
      particles[i].phi = phi;

      // Calculate new position
      const x = currentRadius * Math.sin(phi) * Math.cos(theta);
      const y = currentRadius * Math.sin(phi) * Math.sin(theta);
      const z = currentRadius * Math.cos(phi);

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(currentScale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update color
    targetColor.copy(STATUS_COLORS[status] || STATUS_COLORS.idle);
    currentColor.lerp(targetColor, 0.05);
    (meshRef.current.material as THREE.MeshBasicMaterial).color.copy(
      currentColor
    );
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color={STATUS_COLORS.idle}
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
