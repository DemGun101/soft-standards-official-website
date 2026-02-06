import { Metadata } from 'next';
import CaseStudiesContent from './CaseStudiesContent';

export const metadata: Metadata = {
  title: 'Case Studies — Soft Standards Inc.',
  description: 'Real projects, real results. Explore our portfolio of web development, SaaS platforms, mobile apps, brand design, and social media campaigns for clients across industries.',
};

export default function CaseStudiesPage() {
  return <CaseStudiesContent />;
}
