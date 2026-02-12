"use client";

import { motion } from "framer-motion";

const pairs = [
  {
    problem: "Burning money on ads that don\u2019t convert",
    fix: "One system that generates leads while you sleep",
    proof: "SpaceDome AI — $12K to $89K/mo in 90 days",
  },
  {
    problem: "Content gets likes, not revenue",
    fix: "Every dollar tracked to revenue",
    proof: "Bicycle Health — CPL dropped 67% in month one",
  },
  {
    problem: "Competitors with worse products are winning",
    fix: "Built, proven, and optimized in 30 days",
    proof: "Hitchhyke — Conversion rate up 4.2x",
  },
];

function TrendingDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  );
}

function TrendingUp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function ProblemSolution() {
  return (
    <section className="px-8 py-32 md:py-40">
      <div className="mx-auto max-w-[1200px]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6 flex items-center justify-center gap-6"
        >
          <span className="inline-block rounded-full border border-danger/30 bg-danger/10 px-4 py-1.5 text-[12px] font-medium tracking-[0.1em] text-danger uppercase">
            The Problem
          </span>
          <span className="hidden text-border-subtle md:block">
            <Arrow />
          </span>
          <span className="inline-block rounded-full border border-success/30 bg-success/10 px-4 py-1.5 text-[12px] font-medium tracking-[0.1em] text-success uppercase">
            The Fix
          </span>
        </motion.div>

        {/* Paired rows */}
        <div className="mt-14 space-y-5">
          {pairs.map((pair, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="grid items-stretch gap-5 md:grid-cols-[1fr_auto_1fr]"
            >
              {/* Problem card */}
              <div className="rounded-2xl border border-danger/10 bg-danger/[0.04] p-6 transition-colors duration-300 md:p-8">
                <div className="mb-3 flex items-center gap-3 text-danger">
                  <TrendingDown />
                  <span className="text-[11px] font-medium tracking-[0.1em] uppercase opacity-60">
                    Problem
                  </span>
                </div>
                <p className="text-[17px] leading-[1.6] text-muted md:text-[19px]">
                  {pair.problem}
                </p>
              </div>

              {/* Arrow connector */}
              <div className="hidden items-center md:flex">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
                >
                  <Arrow />
                </motion.div>
              </div>

              {/* Fix card */}
              <div className="rounded-2xl border border-success/10 bg-success/[0.04] p-6 transition-colors duration-300 md:p-8">
                <div className="mb-3 flex items-center gap-3 text-success">
                  <TrendingUp />
                  <span className="text-[11px] font-medium tracking-[0.1em] uppercase opacity-60">
                    Fixed
                  </span>
                </div>
                <p className="text-[17px] font-medium leading-[1.6] text-foreground md:text-[19px]">
                  {pair.fix}
                </p>
                <p className="mt-3 text-[13px] font-medium text-success/70">
                  {pair.proof}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
