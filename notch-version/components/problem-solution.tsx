"use client";

import { motion } from "framer-motion";
import {
  fadeUp,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
} from "@/lib/animations";

const problems = [
  "Burning money on ads that don\u2019t convert",
  "Your website looks good but doesn\u2019t generate leads",
  "Juggling 5 tools that don\u2019t talk to each other",
];

const solutions = [
  "An integrated funnel that turns ad spend into booked calls",
  "Pages engineered for conversions \u2014 not just aesthetics",
  "One system where brand, site, ads, and automation work together",
];

export default function ProblemSolution() {
  return (
    <section className="relative px-8 py-32 md:py-40">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-[600px] w-[600px] rounded-full bg-accent/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px]">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="mb-16 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[13px] font-medium tracking-wide text-accent">
              The Shift
            </span>
          </div>
          <h2 className="mb-4 text-[clamp(2rem,5vw,3rem)] font-bold tracking-[-0.03em]">
            Stop Guessing. Start Converting.
          </h2>
          <p className="mx-auto max-w-lg text-[17px] leading-relaxed text-muted">
            Most businesses run disconnected tools and wonder why nothing works.
            We replace the chaos with one system built to grow.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid gap-5 md:grid-cols-[1fr_1.4fr_1fr]">
          {/* Left column — Problems */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-3"
          >
            <motion.div variants={slideFromLeft} className="mb-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-danger/20 bg-danger/[0.06] px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-danger" />
                <span className="text-[12px] font-medium tracking-wide text-danger">
                  Without Us
                </span>
              </span>
            </motion.div>

            {problems.map((text, i) => (
              <motion.div
                key={i}
                variants={slideFromLeft}
                className="group flex items-start gap-3 rounded-2xl border border-danger/8 bg-danger/[0.03] p-5 transition-all duration-500 hover:border-danger/15 hover:bg-danger/[0.06]"
              >
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-danger/10">
                  <svg
                    className="h-3.5 w-3.5 text-danger"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <p className="text-[15px] leading-[1.6] text-muted">
                  {text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Center — Statement Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.15}
            className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-accent/15 bg-accent/[0.05] p-8 md:p-10"
          >
            {/* Top glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-accent/15 blur-[80px]" />

            {/* Convergence lines */}
            <div className="pointer-events-none absolute inset-0">
              <svg
                className="h-full w-full text-accent"
                viewBox="0 0 400 400"
                preserveAspectRatio="none"
              >
                <line
                  x1="0"
                  y1="80"
                  x2="200"
                  y2="200"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.08"
                />
                <line
                  x1="0"
                  y1="200"
                  x2="200"
                  y2="200"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.08"
                />
                <line
                  x1="0"
                  y1="320"
                  x2="200"
                  y2="200"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.08"
                />
                <line
                  x1="200"
                  y1="200"
                  x2="400"
                  y2="80"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.08"
                />
                <line
                  x1="200"
                  y1="200"
                  x2="400"
                  y2="200"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.08"
                />
                <line
                  x1="200"
                  y1="200"
                  x2="400"
                  y2="320"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.08"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="3"
                  fill="currentColor"
                  opacity="0.15"
                />
              </svg>
            </div>

            <div className="relative text-center">
              <p className="text-[72px] font-bold leading-none tracking-[-0.04em] text-accent md:text-[88px]">
                1
              </p>
              <p className="mt-2 text-[20px] font-semibold tracking-[-0.02em] text-foreground">
                Unified System
              </p>
              <p className="mx-auto mt-4 max-w-[260px] text-[15px] leading-[1.7] text-muted">
                Brand, website, ads, and automation — designed by one team to
                work as one machine.
              </p>
            </div>
          </motion.div>

          {/* Right column — Solutions */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-3"
          >
            <motion.div
              variants={slideFromRight}
              className="mb-1 md:text-right"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.06] px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-[12px] font-medium tracking-wide text-accent">
                  With Soft Standards
                </span>
              </span>
            </motion.div>

            {solutions.map((text, i) => (
              <motion.div
                key={i}
                variants={slideFromRight}
                className="group flex items-start gap-3 rounded-2xl border border-accent/8 bg-accent/[0.04] p-5 transition-all duration-500 hover:border-accent/15 hover:bg-accent/[0.08]"
              >
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <svg
                    className="h-3.5 w-3.5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </div>
                <p className="text-[15px] font-medium leading-[1.6] text-foreground">
                  {text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
