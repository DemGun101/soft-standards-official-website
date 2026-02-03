"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { VoiceAgentStatus } from "@/lib/voice-agent-config";
import OrbScene from "./OrbScene";

interface VoiceOrb3DCanvasProps {
  status: VoiceAgentStatus;
  audioLevel: number;
  frequencyData: Uint8Array;
  size?: number;
  isOverDark?: boolean;
}

export default function VoiceOrb3DCanvas({
  status,
  audioLevel,
  frequencyData,
  size = 200,
  isOverDark = false,
}: VoiceOrb3DCanvasProps) {
  // Normalize frequency data to 0-1 range for shader uniforms
  const normalizedFrequency = useMemo(() => {
    if (!frequencyData || frequencyData.length === 0) {
      return new Float32Array(128).fill(0);
    }
    const normalized = new Float32Array(Math.min(frequencyData.length, 128));
    for (let i = 0; i < normalized.length; i++) {
      normalized[i] = frequencyData[i] / 255;
    }
    return normalized;
  }, [frequencyData]);

  return (
    <div
      style={{ width: size * 1.5, height: size * 1.5 }}
      className="cursor-pointer transition-transform hover:scale-105 overflow-visible"
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <OrbScene
            status={status}
            audioLevel={audioLevel}
            frequencyData={normalizedFrequency}
            isOverDark={isOverDark}
          />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
