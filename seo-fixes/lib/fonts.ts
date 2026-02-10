// =============================================================================
// FILE: lib/fonts.ts
// PURPOSE: Optimized font loading with next/font (prevents FOUT/FOIT)
// PRIORITY: 🟡 HIGH — Fixes font-related CLS on mobile
//
// USAGE: Import in layout.tsx and apply to <body> or <html>:
//   import { fontSans, fontHeading } from "@/lib/fonts";
//   <body className={`${fontSans.variable} ${fontHeading.variable}`}>
// =============================================================================

import { Inter, Plus_Jakarta_Sans } from "next/font/google";

// ─── PRIMARY FONT (Body text) ────────────────────────────────────────────────
// Inter is clean, professional, and extremely well-optimized for web
export const fontSans = Inter({
  subsets: ["latin"],
  display: "swap", // Shows fallback font immediately, swaps when loaded (no invisible text)
  variable: "--font-sans",
  // Only load weights you actually use (reduces download size)
  weight: ["400", "500", "600", "700"],
  // Preload for faster LCP
  preload: true,
});

// ─── HEADING FONT (Optional — use if you want different heading font) ────────
// Plus Jakarta Sans has a modern, premium feel for headings
export const fontHeading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["600", "700", "800"],
  preload: true,
});


// =============================================================================
// CSS USAGE (in your globals.css or Tailwind config):
//
// body {
//   font-family: var(--font-sans), system-ui, -apple-system, sans-serif;
// }
//
// h1, h2, h3 {
//   font-family: var(--font-heading), var(--font-sans), system-ui, sans-serif;
// }
//
// OR in tailwind.config.js:
//
// theme: {
//   extend: {
//     fontFamily: {
//       sans: ["var(--font-sans)", "system-ui", "sans-serif"],
//       heading: ["var(--font-heading)", "var(--font-sans)", "system-ui", "sans-serif"],
//     },
//   },
// },
// =============================================================================
