---
name: tailwindcss-v4
description: "Tailwind CSS v4 utility-first styling patterns including responsive design, dark mode, and custom configuration. Use when styling with Tailwind, adding utility classes, configuring Tailwind, setting up dark mode, or customizing the theme."
---

# Tailwind CSS v4 Development Guidelines

Best practices for using Tailwind CSS v4 utility classes effectively.

**Note**: Tailwind CSS v4 (released January 2025) uses a CSS-first configuration approach. If you need v3 compatibility, tailwind.config.js is still supported.

## Core Principles

1. **Utility-First**: Use utility classes instead of custom CSS
2. **Mobile-First**: Design for mobile, then scale up with responsive modifiers
3. **Component Extraction**: Extract repeated patterns into components
4. **Consistent Spacing**: Use Tailwind's spacing scale
5. **Custom Configuration**: Extend the default theme for brand consistency

## Layout Patterns

```tsx
// Flexbox
<div className="flex items-center justify-between gap-4">
  <div className="flex-1">Content</div>
  <div className="flex-shrink-0">Sidebar</div>
</div>

// Grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Item</div>
</div>
```

## Responsive Design (Mobile-First)

```tsx
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Full width on mobile, half on medium, third on large */}
</div>

<h1 className="text-2xl md:text-4xl lg:text-6xl">
  {/* Responsive text sizes */}
</h1>
```

## Dark Mode

```css
/* Tailwind v4: CSS-first configuration */
@import "tailwindcss";

@theme {
  --color-brand-50: #eff6ff;
  --color-brand-500: #3b82f6;
  --color-brand-900: #1e3a8a;
}
```

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <h1 className="text-gray-900 dark:text-white">Title</h1>
</div>
```

## Component Patterns

### Button
```tsx
<button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
  Click me
</button>
```

### Card
```tsx
<div className="bg-white rounded-lg shadow-md overflow-hidden">
  <img src="/image.jpg" alt="" className="w-full h-48 object-cover" />
  <div className="p-6">
    <h2 className="text-xl font-semibold mb-2">Card Title</h2>
    <p className="text-gray-600">Description</p>
  </div>
</div>
```

## State Variants

```tsx
// Group Hover
<div className="group">
  <img className="group-hover:opacity-75 transition-opacity" />
  <p className="group-hover:text-blue-600">Hover the container</p>
</div>
```

## Arbitrary Values

```tsx
<div className="top-[117px]">       {/* Custom position */}
<div className="bg-[#1da1f2]">      {/* Custom color */}
<div className="grid-cols-[200px_1fr]"> {/* Custom grid */}
```

## Best Practices

1. Avoid premature component extraction — use utilities first
2. Keep class strings readable by grouping related utilities
3. Use consistent naming conventions for custom classes
4. Use CSS variables for theme-dependent values
5. Mobile-first responsive approach always
6. Keep arbitrary values to a minimum; extend theme instead
7. Avoid dynamic class names (e.g., `text-${color}-500`) — Tailwind can't detect them
8. Use `cn()` helper for conditional classes (clsx + tailwind-merge)
