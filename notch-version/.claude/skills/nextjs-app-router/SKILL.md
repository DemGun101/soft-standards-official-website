---
name: nextjs-app-router
description: "Next.js App Router best practices for building performant web applications. Use when working with Next.js routing, Server Components, data fetching, API routes, middleware, or optimizing Next.js performance."
---

# Next.js App Router Best Practices

## Server vs Client Components

### Default to Server Components
Server Components are the default in the App Router. Only add `"use client"` when you need:
- Event handlers (onClick, onChange, etc.)
- useState, useEffect, useRef, or other React hooks
- Browser-only APIs (window, document, localStorage)
- Third-party libraries that use client-only features

### Component Boundary Pattern
```tsx
// app/page.tsx (Server Component - fetches data)
import { ClientInteraction } from "./client-interaction";

export default async function Page() {
  const data = await fetchData(); // Server-side fetch
  return <ClientInteraction data={data} />;
}

// client-interaction.tsx (Client Component - handles interactivity)
"use client";
export function ClientInteraction({ data }: { data: Data }) {
  const [state, setState] = useState(data);
  return <div onClick={() => setState(/*...*/)}>...</div>;
}
```

### Anti-Pattern: Wrapping Everything in "use client"
Never add `"use client"` to layout.tsx or page.tsx unless absolutely necessary. Instead, push client boundaries down to the smallest interactive component.

## Routing

### File-Based Routing
```
app/
├── page.tsx                    # /
├── about/page.tsx              # /about
├── services/page.tsx           # /services
├── services/[slug]/page.tsx    # /services/web-development
├── blog/page.tsx               # /blog
├── blog/[slug]/page.tsx        # /blog/my-post
├── api/voice/chat/route.ts     # API: /api/voice/chat
├── layout.tsx                  # Root layout
├── loading.tsx                 # Loading UI
├── error.tsx                   # Error boundary
└── not-found.tsx               # 404 page
```

### Dynamic Routes
```tsx
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return <article>{post.content}</article>;
}

// Generate static params for SSG
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

### Route Groups
```
app/
├── (marketing)/
│   ├── page.tsx        # / (marketing homepage)
│   ├── about/page.tsx  # /about
│   └── layout.tsx      # Shared marketing layout
├── (dashboard)/
│   ├── dashboard/page.tsx
│   └── layout.tsx      # Shared dashboard layout
```

## Data Fetching

### Server Components (Preferred)
```tsx
// Direct async/await in Server Components
export default async function Page() {
  const data = await fetch("https://api.example.com/data", {
    next: { revalidate: 3600 }, // ISR: revalidate every hour
  });
  return <div>{JSON.stringify(data)}</div>;
}
```

### API Routes
```tsx
// app/api/voice/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Process request
  return NextResponse.json({ result: "success" });
}
```

## Metadata & SEO

```tsx
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Soft Standards | Digital Marketing Agency",
    template: "%s | Soft Standards",
  },
  description: "SaaS-powered digital marketing agency...",
  openGraph: {
    title: "Soft Standards",
    description: "...",
    url: "https://softstandards.com",
    siteName: "Soft Standards",
    type: "website",
  },
};
```

### Dynamic Metadata
```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}
```

## Performance Optimization

### Image Optimization
```tsx
import Image from "next/image";

<Image
  src="/hero.webp"
  alt="Hero image"
  width={1200}
  height={600}
  priority // Above-fold images
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

### Font Optimization
```tsx
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
```

### Dynamic Imports for Client Components
```tsx
import dynamic from "next/dynamic";

const VoiceAgent = dynamic(() => import("@/components/voice-agent/VoiceAgentOrb"), {
  ssr: false, // Disable SSR for browser-only components (Three.js, WebGL)
  loading: () => <div className="animate-pulse bg-gray-200 rounded-full w-16 h-16" />,
});
```

## Common Anti-Patterns

1. **Don't fetch in Client Components when Server Components work** — Move data fetching up to Server Components and pass data down as props
2. **Don't use `useEffect` for data fetching** — Use Server Components or Route Handlers instead
3. **Don't put `"use client"` at the top of layout.tsx** — This makes the entire subtree client-rendered
4. **Don't ignore loading/error states** — Always provide loading.tsx and error.tsx
5. **Don't use `window` checks in Server Components** — Use `"use client"` directive or dynamic imports with `ssr: false`
