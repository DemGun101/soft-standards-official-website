"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { fadeUp, staggerContainer } from "@/lib/animations";

function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  label,
}: {
  target: number;
  prefix?: string;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, count, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-[36px] font-bold tracking-tight text-foreground md:text-[48px]">
        {prefix}
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <p className="mt-2 text-[13px] tracking-[0.08em] text-muted uppercase">
        {label}
      </p>
    </div>
  );
}

const testimonials = [
  {
    quote: "From $12K to $89K/month in 90 days.",
    name: "James Thornton",
    company: "SpaceDome AI",
  },
  {
    quote: "CPL dropped 67% in month one.",
    name: "Rachel Kim",
    company: "Bicycle Health",
  },
  {
    quote: "Organic traffic up 5x in 60 days. Inbound leads replaced cold outreach entirely.",
    name: "Marcus Rivera",
    company: "Ryvato",
  },
];

export default function Results() {
  return (
    <section id="results" className="px-8 py-32 md:py-40">
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
            The Numbers Speak
          </h2>
          <p className="font-serif text-[20px] italic text-muted">
            Results that speak louder than pitches.
          </p>
        </motion.div>

        {/* Counters */}
        <div className="mb-24 grid grid-cols-2 gap-12 md:grid-cols-4">
          <AnimatedCounter prefix="$" target={47} suffix="M+" label="Revenue Generated" />
          <AnimatedCounter target={340} suffix="%" label="Avg ROI in 90 Days" />
          <AnimatedCounter target={67} suffix="%" label="Lower Cost Per Lead" />
          <AnimatedCounter target={97} suffix="%" label="Client Retention" />
        </div>

        {/* Testimonials */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 md:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              custom={i * 0.12}
              className="rounded-[24px] border-t border-border-subtle bg-card p-10 transition-colors duration-300"
            >
              <p className="mb-8 text-[18px] font-medium leading-[1.6]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-[14px] font-semibold">{t.name}</p>
                <p className="font-serif text-[14px] italic text-muted">
                  {t.company}
                </p>
                <div className="mt-1.5 flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
