import { Metadata } from 'next';
import CareersContent from './CareersContent';

export const metadata: Metadata = {
  title: 'Careers — Soft Standards Inc.',
  description: 'Join our fully remote team of developers, designers, and strategists. Explore open roles in engineering, design, marketing, and operations at Soft Standards Inc.',
};

export default function CareersPage() {
  return <CareersContent />;
}
