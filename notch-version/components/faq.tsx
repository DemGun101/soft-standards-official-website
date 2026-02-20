"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const faqs = [
  {
    question: "What do I need to provide before we start?",
    answer:
      "Just your brand assets (logo, colors, fonts if you have them), access to your existing accounts (domain, hosting, analytics), and a 60-minute kickoff call where we align on goals. If you don't have brand assets yet, we'll create them as part of the build.",
  },
  {
    question: "Do I need an existing website or can you start from scratch?",
    answer:
      "Either works. We've launched brands from zero and rebuilt existing sites that weren't converting. If you have an existing site, we'll audit it on our discovery call and recommend whether to optimize or rebuild based on your goals.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We've built systems for SaaS, healthcare, real estate, e-commerce, energy tech, and professional services. Our process is industry-agnostic — we adapt our strategy to your market, audience, and competitive landscape. If you're selling a product or service online, we can help.",
  },
  {
    question: "Do I own everything you build?",
    answer:
      "Yes — 100%. Every asset we create — websites, funnels, automations, brand materials, ad creatives — belongs to you. If you ever leave, you take everything with you.",
  },
  {
    question: "How involved do I need to be?",
    answer:
      "Minimal. We need about 2–3 hours of your time in the first week for onboarding and strategy alignment. After that, we handle execution. You'll get async updates and can hop on calls whenever you want, but we won't waste your time.",
  },
  {
    question: "What if I already have a marketing team?",
    answer:
      "We work alongside your existing team, not against them. We handle the systems layer — the infrastructure, automations, and technical builds — while your team focuses on day-to-day content and customer relationships. Most clients find we free up 20+ hours/week for their internal team.",
  },
  {
    question: "What results can I expect?",
    answer:
      "Results vary by industry, but our average client sees a 3–5x increase in qualified leads within 90 days. We've generated over $47M in client revenue across 150+ systems. On your discovery call, we'll share case studies from businesses similar to yours.",
  },
  {
    question: "How is Soft Standards different from other agencies?",
    answer:
      "Most agencies sell deliverables — a website, some ads, a few social posts. We build systems. Everything we create is engineered to work together: positioning feeds the website, the website feeds the funnel, the funnel feeds automation. That's why our clients see compounding results instead of one-off wins.",
  },
  {
    question: "What happens on the discovery call?",
    answer:
      "It's a free 30-minute strategy session. We'll learn about your business, diagnose what's holding back your growth, and outline exactly what a marketing system would look like for you — whether you work with us or not. No pitch deck. No pressure.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="px-8 py-32 md:py-40">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-16 md:grid-cols-[1fr_2fr] md:gap-20">
          {/* Left column — sticky heading */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="md:sticky md:top-32 md:self-start"
          >
            <h2 className="mb-4 text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.02em]">
              Frequently Asked
              <br />
              Questions
            </h2>
            <p className="font-serif text-[20px] italic text-muted">
              Everything you need to know
              <br className="hidden md:block" />
              before getting started
            </p>
          </motion.div>

          {/* Right column — accordion */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="divide-y divide-border-subtle"
          >
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i * 0.04}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="group flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-300"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-[16px] font-medium leading-snug transition-colors duration-300 ${
                        isOpen
                          ? "text-accent"
                          : "text-foreground group-hover:text-accent"
                      }`}
                    >
                      {faq.question}
                    </span>

                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "bg-accent text-white"
                          : "bg-border-subtle text-muted group-hover:bg-accent/10 group-hover:text-accent"
                      }`}
                    >
                      <motion.svg
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{
                          duration: 0.25,
                          ease: [0.25, 0.4, 0.25, 1],
                        }}
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 5v14M5 12h14"
                        />
                      </motion.svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] },
                          opacity: { duration: 0.2, delay: 0.05 },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-12 text-[15px] leading-[1.7] text-muted">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { faqs };
