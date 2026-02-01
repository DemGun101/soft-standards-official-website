import { Metadata } from 'next';
import PricingContent from './PricingContent';

export const metadata: Metadata = {
  title: 'Pricing — Soft Standards Inc.',
  description: 'Transparent, budget-friendly pricing for web development, app development, UI/UX design, social media marketing, and AI automation services. View our packages and bundles.',
  keywords: ['pricing', 'web development cost', 'app development pricing', 'UI/UX design rates', 'social media marketing packages', 'AI automation pricing'],
  openGraph: {
    title: 'Pricing — Soft Standards Inc.',
    description: 'Transparent, budget-friendly pricing for digital services. From $800 for UI/UX design to complete digital transformation packages.',
    type: 'website',
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
