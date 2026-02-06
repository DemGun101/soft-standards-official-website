---
name: gsap-animations
description: "GSAP (GreenSock Animation Platform) best practices for React and Next.js. Use when implementing scroll-triggered animations, timeline sequences, text reveals, page transitions, or any GSAP-based animation in the website."
---

# GSAP Animation Best Practices for React/Next.js

## Setup in React/Next.js

### Plugin Registration
```tsx
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register plugins ONCE at module level
gsap.registerPlugin(ScrollTrigger, SplitText);
```

### useGSAP Hook (Recommended)
Always use `useGSAP` from `@gsap/react` instead of `useEffect` for GSAP animations. It handles cleanup automatically.

```tsx
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

function AnimatedSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".animate-item", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: containerRef }); // Scope animations to container

  return (
    <div ref={containerRef}>
      <h2 className="animate-item">Title</h2>
      <p className="animate-item">Description</p>
    </div>
  );
}
```

## ScrollTrigger Patterns

### Basic Scroll Animation
```tsx
useGSAP(() => {
  gsap.from(".reveal", {
    scrollTrigger: {
      trigger: ".reveal",
      start: "top 80%",
      end: "top 20%",
      toggleActions: "play none none reverse",
    },
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });
});
```

### Staggered Scroll Reveals
```tsx
useGSAP(() => {
  const items = gsap.utils.toArray(".stagger-item");
  items.forEach((item, i) => {
    gsap.from(item as Element, {
      scrollTrigger: {
        trigger: item as Element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: "power2.out",
    });
  });
});
```

### Pinned Sections
```tsx
useGSAP(() => {
  gsap.to(".horizontal-scroll", {
    xPercent: -100 * (panels.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-container",
      pin: true,
      scrub: 1,
      end: () => "+=" + document.querySelector(".horizontal-container")!.scrollWidth,
    },
  });
});
```

## Timeline Sequences

```tsx
useGSAP(() => {
  const tl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 0.8 },
  });

  tl.from(".hero-title", { y: 100, opacity: 0 })
    .from(".hero-subtitle", { y: 60, opacity: 0 }, "-=0.4")
    .from(".hero-cta", { y: 40, opacity: 0, scale: 0.9 }, "-=0.3")
    .from(".hero-image", { x: 100, opacity: 0, duration: 1 }, "-=0.5");
});
```

## Text Animation with SplitText

```tsx
useGSAP(() => {
  const split = new SplitText(".split-heading", { type: "chars,words" });

  gsap.from(split.chars, {
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.02,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".split-heading",
      start: "top 80%",
    },
  });
});
```

## Common Animation Recipes

### Fade Up on Scroll
```tsx
gsap.from(element, {
  y: 60,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
});
```

### Scale In
```tsx
gsap.from(element, {
  scale: 0.8,
  opacity: 0,
  duration: 0.6,
  ease: "back.out(1.7)",
});
```

### Slide From Side
```tsx
gsap.from(element, {
  x: -100,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});
```

### Counter Animation
```tsx
gsap.to(counterRef.current, {
  innerText: targetNumber,
  duration: 2,
  snap: { innerText: 1 },
  ease: "power1.inOut",
});
```

## Cleanup & Best Practices

1. **Always use `useGSAP` instead of `useEffect`** — It auto-cleans ScrollTriggers and tweens
2. **Scope animations with `{ scope: containerRef }`** — Prevents animations from leaking
3. **Register plugins at module level, not inside components**
4. **Use `gsap.context()` if not using `useGSAP`** — And call `context.revert()` on cleanup
5. **Respect `prefers-reduced-motion`**:
   ```tsx
   const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
   if (prefersReducedMotion) return; // Skip animations
   ```
6. **Don't animate layout properties** — Prefer `transform` (x, y, scale, rotation) and `opacity`
7. **Use `will-change` sparingly** — Only on elements actively being animated
8. **ScrollTrigger.refresh()** — Call after dynamic content loads or layout changes
9. **Use `invalidateOnRefresh: true`** — For responsive ScrollTrigger animations
