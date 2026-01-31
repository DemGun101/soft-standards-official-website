// Breakpoints (matching Tailwind defaults)
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

// Animation durations (in seconds)
export const durations = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  verySlow: 1.2,
};

// Z-index scale
export const zIndex = {
  dropdown: 50,
  sticky: 100,
  modal: 200,
  tooltip: 300,
  cursor: 9999,
};

// Container max widths
export const containers = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1400px",
};

// Spacing scale
export const spacing = {
  section: {
    sm: "4rem",
    md: "6rem",
    lg: "8rem",
  },
  container: {
    padding: "1.5rem",
  },
};

// Three.js defaults
export const threeDefaults = {
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: [0, 0, 5],
  },
  canvas: {
    dpr: [1, 2],
    shadows: true,
  },
};

// GSAP defaults
export const gsapDefaults = {
  duration: 0.8,
  ease: "power3.out",
};
