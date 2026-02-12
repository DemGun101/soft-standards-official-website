"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

const clients = [
  { name: "SpaceDome AI", logo: "/logos/spacedome.svg", width: 140, height: 40 },
  { name: "Bicycle Health", logo: "/logos/bicycle-health.svg", width: 140, height: 40 },
  { name: "Ryvato", logo: "/logos/ryvato.svg", width: 120, height: 40 },
  { name: "GGMS", logo: "/logos/ggms.png", width: 100, height: 40 },
  { name: "m1neral", logo: "/logos/m1neral.png", width: 120, height: 40 },
  { name: "Trionutrition", logo: "/logos/trionutrition.png", width: 130, height: 40 },
];

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
          Trusted by
        </motion.p>
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.15}
          className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6 md:gap-8"
        >
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center py-4"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={client.width}
                height={client.height}
                className="h-10 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-8 dark:invert dark:opacity-40 dark:hover:opacity-80"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
