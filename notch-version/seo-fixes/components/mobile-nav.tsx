// =============================================================================
// FILE: components/mobile-nav.tsx
// PURPOSE: Mobile-optimized navigation with proper touch targets (48px min)
// PRIORITY: 🟡 HIGH — Google penalizes small touch targets on mobile
//
// FEATURES:
// - Hamburger menu with 48px touch target
// - Full-screen overlay on mobile
// - Proper aria labels for accessibility
// - Smooth animations without layout shift
// - Sticky header that shrinks on scroll
// =============================================================================

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Shrink header on scroll (better mobile UX)
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
      role="banner"
    >
      <nav
        className="container mx-auto px-4 flex items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* ── Logo ─────────────────────────────────────────────────────── */}
        <Link
          href="/"
          className="font-bold text-lg md:text-xl z-50 relative"
          aria-label="Soft Standards Inc. — Home"
          // Min touch target 48px
          style={{ minHeight: "48px", display: "flex", alignItems: "center" }}
        >
          Soft Standards Inc.
        </Link>

        {/* ── Desktop Nav ──────────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 ${
                pathname === link.href
                  ? "text-black font-semibold"
                  : "text-gray-600"
              }`}
              // Desktop links also meet 48px minimum height
              style={{ minHeight: "48px", display: "flex", alignItems: "center" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="ml-2 px-6 py-3 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
            style={{ minHeight: "48px", display: "flex", alignItems: "center" }}
          >
            Book a Call
          </Link>
        </div>

        {/* ── Mobile Hamburger ─────────────────────────────────────────── */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 flex items-center justify-center"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          // CRITICAL: 48x48px minimum touch target
          style={{ width: "48px", height: "48px" }}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-0.5 bg-current transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-current transition-opacity duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-current transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>

        {/* ── Mobile Menu Overlay ──────────────────────────────────────── */}
        <div
          id="mobile-menu"
          className={`md:hidden fixed inset-0 bg-white z-40 transition-all duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={!isOpen}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2 px-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`w-full text-center py-4 text-lg font-medium rounded-lg transition-colors ${
                  pathname === link.href
                    ? "text-black font-bold bg-gray-100"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsOpen(false)}
                // Each link is a full-width, tall touch target
                style={{ minHeight: "56px", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/book"
              className="w-full text-center py-4 mt-4 bg-black text-white rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors"
              onClick={() => setIsOpen(false)}
              style={{ minHeight: "56px", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              Book a Free Growth Audit
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
