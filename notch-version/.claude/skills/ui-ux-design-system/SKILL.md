---
name: ui-ux-design-system
description: "UI/UX design system principles, design tokens, component architecture, and user experience guidelines. Use when creating or modifying design systems, establishing visual patterns, building component libraries, or improving user experience across the website."
---

# UI/UX Design System

Design intelligence for building professional UI/UX across web platforms.

## Design System Architecture

### Design Tokens (Single Source of Truth)

All visual properties flow from tokens — never hardcode values in components.

```css
:root {
  /* Brand Colors */
  --color-primary: hsl(256, 65%, 55%);      /* Violet - Soft Standards brand */
  --color-primary-light: hsl(256, 65%, 70%);
  --color-primary-dark: hsl(256, 65%, 40%);
  --color-secondary: hsl(220, 70%, 50%);
  --color-accent: hsl(280, 80%, 60%);

  /* Neutrals */
  --color-bg: hsl(0, 0%, 100%);
  --color-bg-subtle: hsl(220, 20%, 97%);
  --color-text: hsl(220, 20%, 10%);
  --color-text-muted: hsl(220, 10%, 45%);
  --color-border: hsl(220, 15%, 90%);

  /* Typography */
  --font-display: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing (8px base) */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-24: 6rem;    /* 96px */

  /* Shadows */
  --shadow-sm: 0 1px 2px hsl(0 0% 0% / 0.05);
  --shadow-md: 0 4px 6px hsl(0 0% 0% / 0.07);
  --shadow-lg: 0 10px 25px hsl(0 0% 0% / 0.1);
  --shadow-xl: 0 20px 50px hsl(0 0% 0% / 0.15);

  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
}
```

## Component Architecture

### Atomic Design Hierarchy
1. **Atoms**: Button, Input, Badge, Avatar, Icon
2. **Molecules**: SearchBar, Card, NavItem, FormField
3. **Organisms**: Header, Footer, HeroSection, ServiceGrid, TestimonialCarousel
4. **Templates**: MarketingLayout, DashboardLayout
5. **Pages**: Home, Services, About, Pricing, Blog

### Component API Design
```tsx
// Good: Composable, predictable API
<Card variant="elevated" padding="lg">
  <Card.Image src="/project.jpg" alt="Project" aspectRatio="16/9" />
  <Card.Body>
    <Card.Title>Web Development</Card.Title>
    <Card.Description>Full-stack web applications</Card.Description>
  </Card.Body>
  <Card.Footer>
    <Button variant="ghost" size="sm">Learn More</Button>
  </Card.Footer>
</Card>
```

## UX Patterns for Agency Websites

### Navigation
- Maximum 7 primary nav items (cognitive limit)
- Mobile: hamburger with full-screen overlay or slide panel
- Sticky header with background blur on scroll
- Active state indicator for current page
- CTA button in header (e.g., "Book a Call")

### Hero Section
- Clear value proposition in < 8 words
- Supporting subtext: 1-2 sentences max
- Primary CTA above the fold
- Visual element: 3D orb, animation, or compelling imagery
- Trust signals nearby: client logos, stats, ratings

### Service Cards
- Icon or illustration per service
- Short title (2-3 words)
- One-sentence description
- Hover state with subtle animation
- Link to detailed service page

### Testimonials
- Real names and company names
- Star ratings or satisfaction metrics
- Carousel with auto-play (pausable)
- Mix of text and video testimonials

### Pricing Pages
- 3 tiers maximum (starter/growth/enterprise)
- Highlight recommended tier
- Feature comparison table
- FAQ section below pricing
- Annual/monthly toggle with savings indicator

### Contact/Booking
- Minimal form fields (name, email, message minimum)
- Calendar integration for booking
- Expected response time indicator
- Alternative contact methods visible

## Responsive Design Guidelines

### Breakpoints
| Name | Width | Target |
|------|-------|--------|
| sm | 640px | Large phones |
| md | 768px | Tablets |
| lg | 1024px | Small laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large screens |

### Mobile-First Rules
1. Design the mobile layout first
2. Add complexity as screen grows
3. Touch targets: minimum 44x44px
4. No horizontal scrolling
5. Readable text without zooming (min 16px body)
6. Thumb-friendly CTA placement (bottom half of screen)

## Interaction Design

### Micro-interactions
- Button: subtle scale on hover (1.02), darken on press
- Card: lift shadow on hover, slight y-translate (-2px)
- Input: focus ring animation, label float
- Toggle: smooth slide with color transition
- Loading: skeleton screens over spinners

### State Management in UI
Every interactive element needs these states:
1. **Default**: Resting appearance
2. **Hover**: Visual feedback on mouseover
3. **Active/Pressed**: Feedback during click/tap
4. **Focus**: Keyboard navigation indicator
5. **Disabled**: Clearly non-interactive appearance
6. **Loading**: Progress indicator
7. **Error**: Validation feedback
8. **Empty**: Meaningful empty state with guidance
