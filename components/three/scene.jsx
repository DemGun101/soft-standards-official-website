"use client";

import { Environment, OrbitControls } from "@react-three/drei";

export function Scene({ children, controls = true, environment = true }) {
  return (
    <>
      {/* Default lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Optional environment for reflections */}
      {environment && <Environment preset="city" />}

      {/* Optional orbit controls for development */}
      {controls && <OrbitControls enableDamping dampingFactor={0.05} />}

      {children}
    </>
  );
}
