---
name: threejs-best-practices
description: 'Three.js performance optimization and best practices. Use when: (1) Optimizing 3D scene performance, (2) Memory management for 3D apps, (3) WebGPU migration, (4) Shader optimization. Triggers on: "Three.js", "3D performance", "draw calls", "WebGPU", "shader optimization", "geometry optimization".'
---

# Three.js Best Practices

## Performance Targets

- **Draw calls**: Under 100 per frame for 60fps
- **Triangles**: Under 1M for smooth performance
- **Textures**: Minimize GPU memory usage

## Draw Call Optimization

### Use InstancedMesh for Repeated Objects

```javascript
// Consolidate thousands of draw calls into one
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const count = 1000;

const mesh = new THREE.InstancedMesh(geometry, material, count);

const dummy = new THREE.Object3D();
for (let i = 0; i < count; i++) {
  dummy.position.set(
    Math.random() * 100 - 50,
    Math.random() * 100 - 50,
    Math.random() * 100 - 50
  );
  dummy.updateMatrix();
  mesh.setMatrixAt(i, dummy.matrix);
}
mesh.instanceMatrix.needsUpdate = true;
scene.add(mesh);
```

### Use BatchedMesh for Varied Geometries

```javascript
// For different geometries sharing materials
const batchedMesh = new THREE.BatchedMesh(maxGeometryCount, maxVertexCount, maxIndexCount, material);
```

### Share Materials Between Meshes

```javascript
// Enable Three.js batching
const sharedMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

const mesh1 = new THREE.Mesh(geometry1, sharedMaterial);
const mesh2 = new THREE.Mesh(geometry2, sharedMaterial);
// Both use same material = potential batching
```

## Asset Optimization

### Draco Compression (90-95% size reduction)

```javascript
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('/model.glb', (gltf) => {
  scene.add(gltf.scene);
});
```

### KTX2 Textures (10x GPU memory reduction)

```javascript
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';

const ktx2Loader = new KTX2Loader();
ktx2Loader.setTranscoderPath('/basis/');
ktx2Loader.detectSupport(renderer);

ktx2Loader.load('/texture.ktx2', (texture) => {
  material.map = texture;
});
```

### Level of Detail (LOD)

```javascript
const lod = new THREE.LOD();

lod.addLevel(highPolyMesh, 0);    // 0-10 units
lod.addLevel(mediumPolyMesh, 10); // 10-25 units
lod.addLevel(lowPolyMesh, 25);    // 25-50 units
lod.addLevel(billboardMesh, 50);  // 50+ units

scene.add(lod);
```

## Memory Management

### Always Dispose Resources

```javascript
function disposeObject(object) {
  if (object.geometry) {
    object.geometry.dispose();
  }

  if (object.material) {
    if (Array.isArray(object.material)) {
      object.material.forEach(material => disposeMaterial(material));
    } else {
      disposeMaterial(object.material);
    }
  }
}

function disposeMaterial(material) {
  material.dispose();

  // Dispose textures
  for (const key in material) {
    const value = material[key];
    if (value && typeof value.dispose === 'function') {
      value.dispose();
    }
  }
}

// For ImageBitmap textures from GLTF
if (texture.source?.data?.close) {
  texture.source.data.close();
}
```

### Object Pooling

```javascript
class ObjectPool {
  constructor(createFn, initialSize = 10) {
    this.createFn = createFn;
    this.pool = Array.from({ length: initialSize }, createFn);
  }

  get() {
    return this.pool.pop() || this.createFn();
  }

  release(obj) {
    this.pool.push(obj);
  }
}

// Usage
const bulletPool = new ObjectPool(() => new THREE.Mesh(bulletGeometry, bulletMaterial));
const bullet = bulletPool.get();
// ... use bullet
bulletPool.release(bullet);
```

### Monitor Memory

```javascript
function logMemory() {
  const info = renderer.info;
  console.log('Geometries:', info.memory.geometries);
  console.log('Textures:', info.memory.textures);
  console.log('Draw calls:', info.render.calls);
  console.log('Triangles:', info.render.triangles);
}
```

## Animation Best Practices

### Use Clock for Time-Based Animation

```javascript
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta(); // Time since last frame
  const elapsed = clock.getElapsedTime();

  // Frame-rate independent animation
  mesh.rotation.y += delta * rotationSpeed;

  renderer.render(scene, camera);
}
```

### Reuse Objects in Animation Loop

```javascript
// Pre-allocate outside animation loop
const tempVector = new THREE.Vector3();
const tempQuaternion = new THREE.Quaternion();
const tempMatrix = new THREE.Matrix4();

function animate() {
  // Reuse pre-allocated objects
  tempVector.set(x, y, z);
  mesh.position.copy(tempVector);

  // DON'T create new objects every frame
  // mesh.position.copy(new THREE.Vector3(x, y, z)); // BAD
}
```

## Shader Optimization

### Use Appropriate Precision

```glsl
// Mobile: use mediump (2x faster than highp)
precision mediump float;

// Desktop: highp is fine
precision highp float;
```

### Minimize Varyings

```glsl
// Keep under 3 varyings for mobile
varying vec2 vUv;
varying vec3 vNormal;
// Avoid adding more
```

### Replace Conditionals with Math

```glsl
// BAD - branching
if (value > 0.5) {
  color = colorA;
} else {
  color = colorB;
}

// GOOD - branchless
float t = step(0.5, value);
color = mix(colorB, colorA, t);
```

## WebGPU Migration

### Basic Setup

```javascript
import { WebGPURenderer } from 'three/webgpu';

const renderer = new WebGPURenderer();
// Automatically falls back to WebGL 2 if WebGPU unavailable
```

### When to Migrate

- Draw-call heavy scenes (2-10x improvement)
- Complex post-processing effects
- Compute shader requirements
- Particle systems with physics

## Debugging Tools

### Stats.js for FPS

```javascript
import Stats from 'three/examples/jsm/libs/stats.module';

const stats = new Stats();
document.body.appendChild(stats.dom);

function animate() {
  stats.begin();
  // ... render
  stats.end();
  requestAnimationFrame(animate);
}
```

### Spector.js for Draw Calls

```javascript
// Browser extension: captures every draw call
// Install from Chrome/Firefox extension store
```

### Built-in Info

```javascript
console.log(renderer.info);
// {
//   render: { calls, triangles, points, lines },
//   memory: { geometries, textures },
//   programs: [...]
// }
```

## Performance Checklist

- [ ] Draw calls under 100
- [ ] Using InstancedMesh for repeated objects
- [ ] Draco compression for models
- [ ] KTX2 textures for large textures
- [ ] LOD for complex scenes
- [ ] Proper resource disposal
- [ ] No object creation in render loop
- [ ] Appropriate shader precision
- [ ] Frustum culling enabled (default)
- [ ] Monitoring renderer.info
