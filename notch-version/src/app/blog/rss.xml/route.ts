import { NextResponse } from 'next/server';
import blogPosts from '../../../../public/data/blog-posts.json';

export async function GET() {
  const baseUrl = 'https://www.softstandardsinc.com';

  const items = blogPosts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${post.link}</link>
      <description><![CDATA[${post.excerpt}]]></description>
      <author>${post.author}</author>
      <category>${post.category}</category>
      <pubDate>${new Date(post.date + ', 2026').toUTCString()}</pubDate>
      <guid isPermaLink="true">${post.link}</guid>
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Soft Standards Inc. Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Insights on digital marketing, web development, UI/UX design, and AI automation from Soft Standards Inc.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
