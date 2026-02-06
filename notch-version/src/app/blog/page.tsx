import { Metadata } from 'next';
import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: 'Blog — Soft Standards Inc.',
  description: 'Insights on web development, brand design, AI automation, and digital marketing strategy. Thoughts from the Soft Standards team on building digital products that matter.',
};

export default function BlogPage() {
  return <BlogContent />;
}
