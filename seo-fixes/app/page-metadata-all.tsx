// =============================================================================
// FILE: Page-level metadata for each route
// PURPOSE: Unique title + description for every page (critical for SEO)
// PRIORITY: 🔴 CRITICAL
// 
// HOW TO USE: Add the relevant `metadata` export to each page.tsx file
// =============================================================================


// ─── /services/page.tsx ──────────────────────────────────────────────────────
export const servicesMetadata = {
  title: "Services — Brand Strategy, Web Development & AI Automation",
  description:
    "Full-stack marketing services: brand strategy, web development, UI/UX design, digital marketing, AI automation, and growth marketing. Everything built and launched in 30 days.",
  alternates: {
    canonical: "https://www.softstandardsinc.com/services",
  },
  openGraph: {
    title: "Our Services | Soft Standards Inc.",
    description:
      "Full-stack marketing services: brand strategy, web development, UI/UX design, digital marketing, AI automation, and growth marketing.",
    url: "https://www.softstandardsinc.com/services",
  },
};


// ─── /pricing/page.tsx ───────────────────────────────────────────────────────
export const pricingMetadata = {
  title: "Pricing — Performance-Based Marketing Systems",
  description:
    "Transparent, performance-based pricing for complete marketing systems. No retainers, no hourly billing. You only pay if it works. See our packages and book a free growth audit.",
  alternates: {
    canonical: "https://www.softstandardsinc.com/pricing",
  },
  openGraph: {
    title: "Pricing | Soft Standards Inc.",
    description:
      "Performance-based pricing for complete marketing systems. No retainers. You only pay if it works.",
    url: "https://www.softstandardsinc.com/pricing",
  },
};


// ─── /case-studies/page.tsx ──────────────────────────────────────────────────
export const caseStudiesMetadata = {
  title: "Case Studies — Real Results From Our Marketing Systems",
  description:
    "See how we helped clients go from $12K to $89K/month in 90 days, cut cost per lead by 67%, and double e-commerce revenue. Real results, real receipts.",
  alternates: {
    canonical: "https://www.softstandardsinc.com/case-studies",
  },
  openGraph: {
    title: "Case Studies | Soft Standards Inc.",
    description:
      "Real client results: $12K→$89K/month, 67% lower CPL, 4.2x conversion rates. See the receipts.",
    url: "https://www.softstandardsinc.com/case-studies",
  },
};


// ─── /about/page.tsx ─────────────────────────────────────────────────────────
export const aboutMetadata = {
  title: "About Us — AI-Powered Marketing Agency | New York & Global",
  description:
    "Soft Standards Inc. is an AI-powered marketing agency based in New York. We've built 40+ marketing systems generating $47M+ in client revenue with 97% retention.",
  alternates: {
    canonical: "https://www.softstandardsinc.com/about",
  },
  openGraph: {
    title: "About Soft Standards Inc.",
    description:
      "AI-powered marketing agency. 40+ systems built. $47M+ in client revenue. 97% retention. Based in New York.",
    url: "https://www.softstandardsinc.com/about",
  },
};


// ─── /blog/page.tsx ──────────────────────────────────────────────────────────
export const blogMetadata = {
  title: "Blog — Marketing Systems, AI Automation & Growth Insights",
  description:
    "Expert insights on building marketing systems, AI-powered automation, brand strategy, and growth marketing. From the team at Soft Standards Inc.",
  alternates: {
    canonical: "https://www.softstandardsinc.com/blog",
  },
  openGraph: {
    title: "Blog | Soft Standards Inc.",
    description:
      "Expert insights on marketing systems, AI automation, brand strategy, and growth.",
    url: "https://www.softstandardsinc.com/blog",
  },
};


// ─── /book/page.tsx ──────────────────────────────────────────────────────────
export const bookMetadata = {
  title: "Book a Free Growth Audit — See If You Qualify",
  description:
    "Book a free 15-minute growth audit with Soft Standards Inc. We'll tell you exactly how we'd build your marketing system, what it costs, and if we're the right fit.",
  alternates: {
    canonical: "https://www.softstandardsinc.com/book",
  },
  openGraph: {
    title: "Book Your Free Growth Audit | Soft Standards Inc.",
    description:
      "15-minute call. No pitch, no pressure. Just clarity on your marketing system.",
    url: "https://www.softstandardsinc.com/book",
  },
};


// ─── /careers/page.tsx ───────────────────────────────────────────────────────
export const careersMetadata = {
  title: "Careers — Join the Soft Standards Inc. Team",
  description:
    "Join an AI-powered marketing agency building revenue machines for ambitious brands. Open positions in marketing, design, development, and AI automation.",
  alternates: {
    canonical: "https://www.softstandardsinc.com/careers",
  },
};


// =============================================================================
// HOW TO APPLY:
// 
// In each page.tsx, add at the top:
//
//   import type { Metadata } from "next";
//   
//   export const metadata: Metadata = {
//     title: "Services — Brand Strategy, Web Development & AI Automation",
//     description: "Full-stack marketing services...",
//     alternates: { canonical: "https://www.softstandardsinc.com/services" },
//     openGraph: { ... }
//   };
//
// The title will automatically append "| Soft Standards Inc." via the template
// defined in layout.tsx
// =============================================================================
