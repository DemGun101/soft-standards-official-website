import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { GoogleGenAI } from '@google/genai';
import type { BlogPost, MediumArticle, RSS2JSONResponse, FetchBlogPostsResult } from '@/types/blog';

const MEDIUM_TOPICS = [
  { tag: 'artificial-intelligence', category: 'development' as const },
  { tag: 'web-development', category: 'development' as const },
  { tag: 'digital-marketing', category: 'strategy' as const },
  { tag: 'ux-design', category: 'design' as const },
  { tag: 'brand-design', category: 'design' as const },
  { tag: 'startup-culture', category: 'culture' as const },
];

const CATEGORY_GRADIENTS: Record<BlogPost['category'], string[]> = {
  development: ['from-indigo-100 to-indigo-200', 'from-violet-100 to-violet-200', 'from-blue-100 to-blue-200'],
  design: ['from-purple-100 to-purple-200', 'from-pink-100 to-pink-200', 'from-rose-100 to-rose-200'],
  strategy: ['from-amber-100 to-amber-200', 'from-orange-100 to-orange-200', 'from-yellow-100 to-yellow-200'],
  culture: ['from-gray-100 to-gray-200', 'from-slate-100 to-slate-200', 'from-zinc-100 to-zinc-200'],
};

async function fetchMediumArticles(tag: string): Promise<MediumArticle[]> {
  try {
    const feedUrl = `https://medium.com/feed/tag/${tag}`;
    const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

    const response = await fetch(rss2jsonUrl);

    if (!response.ok) {
      console.error(`Failed to fetch articles for tag ${tag}: ${response.statusText}`);
      return [];
    }

    const data: RSS2JSONResponse = await response.json();

    if (data.status !== 'ok') {
      console.error(`RSS2JSON API error for tag ${tag}:`, data);
      return [];
    }

    return data.items || [];
  } catch (error) {
    console.error(`Error fetching articles for tag ${tag}:`, error);
    return [];
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  return `${month} ${day}`;
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

async function generateImageForPost(
  title: string,
  category: BlogPost['category'],
  index: number
): Promise<string | undefined> {
  try {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      console.warn('GOOGLE_AI_API_KEY not found, skipping image generation');
      return undefined;
    }

    const client = new GoogleGenAI({ apiKey });

    // Create a descriptive prompt based on the article title and category
    const categoryDescriptions: Record<BlogPost['category'], string> = {
      development: 'modern tech, code, programming, software development',
      design: 'creative design, aesthetics, visual art, UI/UX',
      strategy: 'business strategy, marketing, growth, analytics',
      culture: 'team collaboration, workplace, remote work, company culture',
    };

    const prompt = `Create a professional, modern blog post header image for an article titled "${title}". The image should be related to ${categoryDescriptions[category]}. Style: clean, minimalist, professional, suitable for a tech/business blog. Use vibrant but professional colors. 16:10 aspect ratio.`;

    console.log(`Generating image ${index + 1}: ${title.substring(0, 50)}...`);

    const response = await client.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
      },
    });

    // Extract image data from response
    if (response.generatedImages && response.generatedImages.length > 0) {
      const generatedImage = response.generatedImages[0];

      if (generatedImage.image?.imageBytes) {
        const imageData = generatedImage.image.imageBytes;
        const buffer = Buffer.from(imageData, 'base64');

        // Save image to public/images/blog/
        const imagesDir = join(process.cwd(), 'public', 'images', 'blog');
        await mkdir(imagesDir, { recursive: true });

        const filename = `blog-${index + 1}-${Date.now()}.png`;
        const filepath = join(imagesDir, filename);

        await writeFile(filepath, buffer);

        console.log(`Image saved: ${filename}`);
        return `/images/blog/${filename}`;
      }
    }

    console.warn('No image data in response');
    return undefined;
  } catch (error) {
    console.error(`Error generating image for "${title}":`, error);
    return undefined;
  }
}

function mapMediumArticleToBlogPost(
  article: MediumArticle,
  category: BlogPost['category'],
  id: number
): BlogPost {
  const gradients = CATEGORY_GRADIENTS[category];
  const gradient = gradients[id % gradients.length];

  const cleanDescription = stripHtmlTags(article.description);
  const excerpt = truncateText(cleanDescription, 180);

  return {
    id,
    category,
    title: article.title,
    excerpt,
    author: article.author,
    date: formatDate(article.pubDate),
    gradient,
    link: article.link,
  };
}

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret for security (optional but recommended)
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      console.warn('Unauthorized cron request attempt');
      // Still allow execution in development or if CRON_SECRET is not set
      if (process.env.NODE_ENV === 'production' && process.env.CRON_SECRET) {
        return NextResponse.json(
          { success: false, message: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    console.log('Starting blog posts fetch from Medium...');

    const allArticles: Array<{ article: MediumArticle; category: BlogPost['category'] }> = [];

    // Fetch articles from all topics
    for (const topic of MEDIUM_TOPICS) {
      const articles = await fetchMediumArticles(topic.tag);
      console.log(`Fetched ${articles.length} articles for tag: ${topic.tag}`);

      articles.forEach(article => {
        allArticles.push({ article, category: topic.category });
      });

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    if (allArticles.length === 0) {
      console.warn('No articles fetched from any topic');
      return NextResponse.json(
        { success: false, message: 'No articles fetched', postsCount: 0 },
        { status: 500 }
      );
    }

    // Remove duplicates based on link
    const uniqueArticles = allArticles.filter((item, index, self) =>
      index === self.findIndex(t => t.article.link === item.article.link)
    );

    // Filter out very short articles (likely incomplete or low quality)
    const qualityArticles = uniqueArticles.filter(
      item => stripHtmlTags(item.article.description).length > 100
    );

    // Sort by publication date (newest first)
    qualityArticles.sort((a, b) =>
      new Date(b.article.pubDate).getTime() - new Date(a.article.pubDate).getTime()
    );

    // Take top 20 articles
    const topArticles = qualityArticles.slice(0, 20);

    // Map to BlogPost format
    const blogPosts: BlogPost[] = topArticles.map((item, index) =>
      mapMediumArticleToBlogPost(item.article, item.category, index + 1)
    );

    // Generate images for each blog post
    console.log('Starting image generation for blog posts...');
    for (let i = 0; i < blogPosts.length; i++) {
      const imageUrl = await generateImageForPost(
        blogPosts[i].title,
        blogPosts[i].category,
        i
      );

      if (imageUrl) {
        blogPosts[i].imageUrl = imageUrl;
      }

      // Add delay between image generations to avoid rate limiting
      if (i < blogPosts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log(`Generated images for ${blogPosts.filter(p => p.imageUrl).length} out of ${blogPosts.length} posts`);

    // Save to public/data/blog-posts.json
    const publicDir = join(process.cwd(), 'public', 'data');
    const filePath = join(publicDir, 'blog-posts.json');

    await writeFile(filePath, JSON.stringify(blogPosts, null, 2), 'utf-8');

    console.log(`Successfully saved ${blogPosts.length} blog posts to ${filePath}`);

    const result: FetchBlogPostsResult = {
      success: true,
      message: 'Blog posts updated successfully',
      postsCount: blogPosts.length,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error updating blog posts:', error);

    const result: FetchBlogPostsResult = {
      success: false,
      message: 'Failed to update blog posts',
      error: error instanceof Error ? error.message : 'Unknown error',
    };

    return NextResponse.json(result, { status: 500 });
  }
}
