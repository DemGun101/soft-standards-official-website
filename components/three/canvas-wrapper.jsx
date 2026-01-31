"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

export function CanvasWrapper({
  children,
  camera = { position: [0, 0, 5], fov: 75 },
  className = "",
  ...props
}) {
  return (
    <Canvas
      camera={camera}
      className={className}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
      {...props}
    >
      {children}
      <Preload all />
    </Canvas>
  );
}
