"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const testimonials = [
  {
    quote:
      "We were paying for four different platforms that didn\u2019t talk to each other. Soft Standards consolidated everything into one system. Our agents stopped fighting the tech and started closing deals.",
    name: "GGMS",
    role: "Real Estate CRM & Marketing",
    result: "Replaced 4+ tools with one platform",
  },
  {
    quote:
      "From zero to a fully launched product \u2014 brand identity, website, the entire digital presence. They treated our vision like it was their own and delivered faster than we expected.",
    name: "Chromos Engine",
    role: "Color Intelligence AI Platform",
    result: "Full brand and product launch",
  },
  {
    quote:
      "Integrating 60+ neural network models into a seamless creative platform was no small ask. The system they built handles the complexity behind the scenes so our users never feel it.",
    name: "ReDraw AI",
    role: "AI Creative Tools for Artists",
    result: "60+ models integrated",
  },
  {
    quote:
      "12 locations, one website that actually represents who we are. Before working with Soft Standards, our online presence didn\u2019t match the quality of our service.",
    name: "Integrity 1st Car Pros",
    role: "Automotive Service Chain",
    result: "12 locations unified online",
  },
];

export default function Testimonials() {
  return (
    <section className="relative px-8 py-32 md:py-40">
      {/* Background orb */}
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
              Client Stories
            </span>
          </div>
          <h2 className="mb-4 text-[clamp(2rem,5vw,3rem)] font-bold tracking-[-0.03em]">
            What They Say About Working With Us
          </h2>
          <p className="mx-auto max-w-lg text-[17px] leading-relaxed text-muted">
            Real feedback from real projects we designed, built, and launched.
          </p>
        </motion.div>

        {/* Testimonial grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 md:grid-cols-2"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              custom={i * 0.1}
              className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-card p-8 transition-all duration-500 hover:border-border hover:bg-card-hover md:p-10"
            >
              {/* Quote mark */}
              <svg
                className="mb-6 h-8 w-8 text-accent/20"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
              </svg>

              {/* Quote text */}
              <p className="mb-8 text-[16px] leading-[1.8] text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="flex items-center justify-between border-t border-border-faint pt-5">
                <div>
                  <p className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
                    {t.name}
                  </p>
                  <p className="mt-0.5 text-[13px] text-muted">{t.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-[13px] font-medium text-accent">
                    {t.result}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
