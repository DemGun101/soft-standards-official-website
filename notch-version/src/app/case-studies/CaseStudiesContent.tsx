'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import RevealOnScroll from '@/components/RevealOnScroll';
import { SectionHeader } from '@/components/Section';
import { ArrowRightIcon, ArrowUpRightIcon } from '@/components/Icons';
import Modal from '@/components/Modal';
import HeroSection from '@/components/HeroSection';

interface CaseStudy {
  id: number;
  category: 'web' | 'marketing' | 'branding' | 'social';
  categoryLabel: string;
  title: string;
  image: string;
  client: string;
  year: string;
  description: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
  technologies: string[];
  link?: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    category: 'web',
    categoryLabel: 'Web Platform',
    title: 'SpaceDome AI — Web Platform & Brand',
    image: '/images/case-studies/spacedome-ai.png',
    client: 'SpaceDome AI',
    year: '2024',
    description: 'A comprehensive web platform and brand identity for an AI-powered space technology company. We crafted a digital experience that communicates cutting-edge innovation while remaining accessible to diverse audiences.',
    challenge: 'SpaceDome AI needed to establish credibility in the competitive AI landscape while making complex technology concepts approachable. They required a platform that could scale with their rapid growth and effectively convert technical audiences into customers.',
    solution: 'We designed a bold, futuristic brand identity paired with a high-performance website built on Next.js. The platform features interactive demos, seamless lead capture, and an intuitive content management system for their growing team.',
    results: [
      { value: '+185%', label: 'Organic Traffic' },
      { value: '1.4s', label: 'Load Time' },
      { value: '3x', label: 'Lead Generation' },
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Vercel'],
    link: 'https://spacedome.ai',
  },
  {
    id: 2,
    category: 'marketing',
    categoryLabel: 'Digital Marketing',
    title: 'Bicycle Health — Patient Acquisition',
    image: '/images/case-studies/bicycle-health.png',
    client: 'Bicycle Health',
    year: '2024',
    description: 'A strategic digital marketing campaign focused on patient acquisition for a leading telehealth provider specializing in addiction treatment and mental health services.',
    challenge: 'Bicycle Health faced the challenge of reaching patients in need while navigating strict healthcare advertising regulations. They needed to increase patient volume while maintaining sensitivity around addiction treatment topics.',
    solution: 'We developed a multi-channel marketing strategy combining SEO, paid search, and content marketing. Our approach focused on empathetic messaging, educational content, and optimized landing pages that converted visitors into booked appointments.',
    results: [
      { value: '+240%', label: 'Patient Signups' },
      { value: '-45%', label: 'Cost per Acquisition' },
      { value: '89%', label: 'Retention Rate' },
    ],
    technologies: ['Google Ads', 'Meta Ads', 'HubSpot', 'Segment', 'Looker'],
  },
  {
    id: 3,
    category: 'web',
    categoryLabel: 'SaaS Platform',
    title: 'GGMS — Real Estate Technology Platform',
    image: '/images/case-studies/ggms.png',
    client: 'GGMS',
    year: '2024',
    description: 'A modern, conversion-focused website and SaaS platform for a comprehensive real estate technology company combining CRM, IDX website, and marketing automation.',
    challenge: 'GGMS needed to communicate the value of their all-in-one real estate technology platform to busy real estate professionals. The existing site failed to convey the depth of their CRM, IDX, and marketing automation capabilities in a way that drove conversions.',
    solution: 'We designed and developed a modern website with intuitive navigation, strong CTAs, and a professional aesthetic that clearly communicates the platform\'s value proposition. The redesign focused on demonstrating ROI to real estate professionals through interactive demos and social proof.',
    results: [
      { value: '+210%', label: 'Demo Requests' },
      { value: '2.1s', label: 'Load Time' },
      { value: '+68%', label: 'Conversion Rate' },
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Figma', 'Vercel'],
    link: 'https://www.ggms.com/',
  },
  {
    id: 4,
    category: 'web',
    categoryLabel: 'SaaS Platform',
    title: 'M1neral — Energy Technology Platform',
    image: '/images/case-studies/m1neral.png',
    client: 'M1neral',
    year: '2024',
    description: 'A cutting-edge transaction management platform transforming the oil and gas minerals and royalties market with spatial search tools, workflow automation, and GIS mapping capabilities.',
    challenge: 'M1neral needed to modernize the traditionally complex oil and gas minerals market. Their platform required intuitive GIS integration and workflow automation that could serve the entire value chain — from mineral owners to institutional investors.',
    solution: 'We built a sophisticated SaaS platform featuring spatial search tools, interactive GIS mapping, and streamlined workflow automation. The UI/UX was designed to make complex data accessible and actionable for users across the energy sector.',
    results: [
      { value: '+150%', label: 'User Adoption' },
      { value: '40%', label: 'Faster Transactions' },
      { value: '4.7/5', label: 'User Satisfaction' },
    ],
    technologies: ['React', 'Node.js', 'GIS/Mapbox', 'PostgreSQL', 'AWS'],
    link: 'https://m1neral.com',
  },
  {
    id: 5,
    category: 'web',
    categoryLabel: 'Mobile App',
    title: 'Hitchhyke — Rideshare & Services Platform',
    image: '/images/case-studies/hitchhyke.png',
    client: 'Hitchhyke',
    year: '2024',
    description: 'An innovative Jamaican service platform combining ridesharing with a marketplace for jobs, events, and services. Native mobile apps and web presence featuring real-time tracking and flexible payments.',
    challenge: 'Hitchhyke needed to build a multi-service platform for the Caribbean market that could handle ridesharing, job listings, events, and services — all within native mobile apps for both iOS and Android with real-time capabilities.',
    solution: 'We developed native mobile applications with real-time tracking, safety features, and flexible payment options. The platform integrates ridesharing with a community marketplace, creating a unique service ecosystem tailored to the Jamaican market.',
    results: [
      { value: '10K+', label: 'App Downloads' },
      { value: '4.6★', label: 'App Store Rating' },
      { value: '+300%', label: 'Monthly Active Users' },
    ],
    technologies: ['React Native', 'Node.js', 'Firebase', 'Google Maps API', 'Stripe'],
    link: 'https://hitchhyke.app/',
  },
  {
    id: 6,
    category: 'web',
    categoryLabel: 'Corporate Website',
    title: 'Kreatorz — AI & Software Solutions',
    image: '/images/case-studies/kreatorz.png',
    client: 'Kreatorz',
    year: '2024',
    description: 'A sleek, professional website for a technology company delivering AI infrastructure and software solutions, communicating their expertise in digital transformation and custom software.',
    challenge: 'Kreatorz needed a digital presence that matched their technical sophistication. Their previous website didn\'t effectively communicate their AI capabilities or differentiate them in the crowded software solutions market.',
    solution: 'We designed a sleek, professional website with clear content strategy that positions Kreatorz as leaders in AI development and digital transformation. The site features case studies, technical deep-dives, and streamlined lead generation.',
    results: [
      { value: '+120%', label: 'Inbound Leads' },
      { value: '1.8s', label: 'Load Time' },
      { value: '+85%', label: 'Time on Site' },
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Figma', 'Vercel'],
    link: 'https://kreatorz.co/',
  },
  {
    id: 7,
    category: 'web',
    categoryLabel: 'Healthcare Platform',
    title: 'Chromos — Medical Aesthetics Platform',
    image: '/images/case-studies/chromos.png',
    client: 'Chromosengine',
    year: '2024',
    description: 'A medical aesthetics platform connecting practitioners with cutting-edge treatments and training, featuring an online ecosystem for aestheticians and medical professionals.',
    challenge: 'Chromos needed to build a trusted digital ecosystem for medical aesthetics professionals — a space for education, community, and treatment resources that met healthcare industry standards while being modern and engaging.',
    solution: 'We developed an online platform serving aestheticians and medical professionals with educational resources, community features, and treatment directories. The design balances clinical credibility with modern aesthetics to build trust.',
    results: [
      { value: '500+', label: 'Practitioners Joined' },
      { value: '+175%', label: 'Course Enrollments' },
      { value: '92%', label: 'User Retention' },
    ],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    link: 'https://www.dev.chromosengine.com/',
  },
  {
    id: 8,
    category: 'branding',
    categoryLabel: 'Branding',
    title: 'Meridian Consulting — Brand Refresh',
    image: '/images/case-studies/meridian-consulting.png',
    client: 'Meridian Consulting',
    year: '2024',
    description: 'A complete brand refresh for a boutique management consulting firm, positioning them as thought leaders in strategic transformation for mid-market companies.',
    challenge: 'Meridian Consulting had outgrown their original brand identity. They needed a sophisticated visual system that would resonate with C-suite executives while differentiating them from larger, impersonal consulting giants.',
    solution: 'We created a refined brand identity featuring a distinctive logomark, premium color palette, and comprehensive brand guidelines. The refresh included custom photography direction, presentation templates, and a brand voice guide.',
    results: [
      { value: '+65%', label: 'Brand Recognition' },
      { value: '2.5x', label: 'Proposal Win Rate' },
      { value: '+120%', label: 'Inbound Inquiries' },
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Brand Guidelines', 'Motion Design'],
  },
  {
    id: 9,
    category: 'web',
    categoryLabel: 'E-commerce',
    title: 'Trellis Studios — E-commerce Platform',
    image: '/images/case-studies/trellis-studios.png',
    client: 'Trellis Studios',
    year: '2023',
    description: 'A custom e-commerce platform for a premium home goods brand, featuring seamless checkout, inventory management, and a stunning visual shopping experience.',
    challenge: 'Trellis Studios was losing sales to friction in their checkout process and an outdated website that didn\'t reflect the quality of their handcrafted products. They needed a platform that could handle seasonal traffic spikes.',
    solution: 'We built a headless e-commerce solution using Shopify Plus and a custom Next.js frontend. The result is a lightning-fast shopping experience with beautiful product galleries, AR preview features, and streamlined checkout.',
    results: [
      { value: '+156%', label: 'Revenue Growth' },
      { value: '38%', label: 'Conversion Rate Up' },
      { value: '0.8s', label: 'Page Load' },
    ],
    technologies: ['Shopify Plus', 'Next.js', 'Tailwind CSS', 'Algolia', 'Klaviyo'],
    link: 'https://trellisstudios.com',
  },
  {
    id: 10,
    category: 'branding',
    categoryLabel: 'Product Design',
    title: 'Apex Ventures — Investor Platform',
    image: '/images/case-studies/apex-ventures.png',
    client: 'Apex Ventures',
    year: '2024',
    description: 'A sophisticated investor portal and brand identity for a venture capital firm, enabling seamless communication between partners, portfolio companies, and limited partners.',
    challenge: 'Apex Ventures needed a secure, private platform for investor relations while projecting the innovative image expected of a tech-focused VC firm. Their existing tools were fragmented and created friction in LP communications.',
    solution: 'We designed and built a custom investor portal with real-time portfolio dashboards, secure document sharing, and integrated communication tools. The brand identity positions Apex as forward-thinking yet trustworthy.',
    results: [
      { value: '4.8/5', label: 'LP Satisfaction' },
      { value: '-70%', label: 'Admin Time' },
      { value: '100%', label: 'Adoption Rate' },
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Auth0', 'AWS'],
  },
  {
    id: 11,
    category: 'marketing',
    categoryLabel: 'Campaign',
    title: 'Horizon Wellness — Growth Campaign',
    image: '/images/case-studies/horizon-wellness.png',
    client: 'Horizon Wellness',
    year: '2024',
    description: 'An integrated growth marketing campaign for a corporate wellness platform, driving enterprise sales through strategic content and account-based marketing.',
    challenge: 'Horizon Wellness was competing against established players in the corporate wellness space. They needed to build awareness among HR decision-makers and demonstrate clear ROI for their employee wellness programs.',
    solution: 'We executed a comprehensive ABM strategy targeting Fortune 500 HR leaders, combined with thought leadership content, webinar series, and strategic partnerships. Our approach focused on demonstrating measurable employee engagement outcomes.',
    results: [
      { value: '+320%', label: 'Pipeline Growth' },
      { value: '12', label: 'Enterprise Deals' },
      { value: '+85%', label: 'Demo Requests' },
    ],
    technologies: ['Salesforce', 'Demandbase', 'Marketo', 'LinkedIn Ads', '6sense'],
  },
  // Social Media & Content Clients
  {
    id: 12,
    category: 'social',
    categoryLabel: 'Social Media',
    title: 'Bicycle Health — Social Media & Ads',
    image: '/images/case-studies/bicycle-health-social.png',
    client: 'Bicycle Health',
    year: '2024',
    description: 'Comprehensive social media content and advertising campaigns for a leading telehealth provider addressing the opioid crisis through medication-assisted treatment.',
    challenge: 'Bicycle Health needed to reach patients suffering from opioid addiction through social media while navigating strict healthcare advertising policies on Meta and Google. Content had to be empathetic, informative, and compliant.',
    solution: 'We created a full social media content strategy including posts, engaging reels, and targeted ad creatives. The content balanced clinical authority with compassionate messaging to destigmatize treatment-seeking behavior.',
    results: [
      { value: '+180%', label: 'Social Engagement' },
      { value: '+95%', label: 'Ad Click-Through' },
      { value: '3.2x', label: 'ROAS' },
    ],
    technologies: ['Meta Ads', 'Instagram', 'TikTok', 'Canva', 'Adobe Premiere'],
  },
  {
    id: 13,
    category: 'social',
    categoryLabel: 'Social Media',
    title: 'SpaceDome AI — Social Content Strategy',
    image: '/images/case-studies/spacedome-social.png',
    client: 'SpaceDome AI',
    year: '2024',
    description: 'Strategic social media content for an innovative AI company pioneering "Agents as a Service," helping communicate complex AI concepts in accessible ways.',
    challenge: 'SpaceDome AI needed social content that could translate complex AI agent technology into digestible, engaging posts that would resonate with both technical decision-makers and broader business audiences.',
    solution: 'We developed a strategic social media content calendar featuring educational carousels, product announcements, thought leadership posts, and behind-the-scenes content that humanized the brand while showcasing technical depth.',
    results: [
      { value: '+250%', label: 'Follower Growth' },
      { value: '8.5%', label: 'Engagement Rate' },
      { value: '+140%', label: 'Website Referrals' },
    ],
    technologies: ['LinkedIn', 'Twitter/X', 'Figma', 'Buffer', 'Adobe Creative Suite'],
  },
  {
    id: 14,
    category: 'social',
    categoryLabel: 'Social Media',
    title: 'Trio Nutrition — Wellness Content',
    image: '/images/case-studies/trio-nutrition.png',
    client: 'Trio Nutrition',
    year: '2024',
    description: 'Engaging social media posts and video reels for a premium supplement brand, highlighting USA-manufactured, FDA-facility tested products and educating audiences on holistic wellness.',
    challenge: 'Trio Nutrition needed to stand out in the saturated supplement market with content that built trust through transparency about their USA manufacturing and FDA-facility testing while educating consumers on holistic wellness.',
    solution: 'We crafted engaging social media posts and video reels that showcased product quality, manufacturing standards, and wellness education. Content included recipe integrations, customer testimonials, and science-backed health tips.',
    results: [
      { value: '+200%', label: 'Social Reach' },
      { value: '+75%', label: 'Engagement Rate' },
      { value: '+45%', label: 'Website Traffic' },
    ],
    technologies: ['Instagram', 'TikTok', 'Adobe Premiere', 'Canva', 'Later'],
    link: 'https://trionutrition.com',
  },
  {
    id: 15,
    category: 'social',
    categoryLabel: 'Social Media',
    title: 'Rakabot — Product Content & Reels',
    image: '/images/case-studies/rakabot.png',
    client: 'Rakabot',
    year: '2024',
    description: 'Dynamic social media content including carousels, static posts, and engaging reels for an innovative home organization brand showcasing shoe racks and entryway solutions.',
    challenge: 'Rakabot needed visually compelling content that demonstrated their home organization products in real-life settings, driving both brand awareness and direct sales through social media channels.',
    solution: 'We produced dynamic social media content including styled product carousels, lifestyle static posts, and engaging video reels showing before/after transformations. Content strategy focused on aspirational home organization aesthetics.',
    results: [
      { value: '+160%', label: 'Social Sales' },
      { value: '12K+', label: 'Reel Views Avg' },
      { value: '+90%', label: 'Save Rate' },
    ],
    technologies: ['Instagram', 'TikTok', 'Adobe Premiere', 'Figma', 'Shopify'],
    link: 'https://rakabot.com',
  },
  {
    id: 16,
    category: 'social',
    categoryLabel: 'Social Media',
    title: 'IR Naturals — Clean Beauty Content',
    image: '/images/case-studies/ir-naturals.png',
    client: 'Irresistible Naturals',
    year: '2024',
    description: 'Authentic social media content for a hand-crafted skincare brand committed to clean beauty since 2009, showcasing body souffles, natural soaps, and body washes.',
    challenge: 'IR Naturals needed social content that authentically represented their hand-crafted, clean beauty products while competing with larger brands. The content had to reflect their artisanal quality and 15+ years of expertise.',
    solution: 'We created authentic social media content highlighting the craftsmanship behind each product — from ingredient sourcing to hand-pouring. Posts featured texture close-ups, ingredient education, and customer stories.',
    results: [
      { value: '+130%', label: 'Brand Awareness' },
      { value: '+65%', label: 'Engagement Rate' },
      { value: '+50%', label: 'Repeat Customers' },
    ],
    technologies: ['Instagram', 'Pinterest', 'Canva', 'Adobe Lightroom', 'Later'],
    link: 'https://irnaturals.com',
  },
];

const testimonials = [
  { text: 'Soft Standards brought clarity to our brand at a critical moment. They understood our AI product deeply and translated that complexity into a website that actually resonates with our audience. The team is responsive, thoughtful, and genuinely invested in getting it right.', name: 'James Thornton', role: 'Founder, SpaceDome AI', avatar: '/images/case-studies/james-thornton.png' },
  { text: 'Working with Soft Standards felt like working with people who truly cared about our mission. They helped us rethink our digital presence and the results spoke for themselves — more patients finding the help they need, faster.', name: 'Rachel Kim', role: 'VP Digital, Bicycle Health', avatar: '/images/case-studies/rachel-kim.png' },
  { text: 'They didn\'t just deliver a beautiful website — they listened to our story and made sure every pixel reflected who we are. The whole process was smooth, collaborative, and honestly enjoyable.', name: 'Daniel Porter', role: 'Managing Director, Meridian Consulting', avatar: '/images/case-studies/daniel-porter.png' },
  { text: 'Our e-commerce revenue jumped noticeably after the redesign. Soft Standards approached everything with care and strategy, not just aesthetics. They\'re partners, not vendors.', name: 'Sarah Lin', role: 'Founder, Trellis Studios', avatar: '/images/case-studies/sarah-lin.png' },
];

const clientLogos = ['SpaceDome AI', 'Bicycle Health', 'GGMS', 'M1neral', 'Hitchhyke', 'Kreatorz', 'Chromos', 'Meridian', 'Trellis', 'Apex', 'Horizon', 'Trio Nutrition', 'Rakabot', 'IR Naturals', 'Crestview', 'Ember'];

const filters = [
  { value: 'all', label: 'All' },
  { value: 'branding', label: 'Branding' },
  { value: 'web', label: 'Web' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'social', label: 'Social Media' },
];

export default function CaseStudiesContent() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const filteredStudies = activeFilter === 'all'
    ? caseStudies
    : caseStudies.filter(study => study.category === activeFilter);

  return (
    <>
      <HeroSection
        title={<>Selected <span className="text-gradient">Work</span></>}
        subtitle="Real projects, real results. Every case study is a story of partnership, precision, and measurable impact."
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

      {/* Case Study Grid */}
      <section className="pb-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1200px] mx-auto">
          {filteredStudies.map((study, index) => (
            <RevealOnScroll key={study.id} delay={(index % 6) + 1}>
              <div
                onClick={() => setSelectedStudy(study)}
                className="rounded-[36px] overflow-hidden relative cursor-pointer aspect-[4/3] bg-gray-100 transition-transform duration-400 hover:scale-[1.02] group"
              >
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

      {/* Case Study Modal */}
      <Modal isOpen={!!selectedStudy} onClose={() => setSelectedStudy(null)}>
        {selectedStudy && (
          <div>
            {/* Modal Header */}
            <div className="p-5 sm:p-6 pb-0 sm:pb-0">
              {/* Category & Meta */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                <span className="inline-flex px-3 py-1 bg-purple-100 rounded-full text-[0.75rem] font-semibold text-purple-700">
                  {selectedStudy.categoryLabel}
                </span>
                <span className="text-[0.8rem] text-gray-400">{selectedStudy.client} • {selectedStudy.year}</span>
              </div>

              {/* Title */}
              <h2 className="text-[1.25rem] sm:text-[1.5rem] font-extrabold text-gray-900 tracking-[-0.02em] leading-tight mb-4">
                {selectedStudy.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 leading-[1.7] text-[0.9rem] sm:text-[0.95rem] mb-5">
                {selectedStudy.description}
              </p>
            </div>

            {/* Results Row */}
            <div className="px-5 sm:px-6 mb-5">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {selectedStudy.results.map((result) => (
                  <div key={result.label} className="flex-1 min-w-[90px] px-4 py-3 bg-gray-50 border border-gray-100 rounded-[16px] text-center">
                    <div className="text-[1.1rem] sm:text-[1.25rem] font-extrabold text-purple-600">{result.value}</div>
                    <div className="text-[0.7rem] sm:text-[0.75rem] text-gray-500">{result.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenge & Solution */}
            <div className="px-5 sm:px-6 mb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-purple-50 rounded-[16px]">
                  <h3 className="text-[0.7rem] sm:text-[0.75rem] font-bold text-purple-700 uppercase tracking-wider mb-2">Challenge</h3>
                  <p className="text-gray-700 leading-[1.6] text-[0.8rem] sm:text-[0.85rem]">{selectedStudy.challenge}</p>
                </div>
                <div className="p-4 bg-cyan-50 rounded-[16px]">
                  <h3 className="text-[0.7rem] sm:text-[0.75rem] font-bold text-cyan-700 uppercase tracking-wider mb-2">Solution</h3>
                  <p className="text-gray-700 leading-[1.6] text-[0.8rem] sm:text-[0.85rem]">{selectedStudy.solution}</p>
                </div>
              </div>
            </div>

            {/* Technologies & CTA */}
            <div className="p-5 sm:p-6 pt-0 sm:pt-0">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {selectedStudy.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-[0.75rem] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA */}
              {selectedStudy.link && (
                <Link
                  href={selectedStudy.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-full text-[0.85rem] font-semibold transition-all hover:bg-purple-700"
                >
                  Visit Live Site
                  <ArrowUpRightIcon />
                </Link>
              )}
            </div>
          </div>
        )}
      </Modal>

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
