// =============================================================================
// FILE: components/optimized-image.tsx
// PURPOSE: Wrapper for Next.js Image with proper mobile/desktop sizing
// PRIORITY: 🟡 HIGH — Fixes oversized images on mobile
//
// PROBLEM: Your current images use w=1920 quality for ALL devices.
//          On a mobile phone, a 1920px image is ~5x larger than needed.
//
// SOLUTION: Use responsive `sizes` prop to serve appropriate image sizes
//           based on viewport width.
// =============================================================================

import Image, { ImageProps } from "next/image";

type OptimizedImageProps = Omit<ImageProps, "sizes"> & {
  /** Override responsive sizes behavior */
  sizes?: string;
  /** Presets for common patterns */
  preset?: "hero" | "testimonial" | "logo" | "full-width" | "card";
};

// Responsive sizes presets
const PRESETS: Record<string, string> = {
  // Hero images: full width on mobile, max 1200px on desktop
  hero: "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px",

  // Testimonial photos: small on all devices
  testimonial: "(max-width: 640px) 80px, (max-width: 1024px) 96px, 96px",

  // Client logos: tiny
  logo: "(max-width: 640px) 100px, (max-width: 1024px) 120px, 150px",

  // Full-width sections
  "full-width": "100vw",

  // Card images in grids
  card: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
};

export default function OptimizedImage({
  preset,
  sizes,
  quality,
  ...props
}: OptimizedImageProps) {
  const responsiveSizes = sizes || (preset ? PRESETS[preset] : PRESETS.card);

  return (
    <Image
      {...props}
      sizes={responsiveSizes}
      quality={quality || (preset === "testimonial" ? 60 : 75)}
      // Ensure dimensions are always set (prevents CLS)
      style={{
        ...((props.style as any) || {}),
        // If width/height aren't set, prevent layout shift
        ...(props.fill ? {} : { width: "100%", height: "auto" }),
      }}
    />
  );
}


// =============================================================================
// USAGE EXAMPLES:
//
// ── Testimonial photos (currently loading at 1920px!) ───────────────────
// BEFORE:
//   <Image src="/images/case-studies/james-thornton.png" width={96} height={96} alt="James Thornton" />
//
// AFTER:
//   <OptimizedImage
//     src="/images/case-studies/james-thornton.png"
//     width={96}
//     height={96}
//     alt="James Thornton, Founder of SpaceDome AI — went from $12K to $89K/month with Soft Standards"
//     preset="testimonial"
//     loading="lazy"
//   />
//
// ── Hero section image ─────────────────────────────────────────────────
//   <OptimizedImage
//     src="/images/hero-bg.jpg"
//     fill
//     alt="AI-powered marketing system dashboard"
//     preset="hero"
//     priority  // ← Load immediately (LCP element)
//   />
//
// ── Client logos ────────────────────────────────────────────────────────
//   <OptimizedImage
//     src="/images/logos/spacedome.svg"
//     width={150}
//     height={50}
//     alt="SpaceDome AI logo — Soft Standards client"
//     preset="logo"
//     loading="lazy"
//   />
// =============================================================================
