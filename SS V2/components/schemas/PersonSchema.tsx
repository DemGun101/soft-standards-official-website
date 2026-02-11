interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  worksFor?: string;
  sameAs?: string[];
}

export default function PersonSchema({ name, jobTitle, worksFor = 'Soft Standards Inc.', sameAs = [] }: PersonSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    worksFor: {
      '@type': 'Organization',
      name: worksFor,
      url: 'https://www.softstandardsinc.com',
    },
    ...(sameAs.length > 0 && { sameAs }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
