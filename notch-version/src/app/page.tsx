import type { Metadata } from 'next';
import HomeContent from '@/components/home/HomeContent';
import ReviewSchema from '@/components/schemas/ReviewSchema';
import LocalBusinessSchema from '@/components/schemas/LocalBusinessSchema';

export const metadata: Metadata = {
  title: 'Soft Standards | AI-Powered Marketing Agency | New York & Lahore',
  description: 'We build complete marketing systems in 30 days — brand strategy, web development, UI/UX, AI automation, and growth marketing. 150+ systems built. $47M+ in client revenue. Pay only when it works.',
  keywords: ['AI marketing agency', 'marketing automation agency', 'web development agency NYC', 'growth marketing', 'brand strategy', 'digital marketing agency', 'AI automation'],
  openGraph: {
    title: 'Soft Standards | AI-Powered Marketing Agency | New York & Lahore',
    description: 'We build complete marketing systems in 30 days — brand strategy, web development, UI/UX, AI automation, and growth marketing. 150+ systems built. $47M+ in client revenue.',
    type: 'website',
    url: 'https://www.softstandardsinc.com/',
    images: [{ url: '/og/home.jpg', width: 1200, height: 630, alt: 'Soft Standards — AI-Powered Marketing Agency' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soft Standards | AI-Powered Marketing Agency | New York & Lahore',
    description: 'We build complete marketing systems in 30 days — 150+ systems built, $47M+ in client revenue. Pay only when it works.',
    images: ['/og/home.jpg'],
  },
  alternates: { canonical: 'https://www.softstandardsinc.com/' },
};

export default function Home() {
  return (
    <>
      <ReviewSchema />
      <LocalBusinessSchema />
      <HomeContent />
    </>
  );
}
