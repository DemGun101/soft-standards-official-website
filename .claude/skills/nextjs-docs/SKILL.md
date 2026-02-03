---
name: nextjs-docs
description: 'Next.js documentation and development best practices. Use when: (1) Working with Next.js App Router or Pages Router, (2) Server Components, data fetching, or routing, (3) Next.js configuration or deployment, (4) Documentation updates. Triggers on: "Next.js", "App Router", "Pages Router", "Server Components", "next.config", "Vercel deployment".'
---

# Next.js Development Guide

## Project Structure

```
next-app/
├── app/                    # App Router (recommended)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── api/               # API routes
├── pages/                  # Pages Router (legacy)
├── public/                 # Static assets
├── components/            # React components
├── lib/                   # Utility functions
└── next.config.js         # Configuration
```

## App Router Basics

### Layouts

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Pages

```tsx
// app/page.tsx
export default function Home() {
  return <h1>Hello World</h1>;
}

// app/about/page.tsx
export default function About() {
  return <h1>About</h1>;
}
```

### Dynamic Routes

```tsx
// app/blog/[slug]/page.tsx
export default function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  return <h1>Post: {params.slug}</h1>;
}
```

## Server vs Client Components

### Server Components (Default)

```tsx
// No "use client" directive - runs on server
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data');
  return <div>{/* render data */}</div>;
}
```

### Client Components

```tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## Data Fetching

### Server Components (Recommended)

```tsx
// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  return res.json();
}

export default async function Posts() {
  const posts = await getPosts();
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### Client-Side with SWR

```tsx
'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return <div>Hello {data.name}!</div>;
}
```

## API Routes

### App Router (Route Handlers)

```typescript
// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello' });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}
```

## Metadata

```tsx
// app/layout.tsx or app/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'My app description',
  openGraph: {
    title: 'My App',
    description: 'My app description',
    images: ['/og-image.png'],
  },
};
```

### Dynamic Metadata

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
  };
}
```

## Image Optimization

```tsx
import Image from 'next/image';

export default function Gallery() {
  return (
    <Image
      src="/photo.jpg"
      alt="Photo"
      width={800}
      height={600}
      priority // Load immediately (above fold)
      placeholder="blur" // Show blur while loading
      blurDataURL="data:image/..." // Base64 blur placeholder
    />
  );
}
```

## Font Optimization

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

## Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['example.com'],
  },
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

## Environment Variables

```bash
# .env.local (not committed)
DATABASE_URL=postgres://...
NEXT_PUBLIC_API_URL=https://api.example.com  # Exposed to browser
```

Access in code:

```typescript
// Server-side only
const dbUrl = process.env.DATABASE_URL;

// Client-side (must have NEXT_PUBLIC_ prefix)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## Middleware

```typescript
// middleware.ts (root of project)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check auth
  const token = request.cookies.get('token');
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

## Testing Commands

```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Type checking
npm run type-check

# Linting
npm run lint
```

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

## Performance Tips

1. **Use Server Components** for data fetching
2. **Lazy load** non-critical components with `dynamic()`
3. **Optimize images** with `next/image`
4. **Use `next/font`** for font optimization
5. **Implement ISR** with `revalidate` for dynamic content
