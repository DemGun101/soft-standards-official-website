'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import RevealOnScroll from '@/components/RevealOnScroll';
import { SectionHeader } from '@/components/Section';
import { ArrowRightIcon, MailIcon } from '@/components/Icons';
import type { BlogPost } from '@/types/blog';
import HeroSection from '@/components/HeroSection';

const fallbackBlogPosts: BlogPost[] = [
  { id: 1, category: 'development', title: 'How AI Automation Is Changing Small Business Marketing', excerpt: 'AI isn\'t just for enterprise anymore. We explore how small and mid-size businesses can use automation to compete with bigger players — without losing their personal touch.', author: 'Akash Ahmed', date: 'Jan 24, 2025', gradient: 'from-indigo-100 to-indigo-200' },
  { id: 2, category: 'design', title: 'The Art of Visual Storytelling in Brand Design', excerpt: 'Great brands don\'t just look good — they tell a story. How we approach visual identity to create designs that resonate emotionally with your audience.', author: 'Alishba Ahmed', date: 'Jan 20, 2025', gradient: 'from-purple-100 to-purple-200' },
  { id: 3, category: 'strategy', title: 'From First Call to Launch: Our Client Process', excerpt: 'A transparent look at how we work with clients from initial discovery through delivery — and why communication matters more than tools.', author: 'Muhammad Furqan', date: 'Jan 16, 2025', gradient: 'from-amber-100 to-amber-200' },
  { id: 4, category: 'design', title: 'Why Clean Design Wins Every Time', excerpt: 'Minimalism isn\'t about doing less — it\'s about being intentional. How we use white space, typography, and restraint to create interfaces that breathe.', author: 'Hashir Saleem', date: 'Jan 12, 2025', gradient: 'from-pink-100 to-pink-200' },
  { id: 5, category: 'development', title: 'Building Fast Websites That Actually Convert', excerpt: 'Speed matters, but conversion matters more. Our approach to building sites that load in under 2 seconds and guide visitors toward action.', author: 'Akash Ahmed', date: 'Jan 8, 2025', gradient: 'from-violet-100 to-violet-200' },
  { id: 6, category: 'culture', title: 'Growing a Remote Team That Actually Works', excerpt: 'How we built a distributed team across different cities without losing our collaborative spirit, work quality, or sense of belonging.', author: 'Zain-ul-Abedeen', date: 'Jan 4, 2025', gradient: 'from-gray-100 to-gray-200' },
];

const tags = ['AI Automation', 'Web Development', 'Brand Design', 'UX', 'Marketing Strategy', 'Culture', 'Next.js', 'React', 'Graphic Design', 'Client Success', 'Performance', 'Typography', 'Remote Work', 'Business Growth'];

const filters = [
  { value: 'all', label: 'All' },
  { value: 'design', label: 'Design' },
  { value: 'development', label: 'Development' },
  { value: 'strategy', label: 'Strategy' },
  { value: 'culture', label: 'Culture' },
];

export default function BlogContent() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(fallbackBlogPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogPosts() {
      try {
        const response = await fetch('/data/blog-posts.json');
        if (response.ok) {
          const posts: BlogPost[] = await response.json();
          if (posts && posts.length > 0) {
            setBlogPosts(posts);
          }
        }
      } catch (error) {
        console.error('Failed to load blog posts, using fallback:', error);
      } finally {
        setLoading(false);
      }
    }

    loadBlogPosts();
  }, []);

  const filteredPosts = activeFilter === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeFilter);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thanks for subscribing!');
  };

  return (
    <>
      <HeroSection
        title={<>Marketing Blog — AI Automation, Growth Strategy & <span className="text-gradient">Web Development Insights</span></>}
        subtitle="Thoughts on design, development, strategy, and the craft of building digital products that matter."
        background="light"
        showScrollIndicator={false}
      />

      {/* Filter Tabs */}
      <section className="px-[clamp(20px,5vw,80px)] -mt-8 mb-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2.5 rounded-full text-[0.9rem] font-medium transition-all border-[1.5px]
                ${activeFilter === filter.value
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200 hover:text-gray-800'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      {blogPosts.length > 0 && (
        <section className="pb-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
          <RevealOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-0 max-w-[1200px] mx-auto bg-white rounded-[36px] overflow-hidden border border-black/5 shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition-all duration-350 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)]">
              <div className="min-h-[320px] relative overflow-hidden">
                {blogPosts[0].imageUrl ? (
                  <img
                    src={blogPosts[0].imageUrl}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`bg-gradient-to-br ${blogPosts[0].gradient} w-full h-full`} />
                )}
              </div>
              <div className="p-12 flex flex-col justify-center">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[0.8rem] font-semibold bg-purple-50 text-purple-700 border border-purple-100 mb-4 w-fit">
                  {blogPosts[0].category.charAt(0).toUpperCase() + blogPosts[0].category.slice(1)}
                </span>
                <h2 className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-extrabold text-gray-900 tracking-[-0.02em] leading-[1.2] mb-3">
                  {blogPosts[0].title}
                </h2>
                <p className="text-[0.95rem] text-gray-500 leading-[1.7] mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-3 text-[0.85rem] text-gray-500 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-200 to-purple-400" />
                  <span><span className="font-semibold text-gray-800">{blogPosts[0].author}</span> · {blogPosts[0].date}</span>
                </div>
                <Link
                  href={blogPosts[0].link || '#'}
                  target={blogPosts[0].link ? '_blank' : undefined}
                  rel={blogPosts[0].link ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 text-purple-500 text-base font-semibold transition-all hover:gap-3.5 mt-2"
                >
                  Read Article
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <h2 className="sr-only">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {filteredPosts.slice(1).map((post, index) => (
            <RevealOnScroll key={post.id} delay={(index % 6) + 1}>
              <Link
                href={post.link || '#'}
                target={post.link ? '_blank' : undefined}
                rel={post.link ? 'noopener noreferrer' : undefined}
                className="block"
              >
                <article className="bg-white rounded-[28px] overflow-hidden border border-black/5 transition-all duration-350 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)] group h-full">
                  <div className="aspect-[16/10] overflow-hidden">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${post.gradient} transition-transform duration-400 group-hover:scale-105`} />
                    )}
                  </div>
                  <div className="p-6">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[0.8rem] font-semibold bg-purple-50 text-purple-700 border border-purple-100 mb-3">
                      {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </span>
                    <h3 className="text-[1.1rem] font-bold text-gray-900 tracking-[-0.01em] leading-[1.3] mb-2">{post.title}</h3>
                    <p className="text-[0.88rem] text-gray-500 leading-[1.6] mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-[0.85rem] text-gray-500">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-200 to-purple-400" />
                      <span><span className="font-semibold text-gray-800">{post.author}</span> · {post.date}</span>
                    </div>
                  </div>
                </article>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <div className="bg-[#F8FAFC] rounded-[36px] py-[clamp(40px,6vw,72px)] px-[clamp(24px,4vw,64px)] text-center max-w-[1200px] mx-auto relative overflow-hidden">
            <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(124,58,237,0.08)_0%,transparent_70%)] rounded-full pointer-events-none" />

            <div className="w-14 h-14 bg-purple-100 rounded-[20px] flex items-center justify-center mx-auto mb-5">
              <MailIcon />
            </div>
            <h2 className="text-[1.6rem] font-extrabold text-gray-900 mb-2">Stay in the loop</h2>
            <p className="text-[0.95rem] text-gray-500 mb-7">Get our latest insights, case studies, and announcements delivered monthly.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-[440px] mx-auto relative">
              <input
                type="email"
                placeholder="Your email address"
                required
                className="flex-1 px-6 py-4 bg-white/70 backdrop-blur-xl border-[1.5px] border-purple-100 rounded-full text-[0.95rem] text-gray-900 outline-none transition-colors focus:border-purple-400 placeholder:text-gray-500"
              />
              <button
                type="submit"
                className="px-7 py-4 bg-purple-500 text-white rounded-full font-semibold text-[0.95rem] whitespace-nowrap transition-colors hover:bg-purple-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </RevealOnScroll>
      </section>

      {/* Topics Cloud */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SectionHeader
            title={<><span className="text-gradient">Topics</span></>}
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-[1200px] mx-auto">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-5 py-2.5 bg-white border-[1.5px] border-gray-100 rounded-full text-[0.9rem] font-medium text-gray-600 cursor-pointer transition-all hover:bg-purple-500 hover:border-purple-500 hover:text-white hover:-translate-y-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
