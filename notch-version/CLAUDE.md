# Soft Standards — Notch Version

## Project Overview
Marketing website for Soft Standards Inc., an AI-powered marketing agency. Built to convert visitors into leads through strategic copy, social proof, and interactive features.

## Tech Stack
- **Framework**: Next.js 16.1.6 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + CSS variables (light/dark mode via `next-themes`)
- **Animation**: Framer Motion 12.34 (component animations) + GSAP 3.14 (advanced timelines/scroll)
- **AI**: Vercel AI SDK + Anthropic (streaming chat in hero)
- **Fonts**: Inter (sans) + Instrument Serif (italic accent)
- **Accent Color**: `#7B61FF` (purple)

## Architecture

### Directory Structure
```
app/           → Pages (App Router) + API routes
components/    → Client components ("use client")
lib/           → Animation presets, types, utilities
public/        → Static assets (logos, icons)
data/          → Knowledge graph JSON
```

### Design Tokens (CSS Variables)
All colors live in `app/globals.css` as CSS variables. Use `var(--accent)`, `var(--foreground)`, etc. Never hardcode hex values in components. Tailwind maps these via `@theme inline` block.

### Animation System
- **Framer Motion presets** in `lib/animations.ts`: `fadeUp`, `fadeIn`, `slideFromLeft`, `slideFromRight`, `staggerContainer`, `slideStep`, `scalePop`
- **GSAP** for complex timelines, scroll-pinned sections, SVG animations. Always use `useGSAP` hook with `scope` for cleanup.
- **CSS keyframes** for LCP-critical animations (hero fade-in)

### Component Pattern
Every section component follows:
1. `"use client"` directive
2. Framer Motion `whileInView` with `viewport={{ once: true, margin: "-60px" }}`
3. `staggerContainer` parent + `fadeUp` children with custom delay
4. Tailwind for layout, CSS variables for colors
5. Dark mode via `.dark` class (automatic via `next-themes`)

## Code Conventions
- Use `var(--token)` for all colors — never raw hex
- Import animation variants from `lib/animations.ts`
- Dynamic imports (`next/dynamic`) for below-the-fold sections
- Sections are self-contained: data + markup + animation in one file
- Mobile-first responsive: base styles → `md:` breakpoint

## Enhanced Section Development
When building new sections with premium animations:

### Animation Libraries Available
- **Framer Motion**: Layout animations, AnimatePresence, gestures, springs
- **GSAP + ScrollTrigger**: Pin, scrub, snap, batch, parallax (free)
- **GSAP Club plugins**: SplitText, ScrollSmoother, MorphSVG, DrawSVG (premium — check if installed)

### Component Sources for Inspiration
- **Aceternity UI** (ui.aceternity.com) — Spotlight, 3D cards, aurora, sparkles, meteors, lamp effects
- **Magic UI** (magicui.design) — Beams, shimmer buttons, orbiting circles, border beams, globe, marquee
- **Motion Primitives** (motion-primitives.com) — Text animations, transitions, scroll effects
- **Animata** (animata.design) — Micro-interactions, animated backgrounds
- **Hover.dev** — Creative hover effects, animated buttons
- Copy-paste patterns from these; adapt to our CSS variable system and Tailwind 4

### Animation Quality Bar
- Every section MUST have scroll-triggered entrance animations
- Use staggered reveals (not everything appearing at once)
- Interactive hover states on all cards/buttons
- Smooth easing: `[0.25, 0.4, 0.25, 1]` for standard, spring physics for playful elements
- Respect `prefers-reduced-motion`
- 60fps — only animate `transform` and `opacity`

### Performance Rules
- CSS animations for above-the-fold (no JS delay)
- GSAP context cleanup via `useGSAP` or `gsap.context().revert()`
- Lazy load heavy animations (Three.js, Lottie) with `next/dynamic`
- `will-change` only on actively animating elements
- Test on mobile — reduce particle counts, simplify on small screens

## Do NOT
- Use inline styles for colors (use CSS variables)
- Add dependencies without checking if Framer Motion or GSAP can handle it
- Create animation variants inline — add to `lib/animations.ts`
- Skip dark mode support on any new section
- Use `useEffect` for GSAP — always `useGSAP` with scope
