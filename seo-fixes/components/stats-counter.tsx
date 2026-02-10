// =============================================================================
// FILE: components/stats-counter.tsx
// PURPOSE: Fix the $0M+, 0%, 0%, 0% SSR rendering issue
// PRIORITY: 🔴 CRITICAL — Google sees zeros for your social proof stats
//
// PROBLEM: Your current counter component renders initial values (0) on the
//          server, then animates to final values on the client. Google's crawler
//          sees the server-rendered HTML = "$0M+", "0%", "0%", "0%".
//
// SOLUTION: Server-render the FINAL values as the default, then animate only
//           on the client when the section scrolls into view.
// =============================================================================

"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface StatItem {
  /** The final number value to animate TO */
  value: number;
  /** Prefix like "$" */
  prefix?: string;
  /** Suffix like "M+", "%", "+" */
  suffix?: string;
  /** Label text below the number */
  label: string;
}

const stats: StatItem[] = [
  { value: 47, prefix: "$", suffix: "M+", label: "Revenue generated for clients" },
  { value: 340, suffix: "%", label: "Average ROI in 90 days" },
  { value: 67, suffix: "%", label: "Average drop in cost per lead" },
  { value: 97, suffix: "%", label: "Client retention rate" },
];

// ─── INDIVIDUAL COUNTER ──────────────────────────────────────────────────────
function Counter({
  item,
  animate,
}: {
  item: StatItem;
  animate: boolean;
}) {
  const [count, setCount] = useState(item.value); // ← START at final value (SSR-safe!)

  useEffect(() => {
    if (!animate) return;

    // Reset to 0 then animate up
    setCount(0);
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = item.value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), item.value);
      setCount(current);

      if (step >= steps) {
        setCount(item.value);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [animate, item.value]);

  return (
    <div className="text-center">
      {/* 
        The key fix: This renders the FINAL value in the HTML that Google sees.
        The animation only triggers on the client after scroll.
      */}
      <div className="text-4xl md:text-5xl font-bold">
        {item.prefix || ""}
        {count}
        {item.suffix || ""}
      </div>
      <div className="text-sm md:text-base text-gray-500 mt-2">
        {item.label}
      </div>
    </div>
  );
}

// ─── STATS SECTION ───────────────────────────────────────────────────────────
export default function StatsCounter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
      }
    },
    [hasAnimated]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [handleIntersection]);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24"
      // Reserve minimum height to prevent CLS (Cumulative Layout Shift)
      style={{ minHeight: "200px" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((item, index) => (
            <Counter key={index} item={item} animate={hasAnimated} />
          ))}
        </div>
      </div>

      {/* 
        ──── NOSCRIPT FALLBACK ────────────────────────────────────────────
        If JavaScript is disabled (some crawlers), show the real values
      */}
      <noscript>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold">
                  {item.prefix || ""}
                  {item.value}
                  {item.suffix || ""}
                </div>
                <div className="text-sm text-gray-500 mt-2">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </noscript>
    </section>
  );
}


// =============================================================================
// WHY THIS WORKS:
//
// 1. useState(item.value) — Server renders "$47M+", "340%", "67%", "97%"
//    Google's crawler sees the REAL numbers, not zeros.
//
// 2. IntersectionObserver — Animation only triggers when user scrolls to the
//    section, creating a nice visual effect without hurting SSR.
//
// 3. minHeight: 200px — Prevents Cumulative Layout Shift (CLS) which hurts
//    Core Web Vitals scores.
//
// 4. <noscript> fallback — Extra safety for JS-disabled crawlers.
//
// BEFORE (what Google saw):  $0M+  |  0%  |  0%  |  0%
// AFTER  (what Google sees): $47M+ | 340% | 67% | 97%
// =============================================================================
