"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { VoiceAgentStatus } from "@/lib/voice-agent-config";

interface BubbleClusterProps {
  status: VoiceAgentStatus;
  audioLevel: number;
  frequencyData: Float32Array;
  orbCount?: number;
  maxRadius?: number;
  isOverDark?: boolean;
}

// Color schemes
const PURPLE_COLOR = new THREE.Color(0x7c3aed);
const PURPLE_EMISSIVE = new THREE.Color(0x5b21b6);
const WHITE_COLOR = new THREE.Color(0xffffff);
const WHITE_EMISSIVE = new THREE.Color(0xe0e0ff);

interface OrbData {
  index: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  phaseOffset: number;
  freqBand: number;
}

// Seeded random for consistent positions
function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export default function RadialChainOrbs({
  status,
  audioLevel,
  frequencyData,
  orbCount = 60,
  maxRadius = 0.85,
  isOverDark = false,
}: BubbleClusterProps) {
  const orbsRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const smoothedAudio = useRef(0);

  // Get colors based on background
  const orbColor = isOverDark ? WHITE_COLOR : PURPLE_COLOR;
  const orbEmissive = isOverDark ? WHITE_EMISSIVE : PURPLE_EMISSIVE;

  // Create bubble cluster - orbs spread on XY plane (facing camera)
  const orbs = useMemo<OrbData[]>(() => {
    const data: OrbData[] = [];

    for (let i = 0; i < orbCount; i++) {
      const seed1 = i * 1.1 + 0.5;
      const seed2 = i * 2.3 + 0.7;
      const seed3 = i * 3.7 + 0.3;
      const seed4 = i * 4.9 + 0.9;

      // Random angle and radius for circular distribution
      const angle = seededRandom(seed1) * Math.PI * 2;
      // Cube root distribution - clusters toward center, sparse at edges
      const radiusRaw = seededRandom(seed2);
      const radiusNorm = Math.pow(radiusRaw, 1.8); // Higher power = more center clustering
      const radius = radiusNorm * maxRadius;

      // Position on XY plane (facing camera) with slight Z depth variation
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (seededRandom(seed3) - 0.5) * 0.4; // More depth for 3D cluster feel

      // Bubble sizes - larger at center, smaller at edges
      const sizeBase = 0.04 + seededRandom(seed4) * 0.04;
      // Much smaller at edges for dispersed look
      const size = sizeBase * (1 - radiusNorm * 0.6);

      data.push({
        index: i,
        baseX: x,
        baseY: y,
        baseZ: z,
        size,
        phaseOffset: seededRandom(i * 5.1) * Math.PI * 2,
        freqBand: Math.floor(seededRandom(i * 6.3) * 32),
      });
    }

    return data;
  }, [orbCount, maxRadius]);

  useFrame((state) => {
    if (!orbsRef.current) return;

    const time = state.clock.elapsedTime;
    const isProcessing = status === "processing";
    const isSpeaking = status === "speaking";

    // Smooth audio level
    smoothedAudio.current += (audioLevel - smoothedAudio.current) * 0.15;
    const audio = smoothedAudio.current;

    // Update emissive intensity based on audio
    if (materialRef.current) {
      const baseIntensity = 0.5;
      const audioBoost = isSpeaking ? audio * 1.5 : 0;
      materialRef.current.emissiveIntensity = baseIntensity + audioBoost;
    }

    // Update each orb
    for (let i = 0; i < orbCount; i++) {
      const orb = orbs[i];
      const { baseX, baseY, baseZ, size, phaseOffset, freqBand } = orb;

      let x = baseX;
      let y = baseY;
      let z = baseZ;
      let scale = size;

      // Get frequency value for this orb
      const freqValue = frequencyData[freqBand] || 0;

      if (isSpeaking) {
        // Audio-reactive: size pulsing
        const sizePulse = 1 + freqValue * 0.8 + audio * 0.5;
        scale = size * sizePulse;

        // Position burst - orbs move outward from center based on audio
        const burstFactor = 1 + freqValue * 0.3 + audio * 0.2;
        x = baseX * burstFactor;
        y = baseY * burstFactor;

        // Z oscillation for depth movement
        z = baseZ + Math.sin(time * 4 + phaseOffset) * audio * 0.15;
      } else if (isProcessing) {
        // Gentle rotation and floating during processing
        const rotSpeed = 0.5;
        const cos = Math.cos(time * rotSpeed);
        const sin = Math.sin(time * rotSpeed);
        x = baseX * cos - baseY * sin;
        y = baseX * sin + baseY * cos;

        // Gentle breathing
        scale = size * (1 + Math.sin(time * 2 + phaseOffset) * 0.1);
        z = baseZ + Math.sin(time * 1.5 + phaseOffset) * 0.05;
      } else {
        // Idle: gentle floating animation
        x = baseX + Math.sin(time * 0.5 + phaseOffset) * 0.02;
        y = baseY + Math.cos(time * 0.4 + phaseOffset * 1.3) * 0.02;
        z = baseZ + Math.sin(time * 0.3 + phaseOffset) * 0.02;

        // Subtle size breathing
        scale = size * (1 + Math.sin(time * 0.8 + phaseOffset) * 0.05);
      }

      // Update instance matrix
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(scale / 0.05); // Normalize to geometry size

      dummy.updateMatrix();
      orbsRef.current.setMatrixAt(i, dummy.matrix);
    }

    orbsRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={orbsRef} args={[undefined, undefined, orbCount]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial
          ref={materialRef}
          color={orbColor}
          emissive={orbEmissive}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </instancedMesh>
    </group>
  );
}
