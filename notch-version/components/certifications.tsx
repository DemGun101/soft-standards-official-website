"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const badges = [
  {
    key: "google",
    src: "/badges/google-partner.png",
    alt: "Google Partner",
    width: 761,
    height: 758,
  },
  {
    key: "meta",
    src: "/badges/meta-partner.png",
    alt: "Meta Business Partner",
    width: 414,
    height: 183,
  },
  {
    key: "hubspot",
    src: "/badges/hubspot-partner.png",
    alt: "HubSpot Certified Partner",
    width: 820,
    height: 367,
  },
  {
    key: "shopify",
    src: "/badges/shopify-partner-cropped.png",
    alt: "Shopify Partners",
    width: 800,
    height: 300,
  },
  {
    key: "clutch",
    src: "/badges/clutch-badge.png",
    alt: "Clutch Top Agency",
    width: 531,
    height: 179,
  },
  {
    key: "semrush",
    src: "/badges/semrush-partner.svg",
    alt: "Semrush Certified Agency Partner",
    width: 100,
    height: 100,
  },
];

export default function Certifications() {
  return (
    <section className="px-8 py-20">
      <div className="mx-auto max-w-[1200px]">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="mb-14 text-center text-[12px] tracking-[0.15em] text-muted uppercase"
        >
          Certified &amp; Recognized By
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-nowrap items-center justify-center gap-6 md:gap-10 lg:gap-12"
        >
          {badges.map((badge, i) => (
            <motion.div
              key={badge.key}
              variants={fadeUp}
              custom={i * 0.08}
              className="flex h-14 w-24 shrink-0 items-center justify-center md:h-16 md:w-32"
            >
              <Image
                src={badge.src}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                className="max-h-full max-w-full object-contain dark:brightness-0 dark:invert"
                unoptimized
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
