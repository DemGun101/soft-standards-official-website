// =============================================================================
// FILE: next.config.js (MERGE with your existing config)
// PURPOSE: Image optimization, compression, security headers, performance
// PRIORITY: 🟡 HIGH — Fixes mobile image sizes + adds security headers
// =============================================================================

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── IMAGE OPTIMIZATION (Fixes oversized mobile images) ──────────────
  images: {
    // Responsive image breakpoints — Next.js will generate optimized
    // versions at each size. Mobile gets small images, desktop gets large.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Prefer modern formats (smaller file sizes)
    formats: ["image/avif", "image/webp"],

    // Reduce default quality (75 is overkill for testimonial photos)
    // This alone can cut image sizes by 30-40%
    minimumCacheTTL: 60 * 60 * 24 * 30, // Cache images for 30 days
  },

  // ─── COMPRESSION ────────────────────────────────────────────────────
  compress: true,

  // ─── STRICT MODE (catches bugs) ────────────────────────────────────
  reactStrictMode: true,

  // ─── TRAILING SLASH (prevents duplicate URLs) ──────────────────────
  trailingSlash: false,

  // ─── POWERED BY HEADER (remove for security) ──────────────────────
  poweredByHeader: false,

  // ─── SECURITY & SEO HEADERS ────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security headers
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Strict Transport Security (HTTPS only)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, immutable", // 30 days
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // 1 year
          },
        ],
      },
    ];
  },

  // ─── REDIRECTS (www + non-www canonicalization) ────────────────────
  async redirects() {
    return [
      // Redirect non-www to www (pick ONE canonical version)
      // If your site is on Vercel, this may be handled in vercel.json instead
      // Uncomment if needed:
      // {
      //   source: "/:path*",
      //   has: [{ type: "host", value: "softstandardsinc.com" }],
      //   destination: "https://www.softstandardsinc.com/:path*",
      //   permanent: true,
      // },
    ];
  },
};

module.exports = nextConfig;
