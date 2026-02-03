"use client";

import { VoiceAgentStatus } from "@/lib/voice-agent-config";
import RadialChainOrbs from "./RadialChainOrbs";

interface OrbSceneProps {
  status: VoiceAgentStatus;
  audioLevel: number;
  frequencyData: Float32Array;
  isOverDark?: boolean;
}

export default function OrbScene({
  status,
  audioLevel,
  frequencyData,
  isOverDark = false,
}: OrbSceneProps) {
  return (
    <>
      {/* Ambient fill light */}
      <ambientLight intensity={0.4} />

      {/* Key lights for metallic reflections */}
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.6} color="#7C3AED" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />

      {/* Purple accent lights */}
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#7C3AED" />
      <pointLight position={[0, 0, -3]} intensity={0.4} color="#A78BFA" />

      {/* Scattered orbs within circle */}
      <RadialChainOrbs
        status={status}
        audioLevel={audioLevel}
        frequencyData={frequencyData}
        orbCount={200}
        maxRadius={1.0}
        isOverDark={isOverDark}
      />
    </>
  );
}
