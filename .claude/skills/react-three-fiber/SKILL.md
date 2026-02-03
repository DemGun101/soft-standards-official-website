---
name: react-three-fiber
description: 'React Three Fiber (R3F) best practices for 3D graphics and animations. Use when: (1) Building 3D scenes with React, (2) Implementing 3D animations with useFrame, (3) Optimizing R3F performance, (4) Working with Three.js in React. Triggers on: "React Three Fiber", "R3F", "useFrame", "3D animation", "Three.js React", "@react-three/fiber", "@react-three/drei".'
---

# React Three Fiber Best Practices

## Installation

```bash
npm install three @react-three/fiber @react-three/drei
```

## Core Animation Pattern: useFrame

The `useFrame` hook executes code on every frame of the render loop.

```jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function RotatingBox() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    // Direct mutation - NOT setState
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
```

## Critical Rule: Mutate in useFrame, Never setState

```jsx
// BAD - causes React re-renders every frame
const [rotation, setRotation] = useState(0);
useFrame(() => setRotation(r => r + 0.01)); // DON'T DO THIS

// GOOD - direct mutation, no re-renders
const meshRef = useRef();
useFrame((state, delta) => {
  meshRef.current.rotation.x += delta;
});
```

## On-Demand Rendering for Static Scenes

Save battery on mobile by only rendering when needed:

```jsx
<Canvas frameloop="demand">
  {/* Static content */}
</Canvas>
```

Trigger re-renders manually:

```jsx
import { useThree } from '@react-three/fiber';

function InteractiveElement() {
  const { invalidate } = useThree();

  return (
    <mesh onClick={() => {
      // Change something
      invalidate(); // Trigger a render
    }}>
      {/* ... */}
    </mesh>
  );
}
```

## Performance Optimization

### Target Under 100 Draw Calls

```jsx
// Check draw calls
useFrame(({ gl }) => {
  console.log(gl.info.render.calls); // Should be < 100
});
```

### Use InstancedMesh for Repeated Objects

```jsx
import { useRef, useMemo } from 'react';
import { Object3D, Matrix4 } from 'three';

function Instances({ count = 1000 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
        Math.random() * 10 - 5
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color="blue" />
    </instancedMesh>
  );
}
```

### Never Create Objects Inside useFrame

```jsx
// BAD - creates garbage every frame
useFrame(() => {
  mesh.position.copy(new Vector3(x, y, z)); // New object every frame!
});

// GOOD - reuse objects with useMemo
const tempVec = useMemo(() => new Vector3(), []);
useFrame(() => {
  tempVec.set(x, y, z);
  mesh.position.copy(tempVec);
});
```

## Asset Optimization

### Draco Compression (90-95% size reduction)

```jsx
import { useGLTF } from '@react-three/drei';

// Enable Draco loader
useGLTF.preload('/model.glb', '/draco/');

function Model() {
  const { scene } = useGLTF('/model.glb', '/draco/');
  return <primitive object={scene} />;
}
```

### Level of Detail (LOD)

```jsx
import { Detailed } from '@react-three/drei';

function AdaptiveModel() {
  return (
    <Detailed distances={[0, 10, 25, 50]}>
      <HighPolyModel />   {/* 0-10 units */}
      <MediumPolyModel /> {/* 10-25 units */}
      <LowPolyModel />    {/* 25-50 units */}
      <BillboardModel />  {/* 50+ units */}
    </Detailed>
  );
}
```

## Animation with React Spring

```jsx
import { useSpring, animated } from '@react-spring/three';

function AnimatedBox() {
  const [active, setActive] = useState(false);

  const { scale, color } = useSpring({
    scale: active ? 1.5 : 1,
    color: active ? '#ff6b6b' : '#4ecdc4',
  });

  return (
    <animated.mesh
      scale={scale}
      onClick={() => setActive(!active)}
    >
      <boxGeometry />
      <animated.meshStandardMaterial color={color} />
    </animated.mesh>
  );
}
```

## Animation with Motion

```jsx
import { motion } from 'motion/react-three';

function MotionBox() {
  return (
    <motion.mesh
      animate={{ rotateY: Math.PI * 2 }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </motion.mesh>
  );
}
```

## Time-Based Animation

```jsx
useFrame(({ clock }) => {
  // Smooth sine wave animation
  meshRef.current.position.y = Math.sin(clock.elapsedTime) * 2;

  // Rotation based on time
  meshRef.current.rotation.y = clock.elapsedTime * 0.5;
});
```

## Frame-Rate Independent Animation

Always use `delta` for consistent animation across different refresh rates:

```jsx
useFrame((state, delta) => {
  // Will animate at same speed on 60Hz and 120Hz displays
  meshRef.current.rotation.x += delta * speed;
});
```

## Memory Management

### Dispose Resources on Unmount

```jsx
useEffect(() => {
  return () => {
    geometry.dispose();
    material.dispose();
    texture.dispose();
  };
}, []);
```

### Monitor Memory

```jsx
useFrame(({ gl }) => {
  const info = gl.info;
  console.log('Geometries:', info.memory.geometries);
  console.log('Textures:', info.memory.textures);
});
```

## Drei Helpers

```jsx
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  Html,
  Text,
  useTexture,
  useGLTF
} from '@react-three/drei';

function Scene() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls enableDamping />
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      {/* Your 3D content */}
    </Canvas>
  );
}
```

## State Management

Use Zustand, Jotai, or Valtio for non-animation state:

```jsx
import create from 'zustand';

const useStore = create((set) => ({
  color: '#ff0000',
  setColor: (color) => set({ color }),
}));

function ColoredMesh() {
  const color = useStore((state) => state.color);
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
```
