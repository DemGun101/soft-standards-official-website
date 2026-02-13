"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 pt-28 pb-12"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <div className="mx-auto max-w-[800px] text-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="mb-8 text-[clamp(2.5rem,5.5vw,4.25rem)] font-bold leading-[1.1] tracking-[-0.03em]"
          >
            Your marketing isn&apos;t broken.
            <br />
            <span className="font-serif italic font-normal text-muted">
              You just don&apos;t have a system.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mb-12 max-w-[480px] text-[17px] leading-[1.7] text-muted"
          >
            Brand. Website. Ads. Automation.
            <br />
            Built in 30 days. You only pay if it works.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <a
              href="#booking"
              className="group inline-flex items-center gap-3 rounded-[50px] bg-accent px-10 py-4 text-[15px] font-semibold text-white transition-[background-color,box-shadow] duration-300 hover:bg-accent-hover hover:shadow-[0_0_40px_rgba(123,97,255,0.3)]"
            >
              Book Your Free Audit
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Stats bar — same max-w as parent container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-16 grid grid-cols-3 border-t border-border-subtle pt-8"
        >
          {[
            { value: "150+", label: "Systems Built" },
            { value: "$47M+", label: "Client Revenue" },
            { value: "97%", label: "Retention" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-[26px] font-bold tracking-tight md:text-[32px]">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] tracking-[0.12em] text-muted uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
