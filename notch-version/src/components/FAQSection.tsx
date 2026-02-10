'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How long does it take to build a marketing system?",
    answer: "We build and launch your complete marketing system — brand, website, ads, and automation — in 30 days. Week 1 is strategy extraction, Week 2 is building everything, Week 3 is launch with live campaigns, and Week 4 is optimization based on real data.",
  },
  {
    question: "What exactly is included in the 30-day system?",
    answer: "Everything you need to generate leads and close customers: complete brand strategy and positioning, a high-converting website, ad creative and campaign setup (Google, Meta, LinkedIn), email sequences and automation, a lead nurturing system, and a full optimization playbook with training. You own all assets forever.",
  },
  {
    question: "How does performance-based pricing work?",
    answer: "We charge a one-time fee to build your system, structured so you only pay the full amount when it performs. No monthly retainers, no hourly billing, no hidden fees. Our incentives are directly aligned with your revenue growth.",
  },
  {
    question: "Do I own everything after the 30 days?",
    answer: "Yes, 100%. Every asset, every login, every piece of copy, every design file, every automation workflow — it's all yours. We don't use proprietary platforms or hold anything hostage. You can take everything and run it yourself, hire someone else, or keep working with us.",
  },
  {
    question: "What industries do you work with?",
    answer: "We work with B2B and B2C companies across SaaS, healthcare, e-commerce, consulting, professional services, and more. If you have a product or service that solves a real problem and you're ready to scale, we can build a system to sell it.",
  },
  {
    question: "How is this different from hiring a traditional marketing agency?",
    answer: "Traditional agencies charge $5K-15K/month in retainers to 'test things' with no guaranteed timeline. We build a complete, done-for-you system in 30 days with performance-based pricing. Our 97% client retention rate speaks for itself.",
  },
  {
    question: "What if I already have a website and brand?",
    answer: "We'll audit what you have and determine what needs rebuilding vs. optimizing. During your free growth audit, we'll tell you exactly what we'd change and why — no obligation.",
  },
  {
    question: "How do I get started?",
    answer: "Book a free 15-minute growth audit. We'll review your current situation, tell you exactly how we'd build your system, what it would cost, and whether we're even the right fit. No pitch, no pressure — just clarity.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
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
    <section className="py-20 md:py-32 px-5 md:px-10 bg-gray-50" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-50 border border-purple-100 rounded-full text-[0.8rem] font-semibold text-purple-700 mb-4">
            FAQ
          </span>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-0.03em] text-gray-900 mb-3">
            Frequently <span className="text-gradient">Asked</span>
          </h2>
          <p className="text-gray-500">Everything you need to know about working with us.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`home-faq-answer-${index}`}
                style={{ minHeight: '48px' }}
              >
                <span className="font-semibold text-gray-900 text-base md:text-lg">
                  {faq.question}
                </span>
                <span
                  className="text-gray-400 text-2xl flex-shrink-0 transition-transform duration-200"
                  style={{ transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  +
                </span>
              </button>

              <div
                id={`home-faq-answer-${index}`}
                role="region"
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIndex === index ? '500px' : '0',
                  opacity: openIndex === index ? 1 : 0,
                }}
              >
                <div className="px-6 pb-5 text-gray-500 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
