"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

const clients = [
  { name: "Ryvato", logo: "/logos/ryvato.svg", width: 120, height: 40 },
  { name: "GGMS", logo: "/logos/ggms.png", width: 100, height: 40 },
  { name: "m1neral", logo: "/logos/m1neral.png", width: 120, height: 40 },
  { name: "Chromos Engine", logo: "/logos/chromos.png", width: 130, height: 40 },
  { name: "ReDraw AI", logo: "/logos/redraw.png", width: 120, height: 40 },
  { name: "Integrity 1st", logo: "/logos/integrity.png", width: 130, height: 40 },
];

// Duplicate for seamless loop
const marqueeClients = [...clients, ...clients];

export default function Logos() {
  return (
    <section className="px-8 py-20">
      <div className="mx-auto max-w-[1200px]">
        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="mb-12 text-center text-[12px] tracking-[0.15em] text-muted uppercase"
        >
          Companies we&apos;ve built for
        </motion.p>

        {/* Marquee container */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.15}
          className="relative overflow-hidden"
        >
          {/* Left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

          <div className="flex animate-marquee">
            {marqueeClients.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex shrink-0 items-center justify-center px-8 md:px-12"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={client.width}
                  height={client.height}
                  className="h-10 w-auto object-contain opacity-70 dark:brightness-0 dark:invert sm:h-8"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
