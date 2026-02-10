interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbSchemaProps {
  breadcrumbs: BreadcrumbItem[];
  currentPage: string;
}

export default function BreadcrumbSchema({ breadcrumbs, currentPage }: BreadcrumbSchemaProps) {
  const items = [
    ...breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: crumb.name,
      item: `https://www.softstandardsinc.com${crumb.href}`,
    })),
    {
      '@type': 'ListItem' as const,
      position: breadcrumbs.length + 1,
      name: currentPage,
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items,
        }),
      }}
    />
  );
}
