export const siteConfig = {
  name: "Soft Standards Inc.",
  description: "Where AI meets authentic brand storytelling. We help businesses grow with digital marketing, web development, and AI automation.",
  tagline: "The New Standard in Digital",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://softstandards.net",

  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],

  social: [
    { platform: "instagram", url: "https://instagram.com/softstandards", icon: "Instagram" },
    { platform: "linkedin", url: "https://www.linkedin.com/company/soft-standards-inc/", icon: "Linkedin" },
  ],

  contact: {
    email: "contact@softstandards.net",
    phone: "+1 904 835 8096",
    address: "New York, NY",
  },

  booking: "https://calendly.com/contact-softstandards/30min",

  footer: {
    description: "Where AI meets authentic brand storytelling. We help businesses grow with digital marketing, web development, and AI automation.",
    copyright: `${new Date().getFullYear()} Soft Standards Inc. All rights reserved.`,
  },
};
