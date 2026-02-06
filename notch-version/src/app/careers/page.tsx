import { Metadata } from 'next';
import CareersContent from './CareersContent';

export const metadata: Metadata = {
  title: 'Careers — Join Our Remote Team',
  description: 'Join Soft Standards Inc. — a fully remote team of developers, designers, and strategists. Open roles in engineering, design, marketing, and operations. Work from anywhere.',
  keywords: ['remote marketing jobs', 'digital agency careers', 'remote developer jobs', 'remote design jobs'],
  openGraph: {
    title: 'Careers — Soft Standards Inc.',
    description: 'Join our fully remote team. Open roles in engineering, design, marketing, and operations.',
    type: 'website',
    url: 'https://softstandards.net/careers',
  },
  alternates: { canonical: 'https://softstandards.net/careers' },
};

export default function CareersPage() {
  return <CareersContent />;
}
