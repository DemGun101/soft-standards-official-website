'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RevealOnScroll from '@/components/RevealOnScroll';
import { SectionHeader } from '@/components/Section';
import { ArrowRightIcon } from '@/components/Icons';
import HeroSection from '@/components/HeroSection';
import CaseStudyCard from '@/components/case-studies/CaseStudyCard';
import { serviceSections, SERVICE_FILTERS, STATS } from '@/data/caseStudies';

const testimonials = [
  { text: 'Soft Standards brought clarity to our brand at a critical moment. They understood our AI product deeply and translated that complexity into a website that actually resonates with our audience. The team is responsive, thoughtful, and genuinely invested in getting it right.', name: 'James Thornton', role: 'Founder, SpaceDome AI', avatar: '/images/case-studies/james-thornton.png' },
  { text: 'Working with Soft Standards felt like working with people who truly cared about our mission. They helped us rethink our digital presence and the results spoke for themselves — more patients finding the help they need, faster.', name: 'Rachel Kim', role: 'VP Digital, Bicycle Health', avatar: '/images/case-studies/rachel-kim.png' },
  { text: "They didn't just deliver a beautiful website — they listened to our story and made sure every pixel reflected who we are. The whole process was smooth, collaborative, and honestly enjoyable.", name: 'Daniel Porter', role: 'Managing Director, Meridian Consulting', avatar: '/images/case-studies/daniel-porter.png' },
  { text: "Our e-commerce revenue jumped noticeably after the redesign. Soft Standards approached everything with care and strategy, not just aesthetics. They're partners, not vendors.", name: 'Sarah Lin', role: 'Founder, Trellis Studios', avatar: '/images/case-studies/sarah-lin.png' },
];

const clientLogos = ['Ryvato', 'Chromos', 'Hitchhyke', 'm1neral', 'GGMS', 'Kreatorz', 'SpaceDome AI', 'Bicycle Health', 'Meridian', 'Trellis', 'Apex', 'Horizon'];

export default function CaseStudiesContent() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredSections = activeFilter === 'all'
    ? serviceSections
    : serviceSections.filter((s) => s.id === activeFilter);

  return (
    <>
      {/* Hero */}
      <HeroSection
        title={<>Our Work — Real Projects, <span className="text-gradient">Real Results</span></>}
        subtitle="Full-stack websites, AI automations, brands, and marketing systems built for clients across multiple industries."
        background="light"
        showScrollIndicator={false}
      />

      {/* Stats Bar */}
      <section className="px-[clamp(20px,5vw,80px)] -mt-2 mb-10">
        <RevealOnScroll>
          <div className="max-w-[800px] mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-0 sm:divide-x sm:divide-gray-200">
            {[
              { value: STATS.totalProjects, label: 'Projects Delivered' },
              { value: STATS.industriesServed, label: 'Industries Served' },
              { value: STATS.countries, label: 'Countries' },
              { value: STATS.satisfactionRate, label: 'Satisfaction Rate' },
            ].map((stat) => (
              <div key={stat.label} className="flex-1 min-w-[120px] text-center px-4 sm:px-6">
                <div className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold text-gray-900">{stat.value}</div>
                <div className="text-[0.8rem] text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* Filter Tabs */}
      <section className="px-[clamp(20px,5vw,80px)] mb-8 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {SERVICE_FILTERS.map((filter) => (
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

      {/* Service Sections */}
      <section className="pb-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        {filteredSections.map((section) => (
          <div key={section.id} className="mb-16 last:mb-0">
            {/* Section Header */}
            {(activeFilter === 'all' || filteredSections.length > 1) && (
              <RevealOnScroll>
                <div className="max-w-[1200px] mx-auto mb-8">
                  <h2 className="text-[clamp(1.4rem,3vw,1.8rem)] font-extrabold text-gray-900 tracking-[-0.02em] mb-2">
                    {section.title}
                  </h2>
                  <p className="text-[0.95rem] text-gray-500 leading-[1.7] max-w-[700px]">
                    {section.description}
                  </p>
                </div>
              </RevealOnScroll>
            )}

            {/* Projects Grid */}
            {section.projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1200px] mx-auto">
                {section.projects.map((study, index) => (
                  <RevealOnScroll key={study.id} delay={(index % 6) + 1}>
                    <CaseStudyCard study={study} />
                  </RevealOnScroll>
                ))}
              </div>
            ) : (
              <RevealOnScroll>
                <div className="max-w-[1200px] mx-auto">
                  <div className="rounded-[28px] border-2 border-dashed border-gray-200 bg-gray-50/50 p-10 sm:p-14 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-100 rounded-full text-[0.85rem] font-semibold text-purple-700 mb-4">
                      Coming Soon
                    </div>
                    <h3 className="text-[1.2rem] font-bold text-gray-900 mb-2">{section.title} Projects</h3>
                    <p className="text-[0.9rem] text-gray-500 max-w-[500px] mx-auto leading-[1.7]">
                      We&apos;re preparing detailed case studies for our {section.title.toLowerCase()} work. Check back soon or{' '}
                      <Link href="/book" className="text-purple-600 font-semibold hover:underline">get in touch</Link>{' '}
                      to discuss your project.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            )}
          </div>
        ))}
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
            title={<>What Our Clients <span className="text-gradient">Say</span></>}
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
              Ready to Become the Next Case Study?
            </h2>
            <p className="text-[1.05rem] text-white/80 mb-8 relative">
              Your next project could be our next success story.
            </p>
            <Link
              href="/book"
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
