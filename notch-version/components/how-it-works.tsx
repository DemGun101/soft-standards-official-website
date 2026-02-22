"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    number: "01",
    title: "We Build It",
    description:
      "Brand, site, ads, automation — built together as one integrated system by a single team.",
  },
  {
    number: "02",
    title: "We Launch It",
    description:
      "Your system goes live. We monitor performance and make sure everything is working from day one.",
  },
  {
    number: "03",
    title: "We Run It",
    description:
      "Ongoing management, optimization, and reporting every month. Your marketing team without the overhead.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-5 sm:px-8 py-32 md:py-40">
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
            Three steps. Full transparency.
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
