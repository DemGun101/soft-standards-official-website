// =============================================================================
// FILE: app/layout.tsx (REPLACE your existing layout.tsx metadata export)
// PURPOSE: Fix missing meta descriptions, OG tags, Twitter cards, viewport
// PRIORITY: 🔴 CRITICAL — Do this first
// =============================================================================

import type { Metadata, Viewport } from "next";

// ─── VIEWPORT CONFIG (Mobile Optimization) ───────────────────────────────────
// This ensures proper mobile rendering and prevents zoom issues
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A2E" },
  ],
};

// ─── GLOBAL METADATA ─────────────────────────────────────────────────────────
// This replaces whatever metadata you currently have in layout.tsx
export const metadata: Metadata = {
  // Base URL for resolving relative OG images
  metadataBase: new URL("https://www.softstandardsinc.com"),

  // Title template — every page title will end with "| Soft Standards Inc."
  title: {
    default:
      "Soft Standards Inc. | AI-Powered Marketing Systems Built in 30 Days",
    template: "%s | Soft Standards Inc.",
  },

  // Homepage meta description (150-160 chars, includes CTA + social proof)
  description:
    "We build complete marketing systems — brand, website, ads, automation — in 30 days. Performance-based pricing. 97% client retention. $47M+ in tracked revenue. Book your free growth audit.",

  // Target keywords (not a ranking factor but helps with relevance signals)
  keywords: [
    "AI marketing agency",
    "done-for-you marketing",
    "marketing system",
    "performance marketing agency",
    "brand strategy agency",
    "web development agency",
    "AI automation agency",
    "growth marketing",
    "marketing machine",
    "30 day marketing system",
  ],

  // Author & publisher
  authors: [{ name: "Soft Standards Inc." }],
  creator: "Soft Standards Inc.",
  publisher: "Soft Standards Inc.",

  // Canonical URL
  alternates: {
    canonical: "https://www.softstandardsinc.com",
  },

  // Robots directives
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

  // ─── OPEN GRAPH (Facebook, LinkedIn, Slack, etc.) ───────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.softstandardsinc.com",
    siteName: "Soft Standards Inc.",
    title:
      "Soft Standards Inc. | AI-Powered Marketing Systems Built in 30 Days",
    description:
      "We build complete marketing systems — brand, website, ads, automation — in 30 days. Performance-based pricing. 97% client retention. $47M+ in tracked revenue.",
    images: [
      {
        url: "/images/og-image.jpg", // CREATE THIS: 1200x630px image with your logo + tagline
        width: 1200,
        height: 630,
        alt: "Soft Standards Inc. — AI-Powered Marketing Systems",
        type: "image/jpeg",
      },
    ],
  },

  // ─── TWITTER CARD ──────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title:
      "Soft Standards Inc. | AI-Powered Marketing Systems Built in 30 Days",
    description:
      "We build complete marketing systems — brand, website, ads, automation — in 30 days. $47M+ in tracked revenue. 97% client retention.",
    images: ["/images/og-image.jpg"], // Same image works for Twitter
    // creator: "@softstandardsinc",  // Uncomment when you have a Twitter handle
  },

  // ─── ADDITIONAL META ───────────────────────────────────────────────────
  category: "Marketing Agency",
  classification: "Business",

  // Verification tags (add your verification codes after setup)
  // verification: {
  //   google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  //   yandex: "YOUR_YANDEX_CODE",
  // },

  other: {
    "geo.region": "US-NY",
    "geo.placename": "New York",
    // Add after Google Search Console setup:
    // "google-site-verification": "YOUR_CODE_HERE",
  },
};

// ─── KEEP YOUR EXISTING LAYOUT COMPONENT BELOW ──────────────────────────────
// Just replace the metadata/viewport exports above, keep your RootLayout as-is
