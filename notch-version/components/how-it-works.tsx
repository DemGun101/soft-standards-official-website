"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    number: "01",
    title: "We Build It",
    description:
      "30 days. Brand, site, ads, automation. You own everything.",
  },
  {
    number: "02",
    title: "We Prove It",
    description:
      "System goes live. You pay nothing until it works.",
  },
  {
    number: "03",
    title: "You Grow",
    description: "We optimize monthly. Cancel anytime.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-8 py-32 md:py-40">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="mb-20 text-center"
        >
          <h2 className="mb-4 text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.02em]">
            How It Works
          </h2>
          <p className="font-serif text-[20px] italic text-muted">
            Simple process. Guaranteed results.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              custom={i * 0.12}
              className="group rounded-[24px] border-t border-border-subtle bg-card p-10 transition-all duration-500 hover:bg-card-hover"
            >
              {/* Number + divider */}
              <div className="mb-8 flex items-center gap-4">
                <span className="text-[48px] font-bold leading-none tracking-tight text-accent">
                  {step.number}
                </span>
                <div className="h-[1px] flex-1 bg-border-subtle transition-colors duration-500 group-hover:bg-accent/20" />
              </div>

              {/* Title */}
              <h3 className="mb-3 text-[20px] font-semibold tracking-[-0.01em]">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[15px] leading-[1.7] text-muted">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
