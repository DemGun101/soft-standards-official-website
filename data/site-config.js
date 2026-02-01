export const siteConfig = {
  name: "Soft Standards Inc.",
  description: "Where AI meets authentic brand storytelling. We help businesses grow with digital marketing, web development, and AI automation.",
  tagline: "The New Standard in Digital",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://softstandards.net",

  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/case-studies" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],

  social: [
    { platform: "instagram", url: "https://instagram.com/softstandards", icon: "Instagram" },
    { platform: "linkedin", url: "https://linkedin.com/company/soft-sstandards-inc", icon: "Linkedin" },
  ],

  contact: {
    email: "contact@softstandards.net",
    phone: "+1 904 835 8096",
    address: "New York, NY",
  },

  booking: "https://calendly.com/youngbld101/30min",

  footer: {
    description: "Where AI meets authentic brand storytelling. We help businesses grow with digital marketing, web development, and AI automation.",
    copyright: `${new Date().getFullYear()} Soft Standards Inc. All rights reserved.`,
  },
};
