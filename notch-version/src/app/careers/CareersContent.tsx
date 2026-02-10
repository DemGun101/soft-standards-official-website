'use client';

import Link from 'next/link';
import { useState } from 'react';
import RevealOnScroll from '@/components/RevealOnScroll';
import { SectionHeader } from '@/components/Section';
import {
  GlobeIcon, SunIcon, UsersIcon, ActivityIcon,
  DollarIcon, HeartPulseIcon, ClockIcon, BookOpenIcon, MapPinIcon, BriefcaseIcon,
  ArrowRightIcon, PlusIcon
} from '@/components/Icons';
import HeroSection from '@/components/HeroSection';

const cultureItems = [
  { icon: <GlobeIcon />, title: 'Remote-First', desc: "Work from wherever you do your best thinking. We care about output, not hours logged.", span: true },
  { icon: <SunIcon />, title: 'Growth is the default.', desc: '$2,500/year for learning. Conference tickets. Mentorship. We invest in people, not just projects.' },
  { icon: <UsersIcon />, title: 'No egos.', desc: "We share credit, collaborate openly, and win as a team. Everyone has a voice." },
  { icon: <ActivityIcon />, title: 'Work that moves the needle.', desc: "Every project has a clear goal and measurable results. No busywork." },
];

const benefits = [
  { icon: <DollarIcon />, title: 'Competitive Salary', desc: 'Competitive pay with annual reviews and performance bonuses.' },
  { icon: <HeartPulseIcon />, title: 'Health Insurance', desc: 'Health, dental & vision for you and your family.' },
  { icon: <ClockIcon />, title: 'Flexible Hours', desc: 'Set your own schedule. We care about output, not when you clock in.' },
  { icon: <BookOpenIcon />, title: 'Learning Budget', desc: '$2,500 annually for courses, books, conferences, and skill development.' },
  { icon: <MapPinIcon />, title: 'Team Retreats', desc: 'Annual team retreats — fully paid, fully optional.' },
  { icon: <BriefcaseIcon />, title: 'Latest Equipment', desc: 'MacBook Pro, monitors, and whatever tools you need.' },
];

const jobs = [
  { id: 1, title: 'Senior Product Designer — Remote', dept: 'Design', category: 'design', desc: "We're looking for a seasoned product designer to lead design initiatives for our highest-impact client projects. You'll work directly with stakeholders to define strategy, create user flows, and deliver pixel-perfect interfaces.", requirements: ['5+ years of product design experience', 'Mastery of Figma and modern design tools', 'Strong portfolio showcasing end-to-end product work', 'Experience leading design systems', 'Excellent communication and presentation skills'] },
  { id: 2, title: 'Full-Stack Engineer (React + Node) — Remote', dept: 'Engineering', category: 'engineering', desc: "Join our engineering team to build high-performance web applications for clients across industries. You'll own features end-to-end, from API design to frontend polish.", requirements: ['4+ years of full-stack development experience', 'Expert-level React, TypeScript, and Node.js', 'Experience with modern build tools and deployment pipelines', 'Strong understanding of accessibility and performance', 'Passion for clean code and best practices'] },
  { id: 3, title: 'Digital Marketing Strategist — Remote', dept: 'Marketing', category: 'marketing', desc: "Drive measurable results for our clients. You'll design and execute data-driven campaigns across channels — SEO, paid ads, email, social, and more.", requirements: ['4+ years in digital marketing (agency experience preferred)', 'Deep knowledge of SEO, PPC, and analytics', 'Experience with Google Ads, Meta Ads, and analytics platforms', 'Proven track record of campaign ROI', 'Strong analytical and reporting skills'] },
  { id: 4, title: 'Junior UI Designer — Remote', dept: 'Design', category: 'design', desc: "Craft visual identities that tell stories. We need a designer who can balance strategic thinking with exceptional craft — from UI components to full brand systems.", requirements: ['1+ years of UI/UX design experience', 'Proficiency in Figma', 'Portfolio showing diverse design work', 'Strong typography and layout skills', 'Understanding of design systems and component libraries'] },
  { id: 5, title: 'Content Writer — Remote', dept: 'Marketing', category: 'marketing', desc: "Create compelling content that drives organic growth. You'll write blog posts, case studies, landing page copy, and social content for our clients and our own brand.", requirements: ['2+ years of content writing experience', 'Strong understanding of SEO writing', 'Portfolio of published articles or blog posts', 'Excellent grammar and storytelling skills', 'Familiarity with content management systems'] },
  { id: 6, title: 'Operations & Client Success — Remote', dept: 'Operations', category: 'operations', desc: "Keep our projects on track and our clients happy. You'll coordinate timelines, manage stakeholder communication, and ensure smooth delivery across teams.", requirements: ['3+ years of project management in a digital agency', 'Experience managing agile and waterfall projects', 'Excellent organizational and communication skills', 'Proficiency with tools like Notion, Linear, or Asana', 'Ability to juggle multiple projects simultaneously'] },
];

const testimonials = [
  { text: "I joined Soft Standards because of the people, and I stay because of the growth. Every project pushes me to learn something new, and the team always has your back.", name: 'Akash Ahmed', role: 'Senior Developer · 2 years' },
  { text: "The flexibility here is real — not just a talking point. I manage my own schedule, work on meaningful projects, and genuinely enjoy what I do every day.", name: 'Alishba Ahmed', role: 'Senior Graphic Designer · 1.5 years' },
  { text: "What I love most is the trust. There's no micromanagement, just clear goals and the freedom to figure out the best way to hit them.", name: 'Hashir Saleem', role: 'Associate Graphic Designer · 1 year' },
  { text: "Soft Standards feels like a startup with a purpose. We move fast, we care about quality, and we actually celebrate each other's wins.", name: 'Zain-ul-Abedeen', role: 'Business Development · 2 years' },
];

const filters = [
  { value: 'all', label: 'All' },
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'operations', label: 'Operations' },
];

export default function CareersContent() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [openJobId, setOpenJobId] = useState<number | null>(null);

  const filteredJobs = activeFilter === 'all'
    ? jobs
    : jobs.filter(job => job.category === activeFilter);

  return (
    <>
      <HeroSection
        title={<>Come build things that <span className="text-gradient">matter.</span></>}
        subtitle="Small remote team. Real products. Real businesses. No meetings about meetings."
        background="gradient"
        cta={{ href: '#open-roles', label: 'View Open Roles' }}
      />

      {/* Culture Bento */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SectionHeader
            badge="Our Culture"
            title={<>Why <span className="text-gradient">Soft Standards</span></>}
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1200px] mx-auto">
          {cultureItems.map((item, index) => (
            <RevealOnScroll key={item.title} delay={index + 1} className={item.span ? 'md:col-span-2' : ''}>
              <div className="bg-white rounded-[36px] p-10 border border-black/5 transition-all duration-350 hover:-translate-y-1 hover:shadow-[0_4px_24px_rgba(15,23,42,0.06)] hover:bg-purple-50 group h-full">
                <div className="w-[52px] h-[52px] flex items-center justify-center bg-purple-50 rounded-[20px] mb-5 group-hover:bg-purple-100 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-[1.2rem] font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-[0.9rem] text-gray-500 leading-[1.7]">{item.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SectionHeader
            title={<>What You <span className="text-gradient">Get</span></>}
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {benefits.map((benefit, index) => (
            <RevealOnScroll key={benefit.title} delay={index + 1}>
              <div className="bg-white rounded-[28px] p-8 border border-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_24px_rgba(15,23,42,0.06)]">
                <div className="w-11 h-11 flex items-center justify-center bg-purple-50 rounded-[12px] mb-4 text-purple-600">
                  {benefit.icon}
                </div>
                <h4 className="text-[1.05rem] font-bold text-gray-900 mb-1.5">{benefit.title}</h4>
                <p className="text-[0.85rem] text-gray-500 leading-[1.6]">{benefit.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-roles" className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SectionHeader
            badge="We're Hiring"
            title={<>Open <span className="text-gradient">Positions</span></>}
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
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
        </RevealOnScroll>

        <div className="flex flex-col gap-3 max-w-[1200px] mx-auto">
          {filteredJobs.map((job, index) => (
            <RevealOnScroll key={job.id} delay={index + 1}>
              <div className={`bg-white rounded-[20px] border border-black/5 overflow-hidden transition-all duration-300 hover:border-l-[3px] hover:border-l-purple-500 ${openJobId === job.id ? 'border-l-[3px] border-l-purple-500' : ''}`}>
                <div
                  className="flex items-center justify-between p-6 cursor-pointer gap-4"
                  onClick={() => setOpenJobId(openJobId === job.id ? null : job.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1">
                    <h3 className="text-[1.05rem] font-bold text-gray-900">{job.title}</h3>
                    <span className="inline-flex px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-[0.75rem] font-semibold w-fit">
                      {job.dept}
                    </span>
                    <span className="text-[0.85rem] text-gray-500 hidden sm:inline">Remote</span>
                  </div>
                  <div className={`w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 transition-all flex-shrink-0 ${openJobId === job.id ? 'bg-purple-50 rotate-45' : ''}`}>
                    <PlusIcon />
                  </div>
                </div>

                <div className={`overflow-hidden transition-all duration-400 ${openJobId === job.id ? 'max-h-[500px]' : 'max-h-0'}`}>
                  <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                    <div className="pt-6">
                      <p className="text-[0.9rem] text-gray-600 leading-[1.7] mb-4">{job.desc}</p>
                      <ul className="mb-6">
                        {job.requirements.map((req) => (
                          <li key={req} className="py-1.5 text-[0.9rem] text-gray-600 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[14px] before:w-1.5 before:h-1.5 before:bg-purple-500 before:rounded-full">
                            {req}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`mailto:contact@softstandardsinc.com?subject=Application: ${job.title}`}
                        className="inline-flex items-center gap-2.5 px-9 py-4 bg-purple-500 text-white rounded-full text-base font-semibold transition-all shadow-[0_4px_20px_rgba(124,58,237,0.3)] hover:bg-purple-600 hover:-translate-y-0.5"
                      >
                        Apply for this Role
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Employee Testimonials */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)] bg-[#F8FAFC]">
        <RevealOnScroll>
          <SectionHeader
            badge="How We Hire"
            title={<>Our Hiring <span className="text-gradient">Process</span></>}
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="overflow-hidden py-5">
            <div className="flex gap-6 animate-marquee w-max">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={`${testimonial.name}-${index}`}
                  className="flex-shrink-0 w-[360px] bg-white/50 backdrop-blur-xl border border-black/[0.04] rounded-[36px] p-8"
                >
                  <p className="text-[0.95rem] text-gray-700 leading-[1.7] mb-5 italic">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-200 to-purple-400" />
                    <div>
                      <div className="text-[0.9rem] font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-[0.8rem] text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Application CTA */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <div className="bg-gray-900 rounded-[36px] py-[clamp(48px,6vw,80px)] px-[clamp(24px,4vw,64px)] text-center max-w-[1200px] mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 to-purple-400" />
            <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-extrabold text-white mb-3">
              Don&apos;t See Your Role? Reach Out Anyway.
            </h2>
            <p className="text-base text-gray-300 mb-8 max-w-[500px] mx-auto">
              Send us your CV and tell us what you&apos;d bring.
            </p>
            <Link
              href="mailto:contact@softstandardsinc.com?subject=Open Application"
              className="inline-flex items-center gap-2.5 px-9 py-4 bg-gray-900 text-white border border-white/20 rounded-full text-base font-semibold transition-all hover:bg-purple-600 hover:-translate-y-0.5"
            >
              Send Your CV
              <ArrowRightIcon />
            </Link>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
