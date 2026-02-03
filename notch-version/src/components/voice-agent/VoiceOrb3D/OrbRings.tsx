"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OrbRingsProps {
  audioLevel: number;
}

export default function OrbRings({ audioLevel }: OrbRingsProps) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.5;
      ring1Ref.current.rotation.y = time * 0.3;
      ring1Ref.current.scale.setScalar(1.3 + Math.sin(time * 2) * 0.05);
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = time * -0.4;
      ring2Ref.current.rotation.z = time * 0.6;
      ring2Ref.current.scale.setScalar(1.5 + Math.sin(time * 2.5 + 1) * 0.05);
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = time * 0.7;
      ring3Ref.current.rotation.z = time * -0.3;
      ring3Ref.current.scale.setScalar(1.7 + Math.sin(time * 3 + 2) * 0.05);
    }
  });

  const ringGeometry = useMemo(() => {
    return new THREE.TorusGeometry(1, 0.02, 16, 100);
  }, []);

  const ringMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });
  }, []);

  return (
    <group>
      <mesh ref={ring1Ref} geometry={ringGeometry} material={ringMaterial} />
      <mesh ref={ring2Ref} geometry={ringGeometry} material={ringMaterial} />
      <mesh ref={ring3Ref} geometry={ringGeometry} material={ringMaterial} />
    </group>
  );
}
