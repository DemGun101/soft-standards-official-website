---
name: scroll-driven-animations
description: "Advanced scroll-based animation patterns using GSAP ScrollTrigger, Framer Motion scroll hooks, and Lenis smooth scroll. Use when building scroll-pinned sections, parallax effects, scrub animations, horizontal scroll galleries, or scroll-progress indicators."
---

# Scroll-Driven Animations

Advanced scroll animation patterns for immersive, agency-quality scrolling experiences.

## GSAP ScrollTrigger (Primary — Complex Scroll Animations)

### Scrub Animation (Progress Tied to Scroll Position)
```tsx
useGSAP(() => {
  gsap.to(".progress-bar", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom center",
      scrub: 0.5, // 0.5s smoothing
    },
  });
}, { scope: sectionRef });
```

### Parallax Layers
```tsx
useGSAP(() => {
  const layers = gsap.utils.toArray<HTMLElement>(".parallax-layer");
  layers.forEach((layer) => {
    const speed = parseFloat(layer.dataset.speed || "0.5");
    gsap.to(layer, {
      yPercent: -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}, { scope: sectionRef });
```

### Batch Reveal (Performance-Optimized Stagger)
```tsx
useGSAP(() => {
  ScrollTrigger.batch(".batch-item", {
    onEnter: (batch) => {
      gsap.from(batch, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    start: "top 85%",
  });
});
```

### Snap Scrolling (Section-by-Section)
```tsx
useGSAP(() => {
  const sections = gsap.utils.toArray<HTMLElement>(".snap-section");
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      pin: true,
      pinSpacing: false,
      snap: 1,
    });
  });
});
```

### Timeline Scrubbed to Scroll
```tsx
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top top",
      end: "+=3000", // 3000px of scroll distance
      pin: true,
      scrub: 1,
    },
  });

  tl.from(".step-1", { opacity: 0, y: 50 })
    .from(".step-2", { opacity: 0, y: 50 }, "+=0.3")
    .to(".step-1", { opacity: 0.3, scale: 0.9 }, "<")
    .from(".step-3", { opacity: 0, y: 50 }, "+=0.3")
    .to(".step-2", { opacity: 0.3, scale: 0.9 }, "<");
});
```

## Framer Motion Scroll (Simpler Patterns)

### useScroll + useTransform
```tsx
import { useScroll, useTransform, motion } from "framer-motion";

function ParallaxImage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.img src="/image.jpg" style={{ y, opacity }} />
    </div>
  );
}
```

### Scroll-Linked Progress Bar
```tsx
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
```

## Lenis Smooth Scroll Setup

### Installation & Init
```tsx
// app/layout.tsx or a provider component
"use client";
import Lenis from "lenis";
import { useEffect } from "react";

function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
```

## When to Use What

| Effect | Tool |
|--------|------|
| Simple fade/slide on scroll | Framer Motion `whileInView` |
| Parallax images | Framer Motion `useScroll` + `useTransform` |
| Pinned sections | GSAP ScrollTrigger `pin: true` |
| Scrub animations (tied to scroll %) | GSAP ScrollTrigger `scrub` |
| Horizontal scroll | GSAP ScrollTrigger + `x` tween |
| Batch reveals (many items) | GSAP `ScrollTrigger.batch()` |
| Snap sections | GSAP ScrollTrigger `snap` |
| Smooth scroll feel | Lenis |
| Scroll progress indicator | Framer Motion `useScroll` |

## Performance
- Pinned sections add scroll height — account for in layout
- Use `invalidateOnRefresh: true` for responsive scrub animations
- Call `ScrollTrigger.refresh()` after dynamic content loads
- Batch is more performant than individual ScrollTriggers for many items
- Lenis + GSAP must be synced (see setup above) or animations desync
