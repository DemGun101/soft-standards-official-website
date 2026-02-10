export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://softstandardsinc.com/#business",
    name: "Soft Standards Inc.",
    image: "https://softstandardsinc.com/images/og-default.png",
    url: "https://softstandardsinc.com",
    email: "contact@softstandardsinc.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "New York",
      addressRegion: "NY",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.7128,
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
      "App Development",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
