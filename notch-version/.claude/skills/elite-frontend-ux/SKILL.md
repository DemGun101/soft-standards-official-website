---
name: elite-frontend-ux
description: "Create distinctive, production-grade frontend interfaces with expert-level UX design. Use when building SaaS dashboards, landing pages, marketing sites, React/Next.js components, or any web UI. Combines bold aesthetic direction with systematic design tokens, WCAG accessibility, conversion optimization, and Tailwind/React best practices."
---

# Elite Frontend UX

Produces polished, memorable interfaces that avoid generic AI aesthetics while meeting professional standards.

## Design Philosophy

1. **Persona Analysis**: Understand who will use this — their expectations, technical comfort, and aesthetic preferences
2. **Aesthetic Commitment**: Pick a clear visual direction (e.g., dark luxury, clean minimalist, warm organic) and execute consistently
3. **Memorability Test**: Would a user remember this interface after seeing it once? If not, push further

## Design Token System

### Typography Scale
| Token | Size | Use |
|-------|------|-----|
| xs | 0.75rem | Captions, fine print |
| sm | 0.875rem | Labels, metadata |
| base | 1rem | Body text |
| lg | 1.125rem | Subheadings |
| xl | 1.25rem | Section headers |
| 2xl | 1.5rem | Page sections |
| 3xl | 1.875rem | Hero subtext |
| 4xl | 2.25rem | Hero headings |
| 5xl | 3rem | Display text |

### Spacing Scale (8px base)
4, 8, 12, 16, 24, 32, 48, 64, 96, 128

### Color System (HSL)
- **60-30-10 Rule**: 60% dominant, 30% secondary, 10% accent
- All colors defined in HSL for consistent lightness/saturation adjustments
- Generate palette from a single hue with varied saturation and lightness

### Animation Timing
- **Micro**: 150ms (hover states, toggles)
- **Small**: 250ms (panel reveals, fades)
- **Medium**: 400ms (page transitions, modals)
- **Large**: 600ms+ (hero animations, complex sequences)
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` for most; spring physics for playful UI

## Accessibility Requirements (Non-Negotiable)

- WCAG 2.1 AA color contrast: 4.5:1 minimum for body text, 3:1 for large text
- Touch targets: minimum 44x44px
- Visible focus states on all interactive elements (not just outline — use ring, background shift, or border)
- Semantic HTML: proper heading hierarchy (h1-h6), landmark regions, `<nav>`, `<main>`, `<aside>`
- Form labels: every input must have an associated `<label>` or `aria-label`
- `aria-live` regions for dynamic content updates
- Keyboard navigation must work for all interactive elements

## Landing Page Patterns

### Above the Fold Essentials
- Clear headline (max 8 words) communicating value proposition
- Supporting subtext (1-2 sentences)
- Primary CTA button (contrasting color, action verb)
- Social proof element (logos, count, testimonial snippet)

### Section Flow
1. Hero (value prop + CTA)
2. Social proof / trust signals
3. Features / benefits (3-4 max above fold)
4. How it works (3 steps)
5. Detailed features
6. Testimonials / case studies
7. Pricing (if applicable)
8. FAQ
9. Final CTA
10. Footer

### CTA Button Design
- Minimum 44px height, generous horizontal padding
- Action verb + benefit: "Start Free Trial" not "Submit"
- Contrast ratio against background must exceed 4.5:1
- Hover state: darken 10%, slight scale (1.02)
- Loading state with spinner or progress indicator

## Tailwind CSS Best Practices

### Required: cn() Helper
```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Component Variants with CVA
```tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

## React Component Patterns

### Compound Components
```tsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

### Respect prefers-reduced-motion
```tsx
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const animationProps = prefersReducedMotion
  ? { duration: 0 }
  : { duration: 0.4, ease: "easeOut" };
```

### Skeleton Loading States
Always provide skeleton screens instead of spinners for content areas — they feel faster and reduce layout shift.

## Anti-Patterns (Never Do)

### Visual Cliches
- Purple/blue gradients as primary backgrounds
- Uniform rounded-xl corners everywhere
- Centered content with no visual tension
- Stock photography descriptions as placeholders

### UX Dark Patterns
- Confirmshaming (guilt-trip copy on "No thanks" buttons)
- Hidden costs or surprise fees
- Forced continuity without clear cancellation
- Misdirection in button emphasis

### Technical Violations
- Dynamic Tailwind class names (e.g., `text-${color}-500`)
- Missing form labels or aria attributes
- No focus-visible styles on interactive elements
- Layout shift from async content loading

## Pre-Delivery Checklist

- [ ] Accessibility: contrast ratios, focus states, semantic HTML, screen reader tested
- [ ] Visual: consistent spacing, typography hierarchy, color cohesion, responsive
- [ ] Technical: no console errors, lazy-loaded images, optimized fonts
- [ ] UX: clear CTAs, logical flow, loading states, error states, empty states
