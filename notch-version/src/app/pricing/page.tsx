import { Metadata } from 'next';
import PricingContent from './PricingContent';

export const metadata: Metadata = {
  title: 'Pricing — Transparent & Budget-Friendly Digital Services',
  description: 'Transparent pricing for web development (from $2,500), app development (from $5,000), UI/UX design (from $800), social media marketing (from $500/mo), and AI automation (from $10,000). Flexible payments available.',
  keywords: ['web development cost', 'app development pricing', 'UI/UX design rates', 'social media marketing packages', 'AI automation pricing', 'affordable digital agency'],
  openGraph: {
    title: 'Pricing — Soft Standards Inc.',
    description: 'Transparent, budget-friendly pricing for digital services. Web development from $2,500, UI/UX from $800, with bundle discounts up to 20%.',
    type: 'website',
    url: 'https://softstandards.net/pricing',
  },
  alternates: { canonical: 'https://softstandards.net/pricing' },
};

export default function PricingPage() {
  return (
    <>
      <PricingContent />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How much does web development cost at Soft Standards?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Web development starts at $2,500 for a Starter package (10+ pages, responsive design, CMS, SEO setup). Professional packages range from $3,500-$8,000 with custom animations and e-commerce. Enterprise is custom-quoted.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer payment plans?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we offer flexible monthly installment payments with no large upfront payment required. All plans include this option.",
                },
              },
              {
                "@type": "Question",
                name: "What is included in post-launch support?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "All Starter plans include 10 days of post-launch support covering bug fixes, minor adjustments, and technical assistance. Extended 30-day support is available as an add-on for $300.",
                },
              },
              {
                "@type": "Question",
                name: "Can I bundle multiple services for a discount?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! Our bundle packages save 15-20%. Digital Launch (web + design + social media) starts at $4,800, Full Stack Product (app + design + web) from $7,500, and AI Transformation (AI + web) from $10,600.",
                },
              },
              {
                "@type": "Question",
                name: "How much does AI automation cost?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "AI Automation starts at $10,000 for a Starter package including an AI chatbot/assistant, basic automation, and integration setup. Professional packages range from $15,000-$35,000 with custom AI agents and advanced workflows.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
