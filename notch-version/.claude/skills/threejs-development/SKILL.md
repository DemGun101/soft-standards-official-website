---
name: threejs-development
description: "Three.js and React Three Fiber best practices for 3D graphics, WebGL scenes, animations, and interactive 3D experiences. Use when building 3D scenes, working with shaders, optimizing WebGL performance, or implementing interactive 3D elements like the voice agent orb."
---

# Three.js & React Three Fiber Development

## Scene Setup

### React Three Fiber Canvas
```tsx
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]} // Responsive pixel ratio
      gl={{ antialias: true, alpha: true }}
    >
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls enableZoom={false} />
      {/* Scene content */}
    </Canvas>
  );
}
```

### Always Use Dynamic Import for Canvas
Three.js/R3F components use browser-only APIs (WebGL). Always dynamic import with `ssr: false`:
```tsx
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("@/components/Scene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black/10 animate-pulse" />,
});
```

## Animation with useFrame

```tsx
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.5;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="#6366f1" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}
```

## Custom Shaders

### Vertex Shader
```glsl
varying vec2 vUv;
varying vec3 vNormal;
uniform float uTime;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec3 pos = position;
  pos += normal * sin(uTime + position.y * 3.0) * 0.1;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

### Fragment Shader
```glsl
varying vec2 vUv;
varying vec3 vNormal;
uniform float uTime;
uniform vec3 uColor;

void main() {
  float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
  vec3 color = mix(uColor, vec3(1.0), fresnel * 0.5);
  gl_FragColor = vec4(color, 0.9);
}
```

### Using ShaderMaterial in R3F
```tsx
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const OrbMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color("#6366f1") },
  vertexShader,
  fragmentShader
);

extend({ OrbMaterial });
```

## Audio-Reactive Visuals

For the voice agent orb and similar audio-reactive components:

```tsx
function AudioReactiveOrb({ analyser }: { analyser: AnalyserNode | null }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!analyser || !meshRef.current) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    const avg = data.reduce((a, b) => a + b) / data.length / 255;
    meshRef.current.scale.setScalar(1 + avg * 0.5);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="#8b5cf6" emissive="#4c1d95" emissiveIntensity={0.5} />
    </mesh>
  );
}
```

## Performance Optimization

### Geometry & Material Reuse
```tsx
// Create shared geometry and material outside component
const sharedGeometry = new THREE.SphereGeometry(1, 32, 32);
const sharedMaterial = new THREE.MeshStandardMaterial({ color: "#6366f1" });

function OptimizedMesh() {
  return <mesh geometry={sharedGeometry} material={sharedMaterial} />;
}
```

### Instanced Meshes for Particles
```tsx
import { Instances, Instance } from "@react-three/drei";

function Particles({ count = 100 }) {
  return (
    <Instances limit={count}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial />
      {Array.from({ length: count }, (_, i) => (
        <Instance
          key={i}
          position={[Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5]}
        />
      ))}
    </Instances>
  );
}
```

### Disposal
Always clean up Three.js resources:
```tsx
useEffect(() => {
  return () => {
    geometry.dispose();
    material.dispose();
    texture?.dispose();
  };
}, []);
```

## Best Practices

1. **Never render Canvas server-side** — Always use dynamic import with `ssr: false`
2. **Use `useFrame` instead of `requestAnimationFrame`** — It's synced with R3F's render loop
3. **Avoid creating objects inside `useFrame`** — Pre-allocate vectors and quaternions
4. **Use `drei` helpers** — Environment, OrbitControls, Float, Text3D save time
5. **Limit draw calls** — Use instancing for repeated geometries
6. **Use appropriate geometry detail** — Lower segments for distant/small objects
7. **Dispose resources on unmount** — Prevent WebGL memory leaks
8. **Use `dpr={[1, 2]}`** — Adaptive pixel ratio for performance vs quality
