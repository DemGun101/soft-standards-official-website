---
name: gsap-react
description: 'GSAP animation best practices for React and Next.js. Use when: (1) Implementing GSAP animations in React/Next.js, (2) Using ScrollTrigger, Draggable, or SplitText plugins, (3) Questions about useGSAP hook, cleanup, or SSR compatibility, (4) Page transitions or scroll-based animations. Triggers on: "GSAP", "GreenSock", "useGSAP", "ScrollTrigger", "timeline animation", "scroll animation".'
---

# GSAP with React/Next.js Best Practices

## Installation

```bash
npm install gsap @gsap/react
```

## Core Hook: useGSAP()

The `useGSAP()` hook is a drop-in replacement for `useEffect()` or `useLayoutEffect()` that automatically manages cleanup using `gsap.context()`.

```javascript
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

function MyComponent() {
  const container = useRef();

  useGSAP(() => {
    gsap.to('.box', { x: 360 });
  }, { scope: container });

  return <div ref={container}><div className="box" /></div>;
}
```

## Critical: Next.js App Router

For Next.js App Router with React Server Components, add `"use client"` at the file's top:

```javascript
"use client";

import { useGSAP } from '@gsap/react';
// ... rest of component
```

## Config Object Properties

| Property | Purpose |
|----------|---------|
| **dependencies** | Array controlling when animations recreate (like `useEffect`) |
| **scope** | React ref for scoping all selector text to a container's descendants |
| **revertOnUpdate** | Boolean (default: false) to revert context when dependencies change |

## Context-Safe Animations on Interaction

Animations created *after* the hook executes (click handlers, timeouts) aren't automatically tracked. Make them context-safe:

### Pattern 1: Return contextSafe from hook

```javascript
const { contextSafe } = useGSAP({ scope: container });

const onClickHandler = contextSafe(() => {
  gsap.to('.element', { rotation: 180 });
});
```

### Pattern 2: Use second hook parameter

```javascript
useGSAP((context, contextSafe) => {
  const handler = contextSafe(() => {
    gsap.to('.element', { y: 100 });
  });
  element.addEventListener('click', handler);
  return () => element.removeEventListener('click', handler);
});
```

## Centralize GSAP Configuration

**IMPORTANT**: Avoid importing GSAP everywhere which causes animations to lag and ScrollTriggers to leak on route changes.

Create a centralized config file:

```typescript
// lib/gsapConfig.ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
```

Then import from this file throughout your app:

```javascript
import { gsap, useGSAP } from '@/lib/gsapConfig';
```

## ScrollTrigger in Next.js

```javascript
"use client";

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsapConfig';

function ScrollAnimation() {
  const container = useRef();

  useGSAP(() => {
    gsap.to('.box', {
      x: 500,
      scrollTrigger: {
        trigger: '.box',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      }
    });
  }, { scope: container });

  return <div ref={container}><div className="box" /></div>;
}
```

## Timeline Animations

```javascript
useGSAP(() => {
  const tl = gsap.timeline();

  tl.to('.box1', { x: 100, duration: 0.5 })
    .to('.box2', { y: 100, duration: 0.5 }, '-=0.25') // overlap
    .to('.box3', { rotation: 360, duration: 0.5 });

}, { scope: container });
```

## Page Transitions

```javascript
"use client";

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapConfig';

export default function PageTransition({ children }) {
  const container = useRef();

  useGSAP(() => {
    // Entry animation
    gsap.from(container.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out'
    });
  }, { scope: container });

  return <div ref={container}>{children}</div>;
}
```

## Performance Tips

1. **Batch animations** using GSAP timelines for better performance
2. **Use `will-change`** sparingly on elements that animate frequently
3. **Scope selectors** via the `scope` prop to avoid global selector conflicts
4. **Clean up timeouts**: Return cleanup functions when using `setTimeout`

```javascript
useGSAP(() => {
  const timer = setTimeout(() => {
    gsap.to('.delayed', { x: 100 });
  }, 1000);

  return () => clearTimeout(timer);
});
```

## Common Mistakes to Avoid

1. **Don't forget cleanup** - Always use `useGSAP()` instead of `useEffect()` for GSAP
2. **Don't import GSAP in every file** - Centralize configuration
3. **Don't create animations outside contextSafe** - Event handlers need wrapping
4. **Don't skip the scope** - Always scope selectors to prevent conflicts

## SSR Compatibility

The hook is safe for Next.js and server-side rendering. It implements `useIsomorphicLayoutEffect`, preferring `useLayoutEffect()` but falling back to `useEffect()` if `window` isn't defined.
