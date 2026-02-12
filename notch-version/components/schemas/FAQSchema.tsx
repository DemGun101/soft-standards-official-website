const faqs = [
  {
    question: "How much does it cost?",
    answer:
      "Plans start at $999/month. Every engagement begins with a free discovery call where we scope the project and recommend the right plan. No surprises — you'll know exactly what you're paying before we start.",
  },
  {
    question: 'What does "you only pay if it works" mean?',
    answer:
      "We tie our compensation to real results. If we don't hit the agreed-upon KPIs within the first 90 days, you don't pay. We take on the risk so you don't have to.",
  },
  {
    question: "Are there any long-term contracts?",
    answer:
      "No. All plans are month-to-month. You can cancel anytime with 30 days' notice. We keep clients because we deliver results, not because of fine print.",
  },
  {
    question: "Do I own everything you build?",
    answer:
      "Yes — 100%. Every asset we create — websites, funnels, automations, brand materials, ad creatives — belongs to you. If you ever leave, you take everything with you.",
  },
  {
    question: 'What does "built in 30 days" actually mean?',
    answer:
      "It means your complete marketing system — strategy, website, funnels, and automations — goes live within 30 calendar days of kickoff. Not a prototype. Not a draft. A fully operational system driving leads and revenue.",
  },
  {
    question: "How involved do I need to be?",
    answer:
      "Minimal. We need about 2–3 hours of your time in the first week for onboarding and strategy alignment. After that, we handle execution. You'll get async updates and can hop on calls whenever you want, but we won't waste your time.",
  },
  {
    question: "What happens after the first 30 days?",
    answer:
      "We shift into optimization mode. We analyze what's working, double down on winning channels, and continuously improve your system. Most clients see their best results in months 2–4 as the system compounds.",
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
