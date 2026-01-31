"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Logo({ className = "" }) {
  return (
    <Link href="/" className={className}>
      <motion.div
        className="flex items-center gap-2 font-bold text-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-sm">
          N
        </div>
        <span className="text-foreground">
          Nexus<span className="text-primary">.</span>
        </span>
      </motion.div>
    </Link>
  );
}
