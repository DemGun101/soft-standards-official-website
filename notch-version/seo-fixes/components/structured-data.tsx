// =============================================================================
// FILE: components/structured-data.tsx
// PURPOSE: JSON-LD structured data for rich snippets in Google
// PRIORITY: 🔴 CRITICAL — Helps Google understand your business
//
// USAGE: Import and add to your layout.tsx or individual pages:
//   <OrganizationSchema />        → layout.tsx (site-wide)
//   <LocalBusinessSchema />       → homepage + about page
//   <ServiceSchema services={[]}  → /services page
//   <FAQSchema faqs={[]}          → homepage or services page
//   <WebsiteSchema />             → layout.tsx (enables sitelinks search)
// =============================================================================

import React from "react";

// ─── ORGANIZATION SCHEMA ─────────────────────────────────────────────────────
// Add to layout.tsx so it appears on every page
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Soft Standards Inc.",
    url: "https://www.softstandardsinc.com",
    logo: "https://www.softstandardsinc.com/images/logo.png", // UPDATE with your actual logo URL
    description:
      "AI-powered marketing agency that builds complete marketing systems — brand, website, ads, automation — in 30 days.",
    foundingDate: "2023", // UPDATE with actual founding year
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "", // ADD your NY office street address
        addressLocality: "New York",
        addressRegion: "NY",
        postalCode: "", // ADD zip code
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Lahore",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        url: "https://www.softstandardsinc.com/book",
        availableLanguage: ["English"],
      },
    ],
    sameAs: [
      // ADD your social media profile URLs:
      // "https://www.linkedin.com/company/soft-standards-inc",
      // "https://twitter.com/softstandardsinc",
      // "https://www.instagram.com/softstandardsinc",
      // "https://www.upwork.com/agencies/YOUR_AGENCY_PROFILE",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "40", // UPDATE with actual number
      bestRating: "5",
    },
    knowsAbout: [
      "AI Marketing Automation",
      "Brand Strategy",
      "Web Development",
      "UI/UX Design",
      "Digital Marketing",
      "Growth Marketing",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── LOCAL BUSINESS SCHEMA ───────────────────────────────────────────────────
// Add to homepage and /about page for Google Maps / local search
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.softstandardsinc.com/#business",
    name: "Soft Standards Inc.",
    image: "https://www.softstandardsinc.com/images/og-image.jpg",
    url: "https://www.softstandardsinc.com",
    telephone: "", // ADD your business phone
    email: "", // ADD your business email
    address: {
      "@type": "PostalAddress",
      streetAddress: "", // ADD street address
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "", // ADD zip
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.7128, // UPDATE with exact coords
      longitude: -74.006,
    },
    priceRange: "$$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Australia" },
    ],
    serviceType: [
      "AI Marketing Automation",
      "Brand Strategy",
      "Web Development",
      "UI/UX Design",
      "Digital Marketing",
      "Growth Marketing",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── SERVICE SCHEMA ──────────────────────────────────────────────────────────
// Add to /services page or individual service pages

interface ServiceItem {
  name: string;
  description: string;
  url: string;
}

const defaultServices: ServiceItem[] = [
  {
    name: "Brand Strategy",
    description:
      "Complete brand positioning, messaging framework, and visual identity system designed to differentiate your business and convert prospects.",
    url: "https://www.softstandardsinc.com/services#brand-strategy",
  },
  {
    name: "Web Development",
    description:
      "High-converting websites built with modern frameworks, optimized for speed, SEO, and lead generation.",
    url: "https://www.softstandardsinc.com/services#web-development",
  },
  {
    name: "UI/UX Design",
    description:
      "User-centered design that turns visitors into customers with intuitive navigation and conversion-focused layouts.",
    url: "https://www.softstandardsinc.com/services#ui-ux-design",
  },
  {
    name: "Digital Marketing",
    description:
      "Data-driven ad campaigns across Google, Meta, and LinkedIn that generate qualified leads at scale.",
    url: "https://www.softstandardsinc.com/services#digital-marketing",
  },
  {
    name: "AI Automation",
    description:
      "AI-powered marketing automation systems that handle lead nurturing, email sequences, and follow-ups 24/7.",
    url: "https://www.softstandardsinc.com/services#ai-automation",
  },
  {
    name: "Growth Marketing",
    description:
      "End-to-end growth systems combining paid acquisition, conversion optimization, and retention marketing.",
    url: "https://www.softstandardsinc.com/services#growth-marketing",
  },
];

export function ServiceSchema({
  services = defaultServices,
}: {
  services?: ServiceItem[];
}) {
  const schema = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@type": "Organization",
      name: "Soft Standards Inc.",
      url: "https://www.softstandardsinc.com",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── FAQ SCHEMA ──────────────────────────────────────────────────────────────
// Add to homepage or services page — earns FAQ rich snippets in Google

interface FAQItem {
  question: string;
  answer: string;
}

const defaultFAQs: FAQItem[] = [
  {
    question: "How long does it take to build a marketing system?",
    answer:
      "We build and launch your complete marketing system — brand, website, ads, and automation — in 30 days. Week 1 is strategy, Week 2 is build, Week 3 is launch, and Week 4 is optimization.",
  },
  {
    question: "What's included in the 30-day marketing system?",
    answer:
      "Everything you need: complete brand strategy, high-converting website, ad creative and campaigns, email sequences, marketing automation, and a full optimization playbook. You own all assets forever.",
  },
  {
    question: "How does performance-based pricing work?",
    answer:
      "We charge a one-time fee to build your system, and you only pay the full amount if it performs. No monthly retainers, no hourly billing, no hostage contracts. Our incentives are aligned with your results.",
  },
  {
    question: "Do I own everything you build?",
    answer:
      "Yes. After 30 days, you own every asset — every login, every piece of copy, every design file, every automation. No proprietary platforms held over your head. It's yours forever.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We work with B2B and B2C companies across SaaS, healthcare, e-commerce, consulting, and professional services. If you have a product or service that solves a real problem, we can build a system to sell it.",
  },
  {
    question: "How is Soft Standards different from other marketing agencies?",
    answer:
      "Most agencies charge monthly retainers to 'test things.' We build a complete system in 30 days with performance-based pricing. We've generated $47M+ in client revenue with 97% retention because our systems work.",
  },
];

export function FAQSchema({ faqs = defaultFAQs }: { faqs?: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── WEBSITE SCHEMA ──────────────────────────────────────────────────────────
// Add to layout.tsx — enables sitelinks search box in Google
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Soft Standards Inc.",
    url: "https://www.softstandardsinc.com",
    description:
      "AI-powered marketing agency that builds complete marketing systems in 30 days.",
    publisher: {
      "@type": "Organization",
      name: "Soft Standards Inc.",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── REVIEW / TESTIMONIAL SCHEMA ─────────────────────────────────────────────
// Add to homepage where testimonials appear

interface ReviewItem {
  author: string;
  role: string;
  company: string;
  review: string;
  rating: number;
}

const defaultReviews: ReviewItem[] = [
  {
    author: "James Thornton",
    role: "Founder",
    company: "SpaceDome AI",
    review:
      "Soft Standards rebuilt everything. New positioning. New website. New funnel. Within 90 days, we went from $12K to $89K in monthly revenue.",
    rating: 5,
  },
  {
    author: "Rachel Kim",
    role: "VP Digital",
    company: "Bicycle Health",
    review:
      "Our cost per lead dropped 67% in the first month. We've had to slow down intake because the pipeline is too full.",
    rating: 5,
  },
  {
    author: "Daniel Porter",
    role: "Managing Director",
    company: "Meridian Consulting",
    review:
      "They didn't just build us a website — they built us a machine. Leads come in. We close them. I finally feel like a CEO instead of a marketing intern.",
    rating: 5,
  },
  {
    author: "Sarah Lin",
    role: "Founder",
    company: "Trellis Studios",
    review:
      "Our conversion rate went up 4.2x. Revenue doubled in 60 days. Same traffic. Same product. Better system.",
    rating: 5,
  },
];

export function ReviewSchema({
  reviews = defaultReviews,
}: {
  reviews?: ReviewItem[];
}) {
  const schema = reviews.map((r) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: 5,
    },
    author: {
      "@type": "Person",
      name: r.author,
      jobTitle: r.role,
      worksFor: {
        "@type": "Organization",
        name: r.company,
      },
    },
    itemReviewed: {
      "@type": "Organization",
      name: "Soft Standards Inc.",
    },
    reviewBody: r.review,
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
