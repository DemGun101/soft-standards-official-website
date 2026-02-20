const faqs = [
  {
    question: "What do I need to provide before we start?",
    answer:
      "Just your brand assets (logo, colors, fonts if you have them), access to your existing accounts (domain, hosting, analytics), and a 60-minute kickoff call where we align on goals. If you don't have brand assets yet, we'll create them as part of the build.",
  },
  {
    question: "Do I need an existing website or can you start from scratch?",
    answer:
      "Either works. We've launched brands from zero and rebuilt existing sites that weren't converting. If you have an existing site, we'll audit it on our discovery call and recommend whether to optimize or rebuild based on your goals.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We've built systems for SaaS, healthcare, real estate, e-commerce, energy tech, and professional services. Our process is industry-agnostic — we adapt our strategy to your market, audience, and competitive landscape. If you're selling a product or service online, we can help.",
  },
  {
    question: "Do I own everything you build?",
    answer:
      "Yes — 100%. Every asset we create — websites, funnels, automations, brand materials, ad creatives — belongs to you. If you ever leave, you take everything with you.",
  },
  {
    question: "How involved do I need to be?",
    answer:
      "Minimal. We need about 2–3 hours of your time in the first week for onboarding and strategy alignment. After that, we handle execution. You'll get async updates and can hop on calls whenever you want, but we won't waste your time.",
  },
  {
    question: "What if I already have a marketing team?",
    answer:
      "We work alongside your existing team, not against them. We handle the systems layer — the infrastructure, automations, and technical builds — while your team focuses on day-to-day content and customer relationships. Most clients find we free up 20+ hours/week for their internal team.",
  },
  {
    question: "What results can I expect?",
    answer:
      "Results vary by industry, but our average client sees a 3–5x increase in qualified leads within 90 days. We've generated over $47M in client revenue across 150+ systems. On your discovery call, we'll share case studies from businesses similar to yours.",
  },
  {
    question: "How is Soft Standards different from other agencies?",
    answer:
      "Most agencies sell deliverables — a website, some ads, a few social posts. We build systems. Everything we create is engineered to work together: positioning feeds the website, the website feeds the funnel, the funnel feeds automation. That's why our clients see compounding results instead of one-off wins.",
  },
  {
    question: "What happens on the discovery call?",
    answer:
      "It's a free 30-minute strategy session. We'll learn about your business, diagnose what's holding back your growth, and outline exactly what a marketing system would look like for you — whether you work with us or not. No pitch deck. No pressure.",
  },
];

export default function FAQSchema() {
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
