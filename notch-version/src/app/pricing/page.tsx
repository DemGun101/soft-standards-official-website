import { Metadata } from 'next';
import PricingContent from './PricingContent';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';

export const metadata: Metadata = {
  title: "Pricing | Performance-Based Marketing — Pay Only When It Works",
  description: "No retainers until results. Reduced upfront build cost + 30-day proof period. Monthly optimization starts only when your KPIs are hit. Cancel anytime. See pricing tiers.",
  keywords: ["performance-based marketing pricing", "marketing agency pricing", "pay for results marketing", "marketing system cost"],
  alternates: {
    canonical: "https://www.softstandardsinc.com/pricing",
  },
  openGraph: {
    title: "Pricing | Pay Only When It Works | Soft Standards",
    description: "Reduced upfront build. 30-day proof period. Retainer only when KPIs hit. Cancel anytime.",
    url: "https://www.softstandardsinc.com/pricing",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
};

export default function PricingPage() {
  return (
    <>
      <BreadcrumbSchema
        breadcrumbs={[{ name: 'Home', href: '/' }]}
        currentPage="Pricing"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How does the pricing model work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You pay a reduced upfront cost to build your marketing system. After launch, there's a 30-day proof period where we track your KPIs at no additional cost. The monthly retainer only starts once your system is delivering measurable results. You can cancel anytime.",
                },
              },
              {
                "@type": "Question",
                name: "What if the system doesn't hit the agreed KPIs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You don't pay the retainer until it does. We keep optimizing during the proof period and beyond. If we can't hit the benchmarks we agreed on, we keep working until we do.",
                },
              },
              {
                "@type": "Question",
                name: "Do you charge monthly retainers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Only after your system is proven to work. The retainer covers ongoing optimization, management, and scaling. It's month-to-month with no lock-in — you can cancel anytime. You own everything we build.",
                },
              },
              {
                "@type": "Question",
                name: "How much does it cost?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The upfront build ranges from $3,500 to custom pricing depending on scope. Book a free 15-minute call — we'll scope your project and give you an honest number.",
                },
              },
              {
                "@type": "Question",
                name: "What do I own after the build?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Everything. The website, the brand assets, the funnels, the automations, the ad accounts — it's all yours. If you cancel the retainer, you keep everything we built.",
                },
              },
            ],
          }),
        }}
      />
      <PricingContent />
    </>
  );
}
