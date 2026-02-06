---
name: frontend-design
description: "Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished UI that avoids generic AI aesthetics."
---

# Frontend Design

Create distinctive, production-grade frontend interfaces with high design quality.

## Design Thinking Framework

Before writing any code, understand context and commit to a bold aesthetic direction:

- **Purpose & Users**: Who is the audience? What action should they take?
- **Tonal Direction**: From brutalist to playful — choose deliberately
- **Technical Constraints**: Framework, responsive needs, performance budget
- **Differentiation**: What makes this memorable vs. generic?

> Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work — the key is intentionality, not intensity.

## Implementation Standards

All code must be:
- **Production-grade**: No placeholders, no TODO comments, no lorem ipsum in final output
- **Visually striking**: Every element should feel designed, not defaulted
- **Cohesive**: Every choice (color, type, spacing, motion) should reinforce the aesthetic intent
- **Refined**: Pixel-level attention to alignment, spacing, and visual rhythm

## Typography

- Use distinctive, characterful fonts — never default to Arial, Helvetica, or system fonts
- Pair display and body fonts with intentional contrast
- Leverage font weight, size, and spacing for clear visual hierarchy
- Consider variable fonts for nuanced weight control
- Import fonts from Google Fonts or similar CDNs

## Color & Theme

- Commit to a cohesive color aesthetic using CSS variables or Tailwind theme
- A dominant color with sharp accent colors outperforms a timid multi-color palette
- Use HSL color system for consistent palette generation
- Follow 60-30-10 color ratio (dominant-secondary-accent)
- Ensure WCAG 2.1 AA contrast ratios (4.5:1 for body text, 3:1 for large text)

## Motion & Animation

- Prioritize CSS solutions for simple transitions
- Use GSAP for complex scroll-triggered animations and timeline sequences
- Use Framer Motion for React component enter/exit animations
- Focus on high-impact moments: page loads, scroll reveals, hover states
- Stagger reveals for lists and grids
- Respect `prefers-reduced-motion` media query

## Spatial Composition

- Employ unexpected layouts — not everything needs to be centered in a container
- Use asymmetry, overlap, and broken grid patterns intentionally
- Generous negative space creates premium feel
- Controlled density creates energy and urgency
- Let the content hierarchy drive the spatial decisions

## Anti-Patterns (Never Do)

- Purple gradients with rounded cards (overused AI aesthetic)
- Space Grotesk as the default font
- Centered layouts with no visual tension
- Generic hero sections with stock imagery descriptions
- Uniform padding/spacing throughout — vary it intentionally
- Rainbow gradient buttons
- Excessive use of shadows and blur effects without purpose
