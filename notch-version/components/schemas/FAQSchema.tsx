const faqs = [
  {
    question: "What do I need to provide before we start?",
    answer:
      "Just your brand assets (logo, colors, fonts if you have them), access to your existing accounts (domain, hosting, analytics), and a 60-minute kickoff call where we align on goals. If you don't have brand assets yet, we'll create them as part of the build.",
  },
  {
    question: "Do I need an existing website or can you start from scratch?",
    answer:
      "Either works. We can launch a brand from zero or rebuild an existing site that isn't converting. If you have an existing site, we'll review it on our strategy call and recommend whether to optimize or rebuild based on your goals.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We've built systems for SaaS, real estate, energy tech, and professional services. Our process adapts to your market, audience, and competitive landscape. If you're selling a product or service online, we can help.",
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
      "We work alongside your existing team, not against them. We handle the systems layer — the infrastructure, automations, and technical builds — while your team focuses on day-to-day content and customer relationships.",
  },
  {
    question: "How is Soft Standards different from other agencies?",
    answer:
      "Most agencies sell deliverables — a website, some ads, a few social posts. We build systems. Everything we create is engineered to work together: positioning feeds the website, the website feeds the funnel, the funnel feeds automation. That's why the results compound instead of plateauing.",
  },
  {
    question: "What happens on the strategy call?",
    answer:
      "It's a free 30-minute session. We'll learn about your business, diagnose what's holding back your growth, and outline exactly what a marketing system would look like for you — whether you work with us or not. No pitch deck. No pressure.",
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
