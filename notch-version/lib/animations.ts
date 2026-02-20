import type { Variants } from "framer-motion";

const ease = [0.25, 0.4, 0.25, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay },
  }),
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease },
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

/** Directional slide for multi-step wizard. custom = 1 (forward) or -1 (back) */
export const slideStep: Variants = {
  hidden: (direction: number = 1) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease },
  },
  exit: (direction: number = 1) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    transition: { duration: 0.25, ease },
  }),
};

/** Scale + fade for success confirmation */
export const scalePop: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  },
};

/* ─── Portfolio Section Animations ─── */

/** Card reveal with 3D scale + rotation, spring physics */
export const portfolioCardReveal: Variants = {
  hidden: { scale: 0.85, opacity: 0, rotateY: -8 },
  visible: (delay: number = 0) => ({
    scale: 1,
    opacity: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
      delay,
    },
  }),
};

/** Stagger container for portfolio grid — 0.15s between children */
export const portfolioStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

/** Text reveal sliding up with clip-path */
export const textRevealUp: Variants = {
  hidden: { y: "100%", opacity: 0, clipPath: "inset(100% 0 0 0)" },
  visible: (delay: number = 0) => ({
    y: "0%",
    opacity: 1,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.7, delay, ease },
  }),
};

/** Parallax image movement within cards */
export const imageParallax: Variants = {
  hidden: { scale: 1.15, y: 20 },
  visible: {
    scale: 1,
    y: 0,
    transition: { duration: 1.2, ease },
  },
};

/** Horizontal slide + fade for filter tab content switching */
export const filterTabSwitch: Variants = {
  hidden: (direction: number = 1) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease },
  },
  exit: (direction: number = 1) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
    transition: { duration: 0.3, ease },
  }),
};

/** Subtle scale + opacity pulse for accent/glow elements */
export const glowPulse: Variants = {
  hidden: { scale: 1, opacity: 0.6 },
  visible: {
    scale: [1, 1.05, 1],
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 2.5,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};
