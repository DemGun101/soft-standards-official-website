'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import RevealOnScroll from '@/components/RevealOnScroll';
import { SectionHeader } from '@/components/Section';
import { ArrowRightIcon, ArrowUpRightIcon } from '@/components/Icons';

const caseStudies = [
  { id: 1, category: 'web', categoryLabel: 'Web Platform', title: 'SpaceDome AI — Web Platform & Brand', image: '/images/case-studies/spacedome-ai.png' },
  { id: 2, category: 'marketing', categoryLabel: 'Digital Marketing', title: 'Bicycle Health — Patient Acquisition', image: '/images/case-studies/bicycle-health.png' },
  { id: 3, category: 'branding', categoryLabel: 'Branding', title: 'Meridian Consulting — Brand Refresh', image: '/images/case-studies/meridian-consulting.png' },
  { id: 4, category: 'web', categoryLabel: 'E-commerce', title: 'Trellis Studios — E-commerce Platform', image: '/images/case-studies/trellis-studios.png' },
  { id: 5, category: 'branding', categoryLabel: 'Product Design', title: 'Apex Ventures — Investor Platform', image: '/images/case-studies/apex-ventures.png' },
  { id: 6, category: 'marketing', categoryLabel: 'Campaign', title: 'Horizon Wellness — Growth Campaign', image: '/images/case-studies/horizon-wellness.png' },
];

const testimonials = [
  { text: 'Soft Standards brought clarity to our brand at a critical moment. They understood our AI product deeply and translated that complexity into a website that actually resonates with our audience. The team is responsive, thoughtful, and genuinely invested in getting it right.', name: 'James Thornton', role: 'Founder, SpaceDome AI', avatar: '/images/case-studies/james-thornton.png' },
  { text: 'Working with Soft Standards felt like working with people who truly cared about our mission. They helped us rethink our digital presence and the results spoke for themselves — more patients finding the help they need, faster.', name: 'Rachel Kim', role: 'VP Digital, Bicycle Health', avatar: '/images/case-studies/rachel-kim.png' },
  { text: 'They didn\'t just deliver a beautiful website — they listened to our story and made sure every pixel reflected who we are. The whole process was smooth, collaborative, and honestly enjoyable.', name: 'Daniel Porter', role: 'Managing Director, Meridian Consulting', avatar: '/images/case-studies/daniel-porter.png' },
  { text: 'Our e-commerce revenue jumped noticeably after the redesign. Soft Standards approached everything with care and strategy, not just aesthetics. They\'re partners, not vendors.', name: 'Sarah Lin', role: 'Founder, Trellis Studios', avatar: '/images/case-studies/sarah-lin.png' },
];

const clientLogos = ['SpaceDome AI', 'Bicycle Health', 'Meridian', 'Trellis', 'Apex', 'Horizon', 'Crestview', 'Ember'];

const filters = [
  { value: 'all', label: 'All' },
  { value: 'branding', label: 'Branding' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'marketing', label: 'Marketing' },
];

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredStudies = activeFilter === 'all'
    ? caseStudies
    : caseStudies.filter(study => study.category === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="pt-[clamp(140px,18vw,200px)] pb-[clamp(60px,8vw,100px)] px-[clamp(20px,5vw,80px)] text-center relative overflow-hidden">
        <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(124,58,237,0.08)_0%,transparent_70%)] rounded-full pointer-events-none" />

        <h1 className="text-[clamp(2.8rem,7vw,5rem)] font-extrabold tracking-[-0.04em] leading-[1.05] max-w-[800px] mx-auto mb-6">
          Selected <span className="text-gradient">Work</span>
        </h1>

        <p className="text-[clamp(1.05rem,2vw,1.25rem)] text-gray-500 max-w-[560px] mx-auto leading-[1.7]">
          Real projects, real results. Every case study is a story of partnership, precision, and measurable impact.
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

      {/* Case Study Grid */}
      <section className="pb-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1200px] mx-auto">
          {filteredStudies.map((study, index) => (
            <RevealOnScroll key={study.id} delay={(index % 6) + 1}>
              <div className="rounded-[36px] overflow-hidden relative cursor-pointer aspect-[4/3] bg-gray-100 transition-transform duration-400 hover:scale-[1.02] group">
                <Image src={study.image} alt={study.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <span className="inline-flex px-3.5 py-1.5 bg-white/20 backdrop-blur-lg rounded-full text-[0.8rem] font-semibold text-white mb-3 w-fit">
                    {study.categoryLabel}
                  </span>
                  <h3 className="text-[1.4rem] font-bold text-white tracking-[-0.02em]">{study.title}</h3>
                </div>
                <div className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center bg-white/15 backdrop-blur-lg rounded-full text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                  <ArrowUpRightIcon />
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)] bg-[#0F172A] text-white">
        <RevealOnScroll>
          <SectionHeader
            badge="Featured Project"
            title="Deep Dive"
            dark
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center max-w-[1200px] mx-auto">
            <div className="aspect-[4/3] rounded-[36px] overflow-hidden relative">
              <Image src="/images/case-studies/spacedome-ai-featured.png" alt="SpaceDome AI — Featured Case Study" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw" />
            </div>
            <div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[0.8rem] font-semibold bg-purple-50 text-purple-700 border border-purple-100 mb-4">
                Web Platform
              </span>
              <h3 className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold text-white tracking-[-0.03em] mb-4 leading-[1.2]">
                SpaceDome AI — Launching an AI-First Brand
              </h3>
              <p className="text-gray-300 leading-[1.7] mb-8">
                We partnered with SpaceDome AI to design and build their entire web presence from the ground up — crafting a brand identity and platform that communicates the power of their AI agent technology to a global audience.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  { value: '+185%', label: 'Organic Traffic' },
                  { value: '1.4s', label: 'Load Time' },
                  { value: '3x', label: 'Lead Generation' },
                ].map((metric) => (
                  <div key={metric.label} className="px-6 py-4 bg-white/[0.06] border border-white/[0.08] rounded-[20px]">
                    <div className="text-[1.4rem] font-extrabold text-purple-400">{metric.value}</div>
                    <div className="text-[0.8rem] text-gray-500 mt-0.5">{metric.label}</div>
                  </div>
                ))}
              </div>

              <Link href="https://spacedome.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-400 text-base font-semibold transition-all hover:gap-3.5">
                View Full Case Study
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Client Logo Marquee */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <p className="text-center uppercase text-[0.8rem] font-semibold tracking-[0.1em] text-gray-500 mb-8">
            Trusted by
          </p>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="overflow-hidden relative py-8">
            <div className="absolute left-0 top-0 bottom-0 w-[120px] bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-[120px] bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

            <div className="flex items-center gap-12 animate-marquee w-max">
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <span
                  key={`${logo}-${index}`}
                  className="text-[1.1rem] font-bold text-gray-300 tracking-[0.02em] whitespace-nowrap transition-colors hover:text-purple-500"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Testimonials */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SectionHeader
            badge="Client Stories"
            title={<>What They <span className="text-gradient">Say</span></>}
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1200px] mx-auto">
          {testimonials.map((testimonial, index) => (
            <RevealOnScroll key={testimonial.name} delay={index + 1}>
              <div className="bg-white/60 backdrop-blur-2xl border border-black/[0.04] rounded-[36px] p-9 relative">
                <div className="absolute top-5 right-8 text-[4rem] leading-none text-purple-200 font-extrabold">&ldquo;</div>
                <p className="text-base text-gray-800 leading-[1.7] mb-6 relative">{testimonial.text}</p>
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full overflow-hidden relative flex-shrink-0">
                    <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" sizes="44px" />
                  </div>
                  <div>
                    <div className="text-[0.95rem] font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-[0.8rem] text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <div className="bg-purple-500 rounded-[36px] py-[clamp(48px,6vw,80px)] px-[clamp(24px,4vw,64px)] text-center relative overflow-hidden max-w-[1200px] mx-auto">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white tracking-[-0.03em] mb-3 relative">
              Let&apos;s create something remarkable.
            </h2>
            <p className="text-[1.05rem] text-white/80 mb-8 relative">
              Your next project could be our next case study.
            </p>
            <Link
              href="https://calendly.com/youngbld101/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-9 py-4 bg-white text-purple-700 rounded-full text-base font-semibold transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] relative"
            >
              Start a Conversation
              <ArrowRightIcon />
            </Link>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
