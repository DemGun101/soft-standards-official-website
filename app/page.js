"use client";

import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { useRef } from "react";

// Dynamic import for 3D components to reduce initial bundle size
const CanvasWrapper = dynamic(
  () =>
    import("@/components/three/canvas-wrapper").then(
      (mod) => mod.CanvasWrapper,
    ),
  { ssr: false },
);

const Scene = dynamic(
  () => import("@/components/three/scene").then((mod) => mod.Scene),
  { ssr: false },
);

// Sample 3D box component
function Box(props) {
  const { useFrame } = require("@react-three/fiber");
  const { useRef, useState } = require("react");
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={hovered ? 1.2 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export default function Home() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    }).from(
      subtitleRef.current,
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5",
    );
  }, []);

  return (
    <main className="relative min-h-screen bg-background">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <CanvasWrapper camera={{ position: [0, 0, 5], fov: 50 }}>
          <Scene controls={false} environment={true}>
            <Box position={[0, 0, 0]} />
          </Scene>
        </CanvasWrapper>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <h1
          ref={titleRef}
          className="text-5xl font-bold text-foreground md:text-7xl"
        >
          3D Animated Website
        </h1>
        <p
          ref={subtitleRef}
          className="mt-4 text-xl text-muted-foreground md:text-2xl"
        >
          Built with Next.js, Three.js, and GSAP
        </p>
      </div>
    </main>
  );
}
