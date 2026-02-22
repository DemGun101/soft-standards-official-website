const reviews = [
  {
    author: "GGMS",
    body: "We were paying for four different platforms that didn\u2019t talk to each other. Soft Standards consolidated everything into one system. Our agents stopped fighting the tech and started closing deals.",
    rating: 5,
  },
  {
    author: "Chromos Engine",
    body: "From zero to a fully launched product \u2014 brand identity, website, the entire digital presence. They treated our vision like it was their own and delivered faster than we expected.",
    rating: 5,
  },
  {
    author: "ReDraw AI",
    body: "Integrating 60+ neural network models into a seamless creative platform was no small ask. The system they built handles the complexity behind the scenes so our users never feel it.",
    rating: 5,
  },
  {
    author: "Integrity 1st Car Pros",
    body: "12 locations, one website that actually represents who we are. Before working with Soft Standards, our online presence didn\u2019t match the quality of our service.",
    rating: 5,
  },
];

export default function ReviewSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Soft Standards Inc.",
    url: "https://www.softstandardsinc.com",
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Organization", name: r.author },
      reviewBody: r.body,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 5,
      reviewCount: reviews.length,
      bestRating: 5,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
