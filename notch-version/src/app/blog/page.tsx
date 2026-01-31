'use client';

import Link from 'next/link';
import { useState } from 'react';
import RevealOnScroll from '@/components/RevealOnScroll';
import { SectionHeader } from '@/components/Section';
import { ArrowRightIcon, MailIcon } from '@/components/Icons';

const blogPosts = [
  { id: 1, category: 'development', title: 'Why Performance Still Matters in 2026', excerpt: 'Fast sites win. Period. A deep dive into Core Web Vitals, modern optimization strategies, and why milliseconds matter more than ever.', author: 'Liam Patel', date: 'Jan 24', gradient: 'from-indigo-100 to-indigo-200' },
  { id: 2, category: 'design', title: 'Design Systems at Scale', excerpt: 'How we built a design system that serves 40+ components across web, mobile, and email — without breaking.', author: 'Maya Torres', date: 'Jan 20', gradient: 'from-purple-100 to-purple-200' },
  { id: 3, category: 'strategy', title: 'From Wireframe to Launch in 6 Weeks', excerpt: 'A case study on rapid product development — balancing speed, quality, and client collaboration.', author: 'Emma Nakamura', date: 'Jan 16', gradient: 'from-amber-100 to-amber-200' },
  { id: 4, category: 'design', title: 'The Power of White Space', excerpt: 'Why less is often more in UI design. Exploring negative space, visual hierarchy, and breathing room.', author: 'Aisha Khalil', date: 'Jan 12', gradient: 'from-pink-100 to-pink-200' },
  { id: 5, category: 'development', title: 'Building for Accessibility', excerpt: 'Accessible design isn\'t optional. Our approach to building inclusive digital experiences that work for everyone.', author: 'Carlos Reyes', date: 'Jan 8', gradient: 'from-violet-100 to-violet-200' },
  { id: 6, category: 'culture', title: 'Remote-First, Quality-Always', excerpt: 'How we built a distributed team across 3 continents without compromising craft, communication, or collaboration.', author: 'Sofia Kim', date: 'Jan 4', gradient: 'from-gray-100 to-gray-200' },
];

const tags = ['Design', 'Development', 'Branding', 'UX', 'Strategy', 'Culture', 'Tech', 'CSS', 'React', 'Accessibility', 'Performance', 'Typography', 'Color Theory', 'Remote Work'];

const filters = [
  { value: 'all', label: 'All' },
  { value: 'design', label: 'Design' },
  { value: 'development', label: 'Development' },
  { value: 'strategy', label: 'Strategy' },
  { value: 'culture', label: 'Culture' },
];

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredPosts = activeFilter === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeFilter);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thanks for subscribing! (This is a demo)');
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-[clamp(140px,18vw,200px)] pb-[clamp(60px,8vw,100px)] px-[clamp(20px,5vw,80px)] text-center relative overflow-hidden">
        <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(124,58,237,0.08)_0%,transparent_70%)] rounded-full pointer-events-none" />

        <h1 className="text-[clamp(2.8rem,7vw,5rem)] font-extrabold tracking-[-0.04em] leading-[1.05] max-w-[800px] mx-auto mb-6">
          Insights & <span className="text-gradient">Ideas</span>
        </h1>

        <p className="text-[clamp(1.05rem,2vw,1.25rem)] text-gray-500 max-w-[560px] mx-auto leading-[1.7]">
          Thoughts on design, development, strategy, and the craft of building digital products that matter.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
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
      <section className="pb-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-0 max-w-[1200px] mx-auto bg-white rounded-[36px] overflow-hidden border border-black/5 shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition-all duration-350 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)]">
            <div className="bg-gradient-to-br from-purple-200 to-purple-500 min-h-[320px]" />
            <div className="p-12 flex flex-col justify-center">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[0.8rem] font-semibold bg-purple-50 text-purple-700 border border-purple-100 mb-4 w-fit">
                Design
              </span>
              <h2 className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-extrabold text-gray-900 tracking-[-0.02em] leading-[1.2] mb-3">
                The Future of Brand Identity in the AI Era
              </h2>
              <p className="text-[0.95rem] text-gray-500 leading-[1.7] mb-6">
                As AI-generated content floods the digital landscape, authentic brand identity has never been more valuable. Here&apos;s how forward-thinking companies are adapting their visual systems for a post-AI world.
              </p>
              <div className="flex items-center gap-3 text-[0.85rem] text-gray-500 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-200 to-purple-400" />
                <span><span className="font-semibold text-gray-800">Maya Torres</span> · Jan 28, 2026</span>
              </div>
              <Link href="#" className="inline-flex items-center gap-2 text-purple-500 text-base font-semibold transition-all hover:gap-3.5 mt-2">
                Read Article
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Blog Grid */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {filteredPosts.map((post, index) => (
            <RevealOnScroll key={post.id} delay={(index % 6) + 1}>
              <article className="bg-white rounded-[28px] overflow-hidden border border-black/5 transition-all duration-350 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)] group">
                <div className="aspect-[16/10] overflow-hidden">
                  <div className={`w-full h-full bg-gradient-to-br ${post.gradient} transition-transform duration-400 group-hover:scale-105`} />
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
            title={<>Explore by <span className="text-gradient">Topic</span></>}
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
