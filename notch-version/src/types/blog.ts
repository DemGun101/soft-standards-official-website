export interface BlogPost {
  id: number;
  category: 'development' | 'design' | 'strategy' | 'culture';
  title: string;
  excerpt: string;
  author: string;
  date: string;
  gradient: string;
  link?: string;
  imageUrl?: string;
}

export interface MediumArticle {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: Record<string, unknown>;
  categories: string[];
}

export interface RSS2JSONResponse {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: MediumArticle[];
}

export interface FetchBlogPostsResult {
  success: boolean;
  message: string;
  postsCount?: number;
  error?: string;
}
