"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import ThemeToggle from "@/components/theme-toggle";

const links = [
  { label: "Process", href: "#how-it-works" },
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const logoSrc = mounted && resolvedTheme === "light" ? "/Light.jpg" : "/Dark.jpg";

  return (
    <>
      <style>{`@keyframes slideDown{from{transform:translateY(-100%)}to{transform:translateY(0)}}`}</style>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 animate-[slideDown_0.7s_cubic-bezier(0.25,0.4,0.25,1)] transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "bg-overlay backdrop-blur-2xl border-b border-border-faint"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-5">
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center text-base font-bold tracking-tight text-foreground"
          >
            <Image
              src={logoSrc}
              alt="Soft Standards"
              width={44}
              height={44}
              priority
            />
          </button>

          <div className="hidden items-center gap-10 md:flex">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-[14px] text-muted transition-colors duration-300 hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
            <ThemeToggle />
            <button
              onClick={() => scrollTo("#booking")}
              className="rounded-[50px] bg-accent px-6 py-2.5 text-[14px] font-medium text-white transition-[background-color,box-shadow] duration-300 hover:bg-accent-hover hover:shadow-[0_0_24px_rgba(123,97,255,0.25)]"
            >
              Book a Call
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-[5px] md:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block h-[1.5px] w-6 bg-foreground transition-colors"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-[1.5px] w-6 bg-foreground transition-colors"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-[1.5px] w-6 bg-foreground transition-colors"
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-overlay-heavy backdrop-blur-2xl"
          >
            {links.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                onClick={() => scrollTo(link.href)}
                className="text-3xl font-medium text-foreground"
              >
                {link.label}
              </motion.button>
            ))}
            <ThemeToggle />
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.08, duration: 0.5 }}
              onClick={() => scrollTo("#booking")}
              className="rounded-[50px] bg-accent px-10 py-4 text-lg font-medium text-white"
            >
              Book a Call
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
