---
name: creative-effects-library
description: "Reusable creative visual effects: glassmorphism, gradient meshes, noise textures, SVG filters, particle systems, blob animations, and background treatments. Use when a section needs a distinctive visual layer beyond standard components."
---

# Creative Effects Library

Visual effects that elevate sections from "clean" to "premium agency" quality.

## Glassmorphism

### Standard Glass Panel
```tsx
<div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl">
  {/* content */}
</div>
```

### Frosted Glass with Noise (Premium Feel)
```css
.glass-premium {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(40px) saturate(1.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
    0 20px 60px -15px rgba(0, 0, 0, 0.3);
}
/* Add noise overlay via pseudo-element with SVG filter or noise texture */
.glass-premium::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,...") repeat; /* tiny noise pattern */
  opacity: 0.03;
  pointer-events: none;
}
```

## Gradient Mesh Backgrounds

### Animated Gradient Orbs
```tsx
function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-1/2 -left-1/4 h-[800px] w-[800px] rounded-full bg-accent/20 blur-[120px] animate-[drift_20s_ease-in-out_infinite]" />
      <div className="absolute -bottom-1/2 -right-1/4 h-[600px] w-[600px] rounded-full bg-purple-500/15 blur-[100px] animate-[drift_25s_ease-in-out_infinite_reverse]" />
      <div className="absolute top-1/4 right-1/3 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[80px] animate-[drift_18s_ease-in-out_infinite_2s]" />
    </div>
  );
}

/* In globals.css */
@keyframes drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.05); }
  66% { transform: translate(-20px, 30px) scale(0.95); }
}
```

### Conic Gradient Spinner (Border Effect)
```tsx
<div className="relative rounded-2xl p-px">
  <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_var(--angle),transparent_70%,var(--accent))] animate-[spin_4s_linear_infinite]" />
  <div className="relative rounded-2xl bg-background p-8">
    {/* content */}
  </div>
</div>
```

## Dot Grid / Pattern Backgrounds

### Dot Grid
```css
.dot-grid {
  background-image: radial-gradient(circle, var(--border) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

### Cross-Hatch Grid
```css
.grid-pattern {
  background-image:
    linear-gradient(var(--border-faint) 1px, transparent 1px),
    linear-gradient(90deg, var(--border-faint) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

### Fade Edges (Mask for Any Pattern)
```css
.pattern-fade {
  mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%);
}
```

## SVG Filters (In-Browser Effects)

### Gooey / Blob Merge Effect
```html
<svg className="absolute h-0 w-0">
  <filter id="gooey">
    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
    <feColorMatrix in="blur" mode="matrix"
      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
  </filter>
</svg>
<div style={{ filter: "url(#gooey)" }}>
  {/* Overlapping circles that merge with gooey effect */}
</div>
```

## Particle / Sparkle Systems

### Lightweight Sparkle (CSS-only)
```tsx
function Sparkles({ count = 20 }: { count?: number }) {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${Math.random() * 2 + 1.5}s`,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-accent"
          style={{
            width: s.size,
            height: s.size,
            left: s.left,
            top: s.top,
            animation: `sparkle ${s.duration} ${s.delay} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* globals.css */
@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
}
```

## Noise Texture Overlay
```css
.noise-overlay::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.035;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

## Text Effects

### Gradient Text
```tsx
<span className="bg-gradient-to-r from-accent via-purple-400 to-blue-400 bg-clip-text text-transparent">
  Gradient Heading
</span>
```

### Animated Gradient Text
```css
.gradient-text-animated {
  background: linear-gradient(90deg, var(--accent), #a78bfa, var(--accent));
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 3s linear infinite;
}
@keyframes gradient-shift {
  to { background-position: 200% center; }
}
```

### Underline Reveal on Scroll
```tsx
<motion.span
  className="relative inline-block"
  initial={{ backgroundSize: "0% 3px" }}
  whileInView={{ backgroundSize: "100% 3px" }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.3 }}
  style={{
    backgroundImage: "linear-gradient(var(--accent), var(--accent))",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left bottom",
  }}
>
  Underlined text
</motion.span>
```

## Combining Effects
Layer effects for maximum impact:
1. **Background**: Gradient mesh or dot grid with fade mask
2. **Noise overlay**: Subtle texture at 3-5% opacity
3. **Content cards**: Glassmorphism with border glow
4. **Interactive layer**: Spotlight or cursor-following effect
5. **Decorative**: Sparkles or floating elements

Keep total layer count under 5 to maintain performance.
