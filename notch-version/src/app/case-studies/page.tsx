import { Metadata } from 'next';
import CaseStudiesContent from './CaseStudiesContent';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Case Studies | Web, AI & Marketing Portfolio | Soft Standards',
  description: 'Explore our portfolio of 40+ projects: Ryvato project management, Chromos AI color engine, Hitchhyke rideshare, m1neral energy platform, GGMS real estate CRM, and more.',
  keywords: ['web development case studies', 'app development portfolio', 'AI automation projects', 'SaaS development', 'mobile app development', 'digital agency portfolio', 'software case studies'],
  openGraph: {
    title: 'Case Studies | Web, AI & Marketing Portfolio | Soft Standards',
    description: 'Explore our portfolio: full-stack websites, AI automations, mobile apps, and SaaS platforms built for clients across multiple industries.',
    type: 'website',
    url: 'https://www.softstandardsinc.com/case-studies',
  },
  alternates: { canonical: 'https://www.softstandardsinc.com/case-studies' },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Soft Standards Case Studies",
  "description": "Portfolio of web development, AI automation, and digital marketing projects",
  "url": "https://www.softstandardsinc.com/case-studies",
  "numberOfItems": 7,
  "itemListElement": [
    { "@type": "CreativeWork", "position": 1, "name": "Ryvato — Project Management Platform", "description": "Enterprise-grade project management platform with real-time baseline locking, deviation tracking, and comprehensive organizational dashboards.", "url": "https://app.ryvato.com" },
    { "@type": "CreativeWork", "position": 2, "name": "Chromos — AI Color Intelligence Engine", "description": "AI-powered color palette generator that translates natural language descriptions into harmonious color schemes.", "url": "https://dev.chromosengine.com" },
    { "@type": "CreativeWork", "position": 3, "name": "Hitchhyke — Rideshare Platform", "description": "Jamaica's innovative rideshare platform with native iOS and Android apps and a responsive marketing website.", "url": "https://hitchhyke-development-website.web.app" },
    { "@type": "CreativeWork", "position": 4, "name": "m1neral — Energy Tech Platform", "description": "Next-generation energy technology platform serving mineral rights managers and oil & gas operators.", "url": "https://m1neral.com" },
    { "@type": "CreativeWork", "position": 5, "name": "GGMS CRM/IDX — Real Estate Marketing System", "description": "All-in-one CRM, IDX website, and marketing automation platform for real estate professionals.", "url": "https://ggms.com" },
    { "@type": "CreativeWork", "position": 6, "name": "Kreatorz — Agency Website", "description": "Bold, modern agency website for a creative and technology firm specializing in AI solutions.", "url": "https://kreatorz.co" },
    { "@type": "CreativeWork", "position": 7, "name": "Upwork Proposal Manager — Productivity Tool", "description": "Purpose-built proposal management system for Upwork freelancers to track and optimize proposals.", "url": "https://upwork-pm-system.web.app" },
  ]
};

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <BreadcrumbSchema
        breadcrumbs={[{ name: 'Home', href: '/' }]}
        currentPage="Case Studies"
      />
      <CaseStudiesContent />
    </>
  );
}
