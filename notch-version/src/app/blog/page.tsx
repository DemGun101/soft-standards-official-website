import { Metadata } from 'next';
import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: 'Blog — Marketing, AI & Web Development Insights',
  description: 'Expert insights on web development, AI automation, brand design, and digital marketing strategy. Actionable tips from the Soft Standards team for growing your business online.',
  keywords: ['digital marketing blog', 'web development tips', 'AI automation insights', 'brand strategy blog', 'SaaS marketing tips'],
  openGraph: {
    title: 'Blog — Soft Standards Inc.',
    description: 'Expert insights on web development, AI automation, brand design, and digital marketing strategy.',
    type: 'website',
    url: 'https://softstandards.net/blog',
  },
  alternates: { canonical: 'https://softstandards.net/blog' },
};

export default function BlogPage() {
  return <BlogContent />;
}
