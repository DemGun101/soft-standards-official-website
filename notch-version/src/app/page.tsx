import type { Metadata } from 'next';
import HomeContent from '@/components/home/HomeContent';
import ReviewSchema from '@/components/schemas/ReviewSchema';

export const metadata: Metadata = {
  title: 'Soft Standards Inc. — AI-Powered Digital Marketing Agency',
  description: 'AI-powered digital marketing agency specializing in web development, brand strategy, UI/UX design, app development, and marketing automation. 40+ projects delivered with 97% client retention. Build your marketing machine in 30 days.',
  keywords: ['digital marketing agency', 'AI marketing', 'web development agency', 'brand strategy', 'UI/UX design', 'app development', 'marketing automation', 'SaaS marketing', 'done for you marketing'],
  openGraph: {
    title: 'Soft Standards Inc. — AI-Powered Digital Marketing Agency',
    description: 'We build marketing machines that print money while you sleep. Brand, website, ads, automation — all done-for-you in 30 days.',
    type: 'website',
    url: 'https://softstandards.net',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'Soft Standards Inc.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soft Standards Inc. — AI-Powered Digital Marketing Agency',
    description: 'We build marketing machines that print money while you sleep. 40+ projects delivered, 97% client retention.',
    images: ['/images/og-default.png'],
  },
  alternates: { canonical: 'https://softstandards.net' },
};

export default function Home() {
  return (
    <>
      <ReviewSchema />
      <HomeContent />
    </>
  );
}
