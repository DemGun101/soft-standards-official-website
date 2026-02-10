// =============================================================================
// FILE: lib/performance.ts
// PURPOSE: Performance utilities for Core Web Vitals optimization
// PRIORITY: 🟡 HIGH — Fixes LCP, CLS, and INP issues
// =============================================================================


// ─── 1. WEB VITALS REPORTING ─────────────────────────────────────────────────
// Track Core Web Vitals in production to monitor improvements
// Add to app/layout.tsx: import { reportWebVitals } from "@/lib/performance"

export function reportWebVitals(metric: {
  id: string;
  name: string;
  value: number;
  label: string;
}) {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Web Vital] ${metric.name}: ${metric.value.toFixed(2)}`);
  }

  // Send to your analytics in production
  // Replace with your actual analytics endpoint
  if (process.env.NODE_ENV === "production") {
    // Google Analytics 4
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", metric.name, {
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value
        ),
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
}


// ─── 2. INTERSECTION OBSERVER HOOK ──────────────────────────────────────────
// Use this for lazy-loading sections and triggering animations on scroll
// Much better than scroll event listeners (which cause jank)

import { useEffect, useRef, useState } from "react";

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element); // Only trigger once
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}


// ─── 3. PRELOAD CRITICAL RESOURCES ──────────────────────────────────────────
// Add to your <head> via layout.tsx for faster LCP

export const criticalPreloads = [
  // Preload hero font (if using custom font)
  // { rel: "preload", href: "/fonts/your-font.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },

  // Preload OG image (also used as hero bg if applicable)
  // { rel: "preload", href: "/images/og-image.jpg", as: "image" },

  // DNS prefetch for external services
  { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
  { rel: "dns-prefetch", href: "https://www.google-analytics.com" },
];
