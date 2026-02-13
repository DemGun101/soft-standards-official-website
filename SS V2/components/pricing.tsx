"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const tiers = [
  {
    name: "Starter",
    price: "$999",
    period: "/mo",
    description: "For founders ready to stop guessing",
    features: [
      "Brand strategy & positioning",
      "Conversion-optimized website",
      "Email sequences & automation",
      "Monthly optimization & reporting",
      "You own everything we build",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    price: "$1,499",
    period: "/mo",
    description: "For businesses ready to scale revenue",
    features: [
      "Everything in Starter",
      "Ad creative + campaign management",
      "Advanced funnel architecture",
      "AI chatbots & automation",
      "Bi-weekly strategy calls",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Scale",
    price: "Custom",
    period: "",
    description: "For teams that need a full marketing engine",
    features: [
      "Everything in Growth",
      "Multi-channel ad management",
      "Custom AI solutions",
      "Priority support & SLA",
      "Weekly strategy calls",
    ],
    cta: "Contact Us",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-8 py-32 md:py-40">
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
            Simple Monthly Plans
          </h2>
          <p className="font-serif text-[20px] italic text-muted">
            No contracts. Cancel anytime. You own everything.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              variants={fadeUp}
              custom={i * 0.12}
              className={`relative rounded-[24px] p-10 transition-[background-color,box-shadow] duration-500 ${
                tier.popular
                  ? "border-t-2 border-accent bg-card shadow-[0_0_60px_rgba(123,97,255,0.06)]"
                  : "border-t border-border-subtle bg-card hover:bg-card-hover"
              }`}
            >
              <div className="mb-8">
                <h3 className="mb-1 text-[18px] font-bold">{tier.name}</h3>
                <p className="text-[13px] text-muted">{tier.description}</p>
              </div>

              <div className="mb-8 flex items-baseline">
                {tier.price === "Custom" ? (
                  <span className="font-serif text-[32px] italic text-muted">
                    Let&apos;s talk
                  </span>
                ) : (
                  <>
                    <span className="text-[40px] font-bold tracking-tight">
                      {tier.price}
                    </span>
                    <span className="ml-1 text-[16px] text-muted">
                      {tier.period}
                    </span>
                  </>
                )}
              </div>

              <ul className="mb-10 space-y-3">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-[14px] text-muted"
                  >
                    <svg
                      className="h-4 w-4 shrink-0 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#booking"
                className={`block w-full rounded-[50px] py-3.5 text-center text-[14px] font-semibold transition-[background-color,border-color,box-shadow] duration-300 ${
                  tier.popular
                    ? "bg-accent text-white hover:bg-accent-hover hover:shadow-[0_0_24px_rgba(123,97,255,0.25)]"
                    : "border border-border-subtle text-foreground hover:border-accent/40 hover:bg-card-hover"
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
