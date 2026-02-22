"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const projects = [
  {
    name: "Ryvato",
    category: "Enterprise Project Management Platform",
    result: "128+ active projects managed",
    tags: ["Web Dev", "UI/UX"],
    logo: "/logos/ryvato.svg",
    url: "https://ryvato.com",
  },
  {
    name: "m1neral",
    category: "Energy Tech Platform",
    result: "3 specialized industry modules",
    tags: ["Web Dev", "UI/UX"],
    logo: "/logos/m1neral.png",
    url: "https://m1neral.com",
  },
  {
    name: "GGMS",
    category: "Real Estate CRM & Marketing System",
    result: "Replaced 4+ tools with one platform",
    tags: ["Web Dev", "Automation"],
    logo: "/logos/ggms.png",
    url: "https://ggms.com",
  },
  {
    name: "Chromos Engine",
    category: "Color Intelligence AI Platform",
    result: "Full brand and product launch",
    tags: ["Brand", "Web Dev"],
    logo: "/logos/chromos.png",
    url: "https://chromosengine.com",
  },
  {
    name: "ReDraw AI",
    category: "AI Creative Tools for Artists",
    result: "60+ neural network models integrated",
    tags: ["Web Dev", "UI/UX"],
    logo: "/logos/redraw.png",
    url: "https://redraw.ai",
  },
  {
    name: "Integrity 1st Car Pros",
    category: "Automotive Service Chain",
    result: "12 locations across Texas",
    tags: ["Web Dev", "Brand"],
    logo: "/logos/integrity.png",
    url: "https://integrity1auto.com",
  },
];

export default function CaseStudies() {
  return (
    <section id="work" className="px-8 py-32 md:py-40">
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
            Our Work
          </h2>
          <p className="font-serif text-[20px] italic text-muted">
            Real systems. Real results.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              variants={fadeUp}
              custom={i * 0.08}
              className="group flex flex-col rounded-[24px] border-t border-border-subtle bg-card p-10 transition-all duration-500 hover:bg-card-hover"
            >
              <div className="mb-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border-subtle px-3 py-1 text-[11px] tracking-[0.05em] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="relative mb-4 h-12">
                <Image
                  src={project.logo}
                  alt={`${project.name} logo`}
                  fill
                  className="object-contain object-left opacity-70 transition-[filter] duration-300"
                  style={{ filter: "var(--logo-filter)" }}
                />
              </div>

              <p className="mb-6 text-[14px] leading-[1.6] text-muted">
                {project.category}
              </p>

              <div className="border-t border-border-faint pt-5">
                <p className="text-[13px] tracking-[0.03em] text-muted uppercase">
                  Key Result
                </p>
                <p className="mt-1 text-[16px] font-semibold text-accent">
                  {project.result}
                </p>
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-6 text-[14px] font-medium text-accent transition-opacity hover:opacity-80"
              >
                View Project →
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
