"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface Project {
  name: string;
  category: string;
  result: string;
  tags: string[];
  url: string;
  color: string;
  screenshot: string;
}

const projects: Project[] = [
  {
    name: "Ryvato",
    category: "Enterprise Project Management",
    result: "128+ active projects managed",
    tags: ["Web Dev", "UI/UX"],
    url: "https://ryvato.com",
    color: "#10B981",
    screenshot: "/portfolio/ryvato.png",
  },
  {
    name: "m1neral",
    category: "Energy Tech Platform",
    result: "3 specialized industry modules",
    tags: ["Web Dev", "UI/UX"],
    url: "https://m1neral.com",
    color: "#EC4899",
    screenshot: "/portfolio/m1neral.png",
  },
  {
    name: "GGMS",
    category: "Real Estate CRM & Marketing",
    result: "Replaced 4+ tools with one platform",
    tags: ["Web Dev", "Automation"],
    url: "https://ggms.com",
    color: "#06B6D4",
    screenshot: "/portfolio/ggms.png",
  },
  {
    name: "Chromos Engine",
    category: "Color Intelligence AI Platform",
    result: "Full brand and product launch",
    tags: ["Brand", "Web Dev"],
    url: "https://chromosengine.com",
    color: "#8B5CF6",
    screenshot: "/portfolio/chromos.png",
  },
  {
    name: "ReDraw AI",
    category: "AI Creative Tools for Artists",
    result: "60+ neural network models integrated",
    tags: ["Web Dev", "UI/UX"],
    url: "https://redraw.ai",
    color: "#F59E0B",
    screenshot: "/portfolio/redraw.png",
  },
  {
    name: "Integrity 1st Car Pros",
    category: "Automotive Service Chain",
    result: "12 locations across Texas",
    tags: ["Web Dev", "Brand"],
    url: "https://integrity1auto.com",
    color: "#3B82F6",
    screenshot: "/portfolio/integrity.png",
  },
];

const ALL_TAGS = [
  "All",
  "Brand",
  "Web Dev",
  "UI/UX",
  "Automation",
] as const;

type FilterTag = (typeof ALL_TAGS)[number];

const ease = [0.25, 0.4, 0.25, 1] as const;

// ---------------------------------------------------------------------------
// Browser Mockup Card
// ---------------------------------------------------------------------------

function BrowserCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const gsapCtxRef = useRef<gsap.Context | null>(null);

  // GSAP scroll entrance
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    gsapCtxRef.current = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: index * 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => {
      gsapCtxRef.current?.revert();
      gsapCtxRef.current = null;
    };
  }, [index]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease }}
    >
      <div ref={cardRef} className="group opacity-0">
        {/* Card container */}
        <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card transition-all duration-500 hover:border-border hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]">
          {/* Browser Chrome */}
          <div className="flex items-center gap-3 border-b border-border-faint bg-background/50 px-4 py-3">
            {/* Traffic lights */}
            <div className="flex gap-1.5">
              <div className="h-[10px] w-[10px] rounded-full bg-[#FF5F57]" />
              <div className="h-[10px] w-[10px] rounded-full bg-[#FEBC2E]" />
              <div className="h-[10px] w-[10px] rounded-full bg-[#28C840]" />
            </div>

            {/* URL bar */}
            <div className="flex flex-1 items-center gap-2 rounded-md bg-card/80 px-3 py-1">
              {/* Lock icon */}
              <svg
                className="h-3 w-3 shrink-0 text-muted/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              <span className="truncate text-[12px] text-muted/70">
                {project.url.replace("https://", "")}
              </span>
            </div>
          </div>

          {/* Screenshot viewport — clips the tall image, scrolls on hover */}
          <div className="relative h-[320px] overflow-hidden md:h-[380px]">
            {/* Loading bg */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${project.color}08, ${project.color}03)`,
              }}
            />

            {/* Screenshot — fills viewport width, scrolls down on hover */}
            <div className="absolute inset-0 h-[250%] transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.4,0.25,1)] group-hover:-translate-y-[25%]">
              <Image
                src={project.screenshot}
                alt={`${project.name} — built by Soft Standards`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 580px"
                quality={90}
              />
            </div>

            {/* Bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent" />
          </div>
        </div>

        {/* Info below the browser frame */}
        <div className="px-1 pt-5">
          {/* Tags + result on same row */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-[0.03em]"
                style={{
                  borderColor: `${project.color}30`,
                  color: project.color,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Name + category */}
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <h3 className="text-[20px] font-bold tracking-[-0.02em] text-foreground">
              {project.name}
            </h3>
            <span className="shrink-0 font-serif text-[14px] italic text-muted">
              {project.category}
            </span>
          </div>

          {/* Result + visit link */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              <span
                className="text-[14px] font-semibold"
                style={{ color: project.color }}
              >
                {project.result}
              </span>
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors hover:text-foreground"
            >
              Visit Site
              <svg
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Portfolio Section
// ---------------------------------------------------------------------------

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("All");
  const headerRef = useRef<HTMLDivElement>(null);
  const gsapCtxRef = useRef<gsap.Context | null>(null);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  // GSAP header entrance
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsapCtxRef.current = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => {
      gsapCtxRef.current?.revert();
      gsapCtxRef.current = null;
    };
  }, []);

  return (
    <section id="portfolio" className="relative px-8 py-32 md:py-40">
      {/* Background orb */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-[700px] w-[700px] rounded-full bg-accent/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px]">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[13px] font-medium tracking-wide text-accent">
              Our Portfolio
            </span>
          </div>
          <h2 className="mb-4 text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.03em]">
            Our Work
          </h2>
          <p className="mx-auto max-w-lg text-[17px] leading-relaxed text-muted">
            Hover to scroll through each project we
            designed, developed, and launched.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-2xl border border-border-subtle bg-card/50 p-1.5 backdrop-blur-sm">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className="relative rounded-xl px-4 py-2 text-[13px] font-medium transition-colors duration-300"
                style={{
                  color:
                    activeFilter === tag
                      ? "var(--foreground)"
                      : "var(--muted)",
                }}
              >
                {activeFilter === tag && (
                  <motion.div
                    layoutId="portfolio-active-tab"
                    className="absolute inset-0 rounded-xl bg-background shadow-sm"
                    style={{
                      boxShadow:
                        "0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px var(--border-subtle)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2"
          >
            {filtered.map((project, i) => (
              <BrowserCard key={project.name} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="mt-24 text-center"
        >
          <p className="mb-6 text-[clamp(1.25rem,3vw,1.75rem)] font-semibold tracking-[-0.02em] text-foreground">
            Ready to be our next success story?
          </p>
          <a
            href="#booking"
            className="group/cta inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_40px_rgba(123,97,255,0.3)]"
          >
            Book a Free Strategy Call
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
