import { Metadata } from 'next';
import CaseStudiesContent from './CaseStudiesContent';

export const metadata: Metadata = {
  title: 'Case Studies — Real Projects, Real Results',
  description: 'See how we helped clients grow revenue by 7x, cut cost per lead by 67%, and build marketing systems that scale. Portfolio of web, SaaS, mobile, and brand projects.',
  keywords: ['digital marketing case studies', 'web development portfolio', 'marketing agency results', 'SaaS marketing examples', 'client success stories'],
  openGraph: {
    title: 'Case Studies — Soft Standards Inc.',
    description: 'Real projects, real results. Revenue growth, lead generation, and brand transformations across industries.',
    type: 'website',
    url: 'https://softstandards.net/case-studies',
  },
  alternates: { canonical: 'https://softstandards.net/case-studies' },
};

export default function CaseStudiesPage() {
  return <CaseStudiesContent />;
}
