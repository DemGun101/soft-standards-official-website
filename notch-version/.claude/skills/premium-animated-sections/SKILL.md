---
name: premium-animated-sections
description: "Build stunning, agency-quality animated website sections using patterns from Aceternity UI, Magic UI, Motion Primitives, and other premium component libraries. Use when creating new sections that need high-end animations, scroll effects, interactive elements, or visual impact beyond basic fade-in reveals."
---

# Premium Animated Sections

Build sections that look like they came from a $50k agency build, using patterns from the best animated component libraries.

## Source Libraries & Patterns

### Aceternity UI Patterns (React + Framer Motion + Tailwind)
Copy-paste animated component patterns. Adapt colors to our CSS variable system.

**Background Effects:**
- **Aurora Background**: Animated gradient blobs with blur, rotating on a slow loop
- **Spotlight**: Mouse-following radial gradient highlight on dark backgrounds
- **Meteors**: Animated diagonal streaks with fade trails
- **Stars Background**: Randomized twinkling dots with staggered opacity animation
- **Grid Background**: Subtle animated grid with fade-to-transparent edges

**Card Effects:**
- **3D Card Tilt**: `perspective(1000px)` + `rotateX/Y` based on mouse position via `onMouseMove`
- **Hover Border Gradient**: Animated gradient that rotates around card border on hover
- **Glowing Card**: Box-shadow that pulses or shifts color on hover
- **Card Stack**: Cards that fan out / stack on scroll

**Text Effects:**
- **Text Generate**: Characters appear one by one with slight Y offset
- **Typewriter**: Text typed character by character with blinking cursor
- **Text Reveal**: Clip-path or mask that reveals text on scroll
- **Wavy Text**: Each character animated with sine-wave Y offset
- **Gradient Text**: Animated gradient that shifts across text via `background-position`

**Interactive:**
- **Infinite Moving Cards**: Horizontal marquee with duplicated items, pauses on hover
- **Parallax Scroll**: Elements move at different speeds based on scroll position
- **Tabs with AnimatePresence**: Content panels that slide/fade in with layout animations

### Magic UI Patterns
- **Animated Beam**: SVG path with animated gradient stroke (connects UI elements visually)
- **Shimmer Button**: Button with animated diagonal shine sweep
- **Orbiting Circles**: Icons/avatars orbiting a center point with CSS transforms
- **Number Ticker**: Counting animation using Framer Motion's `useMotionValue` + `useTransform`
- **Border Beam**: Animated border gradient that travels around element edges
- **Marquee**: Smooth infinite scroll of logos/cards in either direction
- **Dock**: macOS-style icon dock with scale-on-proximity

### Motion Primitives
- **Text Morph**: Text that morphs between different strings with SVG path animation
- **Scroll Progress**: Progress bar or element that scales/reveals based on scroll %
- **Magnetic Element**: Element that subtly follows cursor when nearby
- **Blur Fade**: Elements that go from blurred + transparent to sharp + visible

## Implementation Patterns

### 3D Card Tilt (Mouse-Tracking)
```tsx
"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateX(-y * 15);
    setRotateY(x * 15);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="rounded-2xl border border-border bg-card p-8"
    >
      {children}
    </motion.div>
  );
}
```

### Spotlight Effect (Mouse-Following Glow)
```tsx
function SpotlightSection({ children }: { children: React.ReactNode }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current!.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(123,97,255,0.1), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}
```

### Shimmer Button
```tsx
function ShimmerButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="group relative overflow-hidden rounded-full bg-accent px-8 py-3 text-white font-medium">
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </button>
  );
}
```

### Infinite Marquee
```tsx
function Marquee({ items, speed = 30 }: { items: React.ReactNode[]; speed?: number }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
      <motion.div
        className="flex shrink-0 gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="shrink-0">{item}</div>
        ))}
      </motion.div>
    </div>
  );
}
```

### GSAP SplitText Reveal (Premium)
```tsx
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

function TextReveal({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const split = new SplitText(ref.current!, { type: "chars,words,lines" });
    gsap.from(split.chars, {
      y: 80,
      opacity: 0,
      rotateX: -90,
      stagger: 0.02,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: ref });

  return <h2 ref={ref} className="text-5xl font-bold text-foreground">{text}</h2>;
}
```

### Scroll-Pinned Horizontal Section
```tsx
useGSAP(() => {
  const container = containerRef.current!;
  const scrollWidth = container.scrollWidth - container.clientWidth;

  gsap.to(".panels", {
    x: -scrollWidth,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      end: () => `+=${scrollWidth}`,
      invalidateOnRefresh: true,
    },
  });
}, { scope: containerRef });
```

## Quality Checklist for Premium Sections

- [ ] Scroll entrance animation (not just opacity — combine Y/scale/rotation)
- [ ] Staggered child animations (0.08-0.15s per item)
- [ ] Interactive hover state on every card/button (scale, glow, border, shadow shift)
- [ ] At least ONE "wow" element (3D tilt, parallax, text reveal, spotlight, marquee)
- [ ] Smooth easing — never `linear` for UI (use spring, power3, back.out)
- [ ] Dark mode tested — shadows, glows, and gradients look good in both themes
- [ ] Mobile responsive — animations simplified/disabled below `md` if too heavy
- [ ] `prefers-reduced-motion` respected
- [ ] Colors use CSS variables (`var(--accent)`, not `#7B61FF`)
- [ ] New animation variants added to `lib/animations.ts`
