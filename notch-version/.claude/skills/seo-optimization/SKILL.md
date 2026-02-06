---
name: seo-optimization
description: "SEO optimization for Next.js websites including technical SEO, metadata, structured data, content optimization, local SEO, and performance. Use when optimizing pages for search engines, adding meta tags, implementing structured data, auditing SEO, or improving search rankings."
---

# SEO Optimization for Next.js

Comprehensive SEO strategy covering technical SEO, on-page optimization, structured data, and content strategy.

## Technical SEO

### Metadata in Next.js App Router

```tsx
// app/layout.tsx - Site-wide defaults
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://softstandards.com"),
  title: {
    default: "Soft Standards | SaaS-Powered Digital Marketing Agency",
    template: "%s | Soft Standards",
  },
  description: "AI-powered digital marketing agency specializing in web development, UI/UX design, brand strategy, and AI automation. 120+ projects delivered with 98% client satisfaction.",
  keywords: ["digital marketing agency", "web development", "UI/UX design", "AI automation", "brand strategy", "SaaS"],
  authors: [{ name: "Soft Standards Inc." }],
  creator: "Soft Standards Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://softstandards.com",
    siteName: "Soft Standards",
    title: "Soft Standards | SaaS-Powered Digital Marketing Agency",
    description: "AI-powered digital marketing agency...",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Soft Standards" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soft Standards",
    description: "AI-powered digital marketing agency...",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://softstandards.com",
  },
};
```

### Dynamic Page Metadata
```tsx
// app/services/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: `${service.title} | Soft Standards`,
      description: service.description,
      url: `https://softstandards.com/services/${slug}`,
      images: [{ url: service.ogImage }],
    },
    alternates: {
      canonical: `https://softstandards.com/services/${slug}`,
    },
  };
}
```

### Sitemap Generation
```tsx
// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://softstandards.com";

  const staticPages = [
    "", "/about", "/services", "/pricing", "/blog", "/careers", "/case-studies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Add dynamic pages (blog posts, case studies)
  // const dynamicPages = ...

  return [...staticPages];
}
```

### Robots.txt
```tsx
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: "https://softstandards.com/sitemap.xml",
  };
}
```

## Structured Data (JSON-LD)

### Organization Schema
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Soft Standards Inc.",
  url: "https://softstandards.com",
  logo: "https://softstandards.com/logo.png",
  description: "SaaS-powered digital marketing agency",
  foundingDate: "2016",
  sameAs: [
    "https://twitter.com/softstandards",
    "https://linkedin.com/company/softstandards",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "English",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "120",
  },
}) }} />
```

### Service Schema
```tsx
{
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web Development",
  provider: { "@type": "Organization", name: "Soft Standards Inc." },
  description: "High-performance modern web applications built with Next.js, React, and cutting-edge technologies.",
  areaServed: { "@type": "Country", name: "US" },
  serviceType: "Web Development",
}
```

### FAQ Schema
```tsx
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does Soft Standards offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer AI Automation, Brand Strategy, Web Development, UI/UX Design, Digital Marketing, and App Development.",
      },
    },
  ],
}
```

## On-Page SEO Checklist

### Content Structure
- [ ] One `<h1>` per page (unique, keyword-rich, under 60 characters)
- [ ] Logical heading hierarchy: h1 > h2 > h3 (no skipping levels)
- [ ] Meta description: 150-160 characters, includes primary keyword
- [ ] URL slugs: short, descriptive, hyphenated lowercase
- [ ] Internal links: link to relevant service/blog pages
- [ ] Image alt text: descriptive, includes keywords naturally
- [ ] Canonical URL set for every page

### Performance (Core Web Vitals)
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Images: WebP/AVIF format, responsive sizes, lazy loading
- [ ] Fonts: `font-display: swap`, preload critical fonts
- [ ] JavaScript: code splitting, dynamic imports for heavy components
- [ ] CSS: minimize unused styles, critical CSS inlined

### Mobile SEO
- [ ] Responsive design (no horizontal scroll)
- [ ] Touch targets >= 44x44px
- [ ] Text readable without zoom (min 16px)
- [ ] Mobile-friendly test passes
- [ ] No intrusive interstitials

## Content Strategy for Agency SEO

### High-Value Page Types
1. **Service pages**: Detailed descriptions with case study links
2. **Case study pages**: Problem/solution/results format with metrics
3. **Blog posts**: Industry insights, how-to guides, thought leadership
4. **Location pages**: If serving specific geographic areas
5. **Comparison pages**: "Agency X vs Soft Standards" style content

### Keyword Targeting
- **Service keywords**: "web development agency", "UI/UX design services"
- **Problem keywords**: "improve website conversion rate", "redesign brand identity"
- **Long-tail keywords**: "best digital marketing agency for SaaS startups"
- **Local keywords**: city + service combinations if applicable

## E-E-A-T Signals (Experience, Expertise, Authoritativeness, Trust)

- Display team credentials and experience
- Showcase real project results with metrics
- Include client testimonials with names and companies
- Maintain an active, authoritative blog
- Link to industry credentials and partnerships
- Display trust badges, certifications, and awards
- Include clear contact information and business details
