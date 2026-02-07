const testimonials = [
  {
    name: 'James Thornton',
    role: 'Founder, SpaceDome AI',
    text: "We were burning $8K/month on ads that weren't converting. I'd worked with three agencies before — all of them had excuses. Soft Standards rebuilt everything. New positioning. New website. New funnel. Within 90 days, we went from $12K to $89K in monthly revenue. The ROI isn't even close to anything I've experienced.",
    rating: 5,
  },
  {
    name: 'Rachel Kim',
    role: 'VP Digital, Bicycle Health',
    text: "I was skeptical. We're in healthcare — it's not exactly a 'sexy' market for agencies. But they got it. They understood our patients, our mission, our constraints. More importantly, they delivered. Our cost per lead dropped 67% in the first month.",
    rating: 5,
  },
  {
    name: 'Daniel Porter',
    role: 'Managing Director, Meridian Consulting',
    text: "I've run Meridian for 8 years. Never had a marketing system that actually worked without me babysitting it. Soft Standards changed that. They didn't just build us a website — they built us a machine. Leads come in. We close them.",
    rating: 5,
  },
  {
    name: 'Sarah Lin',
    role: 'Founder, Trellis Studios',
    text: "Our old site was pretty. It just didn't sell. They tore it apart — respectfully — and rebuilt it around conversions. Our conversion rate went up 4.2x. Revenue doubled in 60 days. Same traffic. Same product. Better system.",
    rating: 5,
  },
];

export default function ReviewSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Soft Standards Inc.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: String(testimonials.length),
      bestRating: '5',
      worstRating: '1',
    },
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: t.name,
        jobTitle: t.role,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(t.rating),
        bestRating: '5',
      },
      reviewBody: t.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
