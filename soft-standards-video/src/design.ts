// Soft Standards Brand Design System for Remotion

export const colors = {
  // Primary
  purple: {
    500: "#7C3AED",
    400: "#A855F7",
    600: "#6D28D9",
  },
  // Secondary
  cyan: {
    500: "#06B6D4",
    400: "#22D3EE",
  },
  // Neutrals
  navy: {
    900: "#0F172A",
    800: "#1E293B",
    700: "#334155",
    600: "#475569",
  },
  slate: {
    400: "#94A3B8",
    300: "#CBD5E1",
    200: "#E2E8F0",
    100: "#F1F5F9",
    50: "#F8FAFC",
  },
  white: "#FFFFFF",
};

export const gradients = {
  purpleText: `linear-gradient(135deg, ${colors.purple[500]} 0%, ${colors.purple[400]} 100%)`,
  heroBg: `radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.15) 0%, transparent 70%)`,
  cyanGlow: `radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)`,
  purpleGlow: `radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 70%)`,
};

// Stats for the video
export const stats = {
  systemsBuilt: 150,
  revenueGenerated: 47,
  clientRetention: 97,
  avgROI: 312,
  costPerLeadDrop: 67,
};

// Services
export const services = [
  { name: "Brand Strategy", icon: "strategy" },
  { name: "Web Development", icon: "web" },
  { name: "UI/UX Design", icon: "design" },
  { name: "Digital Marketing", icon: "marketing" },
  { name: "Mobile Apps", icon: "mobile" },
  { name: "AI Automation", icon: "ai" },
];

// Process steps
export const processSteps = [
  { week: 1, title: "EXTRACT", description: "Download everything in your head" },
  { week: 2, title: "BUILD", description: "Create your entire system" },
  { week: 3, title: "LAUNCH", description: "Ads go live, leads start flowing" },
  { week: 4, title: "OPTIMIZE", description: "Watch data, double down on wins" },
];
