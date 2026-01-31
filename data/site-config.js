export const siteConfig = {
  name: "Nexus Digital",
  description: "We craft digital experiences that convert",
  tagline: "Premium Digital Agency",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nexusdigital.agency",

  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  social: [
    { platform: "twitter", url: "https://twitter.com/nexusdigital", icon: "Twitter" },
    { platform: "linkedin", url: "https://linkedin.com/company/nexusdigital", icon: "Linkedin" },
    { platform: "instagram", url: "https://instagram.com/nexusdigital", icon: "Instagram" },
    { platform: "github", url: "https://github.com/nexusdigital", icon: "Github" },
  ],

  contact: {
    email: "hello@nexusdigital.agency",
    phone: "+1 (555) 123-4567",
    address: "123 Innovation Street, Tech City, TC 10001",
  },

  footer: {
    description: "We transform ideas into exceptional digital experiences that drive growth and inspire action.",
    copyright: `${new Date().getFullYear()} Nexus Digital. All rights reserved.`,
  },
};
