interface ServiceItem {
  name: string;
  description: string;
  url: string;
}

const defaultServices: ServiceItem[] = [
  {
    name: "Brand Strategy",
    description: "Complete brand positioning, messaging framework, and visual identity system designed to differentiate your business and convert prospects.",
    url: "https://softstandards.net/services#brand-strategy",
  },
  {
    name: "Web Development",
    description: "High-converting websites built with modern frameworks, optimized for speed, SEO, and lead generation.",
    url: "https://softstandards.net/services#web-development",
  },
  {
    name: "UI/UX Design",
    description: "User-centered design that turns visitors into customers with intuitive navigation and conversion-focused layouts.",
    url: "https://softstandards.net/services#ui-ux-design",
  },
  {
    name: "Digital Marketing",
    description: "Data-driven ad campaigns across Google, Meta, and LinkedIn that generate qualified leads at scale.",
    url: "https://softstandards.net/services#digital-marketing",
  },
  {
    name: "AI Automation",
    description: "AI-powered marketing automation systems that handle lead nurturing, email sequences, and follow-ups 24/7.",
    url: "https://softstandards.net/services#ai-automation",
  },
  {
    name: "App Development",
    description: "Native and cross-platform mobile applications with performance, design, and scalability built in from day one.",
    url: "https://softstandards.net/services#app-development",
  },
];

export default function ServiceSchema({ services = defaultServices }: { services?: ServiceItem[] }) {
  const schema = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@type": "Organization",
      name: "Soft Standards Inc.",
      url: "https://softstandards.net",
    },
    areaServed: { "@type": "Country", name: "United States" },
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
