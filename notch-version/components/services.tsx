"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const services = [
  {
    title: "Brand Strategy",
    description: "Positioning that makes you unforgettable.",
    detail: "Logo, voice, messaging, and visual identity — all aligned to your market position. Delivered in week one.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Web Development",
    description: "Fast sites that convert, not just load.",
    detail: "Next.js, React, and headless CMS. Sub-2s load times, SEO-ready, and built to capture leads on every page.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "UI/UX Design",
    description: "Interfaces tested for results, not aesthetics.",
    detail: "Wireframes, prototypes, and user testing baked into every project. We design for conversions, not awards.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
      </svg>
    ),
  },
  {
    title: "Digital Marketing",
    description: "Ads, SEO, and email that drive revenue.",
    detail: "Google Ads, Meta, email sequences, and SEO — all tracked to revenue. You see exactly what every dollar returns.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    title: "Mobile Apps",
    description: "iOS and Android. From MVP to App Store.",
    detail: "React Native cross-platform apps. One codebase, both stores. Push notifications, analytics, and OTA updates included.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    title: "AI Automation",
    description: "Agents and workflows that replace 40+ hours/week.",
    detail: "Custom AI chatbots, lead scoring, email workflows, and CRM automation. Your team focuses on closing, not chasing.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
];

function ServiceCard({ service, index }: { service: typeof services[number]; index: number }) {
  const [touched, setTouched] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.08}
      onTouchStart={() => setTouched(true)}
      onTouchEnd={() => setTimeout(() => setTouched(false), 2000)}
      className="group cursor-default rounded-[24px] border-t border-border-subtle bg-card p-10 transition-all duration-500 hover:border-accent/40 hover:bg-card-hover"
    >
      <div className="mb-5 inline-flex rounded-2xl bg-accent/10 p-3.5 text-accent transition-colors duration-300 group-hover:bg-accent/20">
        {service.icon}
      </div>
      <h3 className="mb-2 text-[16px] font-semibold">{service.title}</h3>
      <p className="text-[14px] leading-[1.7] text-muted">
        {service.description}
      </p>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${touched ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} group-hover:grid-rows-[1fr]`}>
        <div className="overflow-hidden">
          <p className={`pt-4 text-[13px] leading-[1.7] text-foreground/70 transition-opacity duration-300 ${touched ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}>
            {service.detail}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="px-8 py-32 md:py-40">
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
            What We Build
          </h2>
          <p className="font-serif text-[20px] italic text-muted">
            Six services, one goal — make you money.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
