---
name: motion-animation
description: 'Motion (formerly Framer Motion) animation best practices for React and Next.js. Use when: (1) Implementing UI animations with Motion/Framer Motion, (2) Layout animations, gestures, or transitions, (3) Page transitions in Next.js, (4) Scroll-based animations. Triggers on: "Motion", "Framer Motion", "motion/react", "AnimatePresence", "layout animation", "page transition", "gesture animation".'
---

# Motion (Framer Motion) Best Practices

## Installation & Import (2024+)

```bash
npm install motion
```

**IMPORTANT**: Use the new import path:

```javascript
// NEW - Correct
import { motion, AnimatePresence } from 'motion/react';

// OLD - Deprecated
import { motion, AnimatePresence } from 'framer-motion';
```

## Basic Animation

```jsx
import { motion } from 'motion/react';

function AnimatedBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Hello World
    </motion.div>
  );
}
```

## Performance: Hardware-Accelerated Properties

**Always prefer** `transform` and `opacity` - they're GPU-accelerated:

```jsx
// GOOD - Hardware accelerated
<motion.div
  animate={{
    x: 100,        // transform: translateX
    y: 50,         // transform: translateY
    scale: 1.2,    // transform: scale
    rotate: 45,    // transform: rotate
    opacity: 0.5,  // opacity
  }}
/>

// AVOID - Causes layout recalculation
<motion.div
  animate={{
    width: 200,    // Triggers layout
    height: 100,   // Triggers layout
    top: 50,       // Triggers layout
    left: 100,     // Triggers layout
  }}
/>
```

## Variants for Reusable Animations

```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function List({ items }) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item) => (
        <motion.li key={item.id} variants={itemVariants}>
          {item.text}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

## Layout Animations

The `layout` prop enables automatic layout animations:

```jsx
<motion.div layout>
  {/* Content that changes size/position */}
</motion.div>
```

### Shared Layout Animations

```jsx
import { motion, AnimatePresence } from 'motion/react';

function Tabs({ items, selected }) {
  return (
    <div className="tabs">
      {items.map((item) => (
        <button key={item.id} onClick={() => setSelected(item.id)}>
          {item.label}
          {selected === item.id && (
            <motion.div
              layoutId="underline"
              className="underline"
            />
          )}
        </button>
      ))}
    </div>
  );
}
```

## AnimatePresence for Exit Animations

```jsx
import { motion, AnimatePresence } from 'motion/react';

function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

## Gesture Animations

```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  whileFocus={{ boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.6)' }}
>
  Click me
</motion.button>
```

### Drag

```jsx
<motion.div
  drag
  dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
  dragElastic={0.2}
  whileDrag={{ scale: 1.1 }}
/>
```

## Scroll Animations

### useInView for Lazy Loading

```jsx
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

function FadeInWhenVisible({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
```

### useScroll for Scroll-Linked Animations

```jsx
import { motion, useScroll, useTransform } from 'motion/react';

function ParallaxImage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <motion.img
      src="/image.jpg"
      style={{ y }}
    />
  );
}
```

## Page Transitions in Next.js

```jsx
// app/template.tsx
'use client';

import { motion } from 'motion/react';

export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

## Spring Animations

```jsx
<motion.div
  animate={{ x: 100 }}
  transition={{
    type: 'spring',
    stiffness: 100,
    damping: 10,
    mass: 1,
  }}
/>
```

### Spring Presets

```jsx
// Quick and snappy
transition={{ type: 'spring', stiffness: 400, damping: 30 }}

// Smooth and slow
transition={{ type: 'spring', stiffness: 100, damping: 20 }}

// Bouncy
transition={{ type: 'spring', stiffness: 300, damping: 10 }}
```

## useMotionValue for Custom Animations

```jsx
import { motion, useMotionValue, useTransform } from 'motion/react';

function Slider() {
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ['#ff0000', '#ffffff', '#00ff00']
  );

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -100, right: 100 }}
      style={{ x, background }}
    />
  );
}
```

## Performance Tips

1. **Use `layout` sparingly** - Only on elements that need it
2. **Avoid animating layout properties** - Stick to transforms and opacity
3. **Use `useInView` for off-screen elements** - Don't animate what's not visible
4. **Reduce motion for accessibility**:

```jsx
import { useReducedMotion } from 'motion/react';

function AccessibleAnimation({ children }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ x: 100 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
      }}
    >
      {children}
    </motion.div>
  );
}
```

## React Three Fiber Integration

```jsx
import { motion } from 'motion/react-three';

function Animated3DBox() {
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

## Common Patterns

### Stagger Children

```jsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
```

### Animate on State Change

```jsx
<motion.div
  animate={{
    backgroundColor: isActive ? '#ff0000' : '#0000ff',
  }}
/>
```

### Keyframes

```jsx
<motion.div
  animate={{
    scale: [1, 1.2, 1.2, 1, 1],
    rotate: [0, 0, 180, 180, 0],
  }}
  transition={{ duration: 2, times: [0, 0.2, 0.5, 0.8, 1] }}
/>
```
