import { Metadata } from 'next';
import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: 'Marketing Blog | AI Automation, Web Dev & Growth Strategies | Soft Standards',
  description: 'Real insights on AI marketing automation, web development, brand strategy, and growth marketing from the Soft Standards team. No filler — just what actually works.',
  keywords: ['digital marketing blog', 'web development tips', 'AI automation insights', 'brand strategy blog', 'SaaS marketing tips'],
  openGraph: {
    title: 'Marketing Blog | AI Automation, Web Dev & Growth Strategies | Soft Standards',
    description: 'Real insights on AI marketing automation, web development, brand strategy, and growth marketing from the Soft Standards team.',
    type: 'website',
    url: 'https://www.softstandardsinc.com/blog',
  },
  alternates: { canonical: 'https://www.softstandardsinc.com/blog' },
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Soft Standards Blog',
            description: 'Insights on AI marketing automation, web development, brand strategy, and growth marketing.',
            url: 'https://www.softstandardsinc.com/blog',
            publisher: {
              '@type': 'Organization',
              name: 'Soft Standards',
              url: 'https://www.softstandardsinc.com',
            },
          }),
        }}
      />
      <BlogContent />
    </>
  );
}
