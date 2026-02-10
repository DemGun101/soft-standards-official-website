import { Metadata } from 'next';
import CareersContent from './CareersContent';

export const metadata: Metadata = {
  title: 'Careers at Soft Standards | Remote Marketing & Engineering Jobs',
  description: 'Join a 6-person remote-first AI marketing agency. Open roles in design, engineering, marketing, and operations. $2,500 growth budget. Real projects that matter.',
  keywords: ['remote marketing jobs', 'digital agency careers', 'remote developer jobs', 'marketing agency jobs'],
  openGraph: {
    title: 'Careers at Soft Standards | Remote Marketing & Engineering Jobs',
    description: 'Join a 6-person remote-first AI marketing agency. Open roles in design, engineering, marketing, and operations.',
    type: 'website',
    url: 'https://www.softstandardsinc.com/careers',
  },
  alternates: { canonical: 'https://www.softstandardsinc.com/careers' },
};

const jobPostingSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: 'Senior Product Designer',
    description: '5+ years product design experience. Figma expert with end-to-end portfolio.',
    datePosted: '2026-02-01',
    employmentType: 'FULL_TIME',
    jobLocationType: 'TELECOMMUTE',
    hiringOrganization: { '@type': 'Organization', name: 'Soft Standards', sameAs: 'https://www.softstandardsinc.com' },
    applicantLocationRequirements: { '@type': 'Country', name: 'Worldwide' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: 'Full-Stack Engineer (React + Node)',
    description: '4+ years full-stack development with React, TypeScript, and Node.js.',
    datePosted: '2026-02-01',
    employmentType: 'FULL_TIME',
    jobLocationType: 'TELECOMMUTE',
    hiringOrganization: { '@type': 'Organization', name: 'Soft Standards', sameAs: 'https://www.softstandardsinc.com' },
    applicantLocationRequirements: { '@type': 'Country', name: 'Worldwide' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: 'Digital Marketing Strategist',
    description: '4+ years digital marketing with proven SEO, PPC, and analytics skills.',
    datePosted: '2026-02-01',
    employmentType: 'FULL_TIME',
    jobLocationType: 'TELECOMMUTE',
    hiringOrganization: { '@type': 'Organization', name: 'Soft Standards', sameAs: 'https://www.softstandardsinc.com' },
    applicantLocationRequirements: { '@type': 'Country', name: 'Worldwide' },
  },
];

export default function CareersPage() {
  return (
    <>
      {jobPostingSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CareersContent />
    </>
  );
}
