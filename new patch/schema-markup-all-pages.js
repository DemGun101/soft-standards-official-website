// ============================================================
// SCHEMA MARKUP (JSON-LD) — SOFT STANDARDS
// Add each script block to the <head> or end of <body> of the
// corresponding page. Multiple schemas per page are fine.
// ============================================================


// ==================== GLOBAL (Every Page) ====================
// Add this Organization schema to EVERY page on the site.

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Soft Standards",
  "legalName": "Soft Standards Inc.",
  "url": "https://www.softstandards.net",
  "logo": "https://www.softstandards.net/logo.png",
  "description": "AI-powered marketing agency building complete marketing systems in 30 days. Brand strategy, web development, UI/UX, digital marketing, and AI automation.",
  "foundingDate": "2022",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": 6
  },
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "18820B 69th Ave Apt 1B",
      "addressLocality": "Fresh Meadows",
      "addressRegion": "NY",
      "postalCode": "11365",
      "addressCountry": "US"
    },
    {
      "@type": "PostalAddress",
      "addressLocality": "Lahore",
      "addressRegion": "Punjab",
      "addressCountry": "PK"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "url": "https://www.softstandards.net/book"
  },
  "sameAs": [
    // Add your social media profile URLs here:
    // "https://www.linkedin.com/company/softstandards",
    // "https://www.instagram.com/softstandards",
    // "https://twitter.com/softstandards",
    // "https://www.upwork.com/agencies/softstandards"
  ]
};

// Usage in HTML:
// <script type="application/ld+json">
//   { ...organizationSchema }
// </script>


// ==================== HOME PAGE (/) ====================
// Add alongside Organization schema

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Soft Standards",
  "image": "https://www.softstandards.net/og/home.jpg",
  "url": "https://www.softstandards.net",
  "telephone": "", // Add phone number if available
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "18820B 69th Ave Apt 1B",
    "addressLocality": "Fresh Meadows",
    "addressRegion": "NY",
    "postalCode": "11365",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.7282,
    "longitude": -73.7949
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47" // Update with actual review count
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Soft Standards",
  "url": "https://www.softstandards.net",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.softstandards.net/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};


// ==================== SERVICES PAGE (/services) ====================

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Marketing Services",
  "description": "Six integrated marketing services built as one system",
  "url": "https://www.softstandards.net/services",
  "numberOfItems": 6,
  "itemListElement": [
    {
      "@type": "Service",
      "position": 1,
      "name": "Brand Strategy",
      "description": "Strategic brand foundation — positioning, messaging, and identity that builds trust before you say a word.",
      "provider": { "@type": "Organization", "name": "Soft Standards" },
      "url": "https://www.softstandards.net/services#brand-strategy"
    },
    {
      "@type": "Service",
      "position": 2,
      "name": "Web Development",
      "description": "Fast, conversion-optimized websites built with Next.js, React, and TypeScript. Profitable, not just pretty.",
      "provider": { "@type": "Organization", "name": "Soft Standards" },
      "url": "https://www.softstandards.net/services#web-development"
    },
    {
      "@type": "Service",
      "position": 3,
      "name": "UI/UX Design",
      "description": "Research-backed, tested, and refined user interfaces. Designed for real users, not design awards.",
      "provider": { "@type": "Organization", "name": "Soft Standards" },
      "url": "https://www.softstandards.net/services#ui-ux-design"
    },
    {
      "@type": "Service",
      "position": 4,
      "name": "Digital Marketing",
      "description": "SEO, PPC, email, and social media running as one integrated system — not random acts of marketing.",
      "provider": { "@type": "Organization", "name": "Soft Standards" },
      "url": "https://www.softstandards.net/services#digital-marketing"
    },
    {
      "@type": "Service",
      "position": 5,
      "name": "Mobile App Development",
      "description": "iOS, Android, and cross-platform apps using React Native. Ship fast, don't break.",
      "provider": { "@type": "Organization", "name": "Soft Standards" },
      "url": "https://www.softstandards.net/services#mobile-apps"
    },
    {
      "@type": "Service",
      "position": 6,
      "name": "AI Automation",
      "description": "Custom AI agents, chatbots, and workflow automation that replace 40+ hours of manual work per week.",
      "provider": { "@type": "Organization", "name": "Soft Standards" },
      "url": "https://www.softstandards.net/services#ai-automation"
    }
  ]
};


// ==================== PRICING PAGE (/pricing) ====================

const pricingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does the pricing model work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You pay a reduced upfront cost to build your marketing system. After launch, there's a 30-day proof period where we track your KPIs at no additional cost. The monthly retainer only starts once your system is delivering measurable results — leads, revenue, or traffic benchmarks we agree on together. You can cancel anytime."
      }
    },
    {
      "@type": "Question",
      "name": "What if the system doesn't hit the agreed KPIs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You don't pay the retainer until it does. We keep optimizing during the proof period and beyond. If we can't hit the benchmarks we agreed on, we keep working until we do. We guarantee performance — no results, no retainer."
      }
    },
    {
      "@type": "Question",
      "name": "Do you charge monthly retainers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Only after your system is proven to work. The retainer covers ongoing optimization, management, and scaling of your marketing system. It's month-to-month with no lock-in — you can cancel anytime. You own everything we build."
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on the system. The upfront build ranges from $3,500 to custom pricing depending on scope. Book a free 15-minute call — we'll scope your project and give you an honest number. No bait-and-switch."
      }
    },
    {
      "@type": "Question",
      "name": "What do I own after the build?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Everything. The website, the brand assets, the funnels, the automations, the ad accounts — it's all yours. If you cancel the retainer, you keep everything we built. No hostage contracts."
      }
    }
  ]
};


// ==================== CASE STUDIES PAGE (/case-studies) ====================

const caseStudiesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Client Case Studies",
  "description": "Marketing system results from Soft Standards clients",
  "url": "https://www.softstandards.net/case-studies",
  "itemListElement": [
    {
      "@type": "CreativeWork",
      "position": 1,
      "name": "SpaceDome AI — Web Platform & Brand Identity",
      "description": "Built entire web platform, brand identity, and content engine from zero. Result: +185% organic traffic, 1.4s load time, 3x lead generation.",
      "url": "https://www.softstandards.net/case-studies/spacedome-ai"
    },
    {
      "@type": "CreativeWork",
      "position": 2,
      "name": "Bicycle Health — Patient Acquisition System",
      "description": "Built a patient acquisition system that reduced cost per lead by 67%.",
      "url": "https://www.softstandards.net/case-studies/bicycle-health"
    },
    {
      "@type": "CreativeWork",
      "position": 3,
      "name": "Trellis Studios — E-commerce Rebuild",
      "description": "Complete e-commerce platform rebuild. Revenue doubled in 60 days.",
      "url": "https://www.softstandards.net/case-studies/trellis-studios"
    },
    {
      "@type": "CreativeWork",
      "position": 4,
      "name": "Horizon Wellness — Growth Campaign",
      "description": "Growth marketing campaign that filled the client's pipeline in 90 days.",
      "url": "https://www.softstandards.net/case-studies/horizon-wellness"
    }
  ]
};


// ==================== ABOUT PAGE (/about) ====================

const aboutPersonSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Muhammad Furqan",
    "jobTitle": "CEO",
    "worksFor": { "@type": "Organization", "name": "Soft Standards" }
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ishfaq Ahmed",
    "jobTitle": "CTO",
    "worksFor": { "@type": "Organization", "name": "Soft Standards" }
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Zain-ul-Abedeen",
    "jobTitle": "Business Development",
    "worksFor": { "@type": "Organization", "name": "Soft Standards" }
  }
];


// ==================== BLOG PAGE (/blog) ====================
// Add this to the blog index page. For individual blog posts,
// use the blogPostSchema template below.

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Soft Standards Blog",
  "description": "Insights on AI marketing automation, web development, brand strategy, and growth marketing.",
  "url": "https://www.softstandards.net/blog",
  "publisher": {
    "@type": "Organization",
    "name": "Soft Standards",
    "url": "https://www.softstandards.net"
  }
};

// Template for individual blog posts — fill dynamically:
const blogPostSchemaTemplate = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{POST_TITLE}}",
  "description": "{{POST_EXCERPT}}",
  "image": "{{POST_IMAGE_URL}}",
  "datePublished": "{{PUBLISH_DATE}}",  // ISO 8601: 2026-02-09
  "dateModified": "{{MODIFIED_DATE}}",
  "author": {
    "@type": "Person",
    "name": "{{AUTHOR_NAME}}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Soft Standards",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.softstandards.net/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.softstandards.net/blog/{{POST_SLUG}}"
  }
};


// ==================== CAREERS PAGE (/careers) ====================

const jobPostingSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": "Senior Product Designer",
    "description": "5+ years product design experience. Figma expert with end-to-end portfolio. Must have led design systems.",
    "datePosted": "2026-02-01",
    "employmentType": "FULL_TIME",
    "jobLocationType": "TELECOMMUTE",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Soft Standards",
      "sameAs": "https://www.softstandards.net"
    },
    "applicantLocationRequirements": {
      "@type": "Country",
      "name": "Worldwide"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": "Full-Stack Engineer (React + Node)",
    "description": "4+ years full-stack development with React, TypeScript, and Node.js. Accessibility and performance focus required.",
    "datePosted": "2026-02-01",
    "employmentType": "FULL_TIME",
    "jobLocationType": "TELECOMMUTE",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Soft Standards",
      "sameAs": "https://www.softstandards.net"
    },
    "applicantLocationRequirements": {
      "@type": "Country",
      "name": "Worldwide"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": "Digital Marketing Strategist",
    "description": "4+ years digital marketing with proven SEO, PPC, and analytics skills. Must demonstrate campaign ROI.",
    "datePosted": "2026-02-01",
    "employmentType": "FULL_TIME",
    "jobLocationType": "TELECOMMUTE",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Soft Standards",
      "sameAs": "https://www.softstandards.net"
    },
    "applicantLocationRequirements": {
      "@type": "Country",
      "name": "Worldwide"
    }
  }
];


// ==================== BOOK PAGE (/book) ====================

const bookingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Free Growth Audit",
  "description": "Free 15-minute strategy call. We'll tell you what's broken, how we'd fix it, and what it would cost.",
  "provider": {
    "@type": "Organization",
    "name": "Soft Standards"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free 15-minute growth audit consultation"
  },
  "url": "https://www.softstandards.net/book"
};


// ============================================================
// HOW TO ADD TO YOUR HTML
// ============================================================
// For each page, add the relevant schema(s) as <script> tags:
//
// <script type="application/ld+json">
// {
//   "@context": "https://schema.org",
//   "@type": "Organization",
//   ...
// }
// </script>
//
// Multiple <script type="application/ld+json"> blocks per page
// are perfectly fine and recommended by Google.
// ============================================================
