import Link from 'next/link';
import { Metadata } from 'next';
import Card, { CardIcon, CardTitle, CardDescription } from '@/components/Card';
import RevealOnScroll from '@/components/RevealOnScroll';
import { SectionHeader } from '@/components/Section';
import {
  LayersIcon, MonitorIcon, GlobeIcon, LogInIcon, SmartphoneIcon, ActivityIcon,
  ArrowRightIcon,
} from '@/components/Icons';
import HeroSection from '@/components/HeroSection';
import ServiceSchema from '@/components/schemas/ServiceSchema';
import {
  SiReact, SiTypescript, SiNextdotjs, SiFramer, SiGreensock,
  SiThreedotjs, SiMongodb, SiPostgresql, SiFigma, SiWebflow,
  SiTailwindcss, SiSvelte, SiCplusplus, SiShadcnui,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Full-stack AI marketing: brand strategy, web dev, UI/UX, ads, apps & automation.',
  keywords: ['marketing services', 'web development services', 'UI/UX design services', 'SEO services', 'AI automation services', 'brand strategy agency', 'digital marketing services'],
  openGraph: {
    title: 'Our Services | Soft Standards Inc.',
    description: 'Full-stack AI marketing: brand strategy, web dev, UI/UX, ads, apps & automation.',
    type: 'website',
    url: 'https://www.softstandardsinc.com/services',
  },
  alternates: { canonical: '/services' },
};

const DexieIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18L18.36 7.5 12 10.82 5.64 7.5 12 4.18zM5 9.06l6 3.33v6.55L5 15.61V9.06zm14 0v6.55l-6 3.33v-6.55l6-3.33z" />
  </svg>
);

const ChromaIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5L5.5 12 11 7.5v9zm2 0v-9L18.5 12 13 16.5z" />
  </svg>
);

const RemotionIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm6 4v8l6-4-6-4z" />
  </svg>
);

const HiggsfieldIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6 4v16h3V13.5h6V20h3V4h-3v6.5H9V4H6z" />
  </svg>
);

const techStack: { name: string; icon: IconType; color: string }[] = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'Framer', icon: SiFramer, color: '#0055FF' },
  { name: 'GSAP', icon: SiGreensock, color: '#88CE02' },
  { name: 'Three.js', icon: SiThreedotjs, color: '#000000' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Dexie', icon: DexieIcon, color: '#FF8C42' },
  { name: 'Chroma', icon: ChromaIcon, color: '#FF6F61' },
  { name: 'Remotion', icon: RemotionIcon, color: '#0B84F3' },
  { name: 'Higgsfield', icon: HiggsfieldIcon, color: '#A855F7' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'Webflow', icon: SiWebflow, color: '#4353FF' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'shadcn/ui', icon: SiShadcnui, color: '#000000' },
  { name: 'Svelte', icon: SiSvelte, color: '#FF3E00' },
  { name: 'C++', icon: SiCplusplus, color: '#00599C' },
];

export default function ServicesPage() {
  return (
    <>
      <ServiceSchema />
      <HeroSection
        title={<>Six things we do. One goal: <span className="text-gradient">make you money.</span></>}
        subtitle="Every service below is built to drive revenue — not just look pretty in a pitch deck."
        breadcrumbs={[{ href: '/', label: 'Home' }]}
        breadcrumbCurrent="Services"
        background="dark"
      />

      {/* Services Bento Grid */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SectionHeader
            badge="What We Do"
            title={<>Six Integrated Services. <span className="text-gradient">One Marketing System.</span></>}
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          <RevealOnScroll delay={1} className="lg:col-span-2">
            <Card withPurpleBar className="p-10 h-full">
              <CardIcon><LayersIcon /></CardIcon>
              <CardTitle>Brand Strategy &amp; Positioning Services</CardTitle>
              <CardDescription>
                We define who you are, what you stand for, and why anyone should care — then bake it into every touchpoint.
              </CardDescription>
              <ul className="mt-4 space-y-1.5 text-[0.85rem] text-gray-600">
                <li><strong>Market Research &amp; Competitive Analysis</strong></li>
                <li><strong>Brand Messaging &amp; Identity Development</strong></li>
                <li><strong>Go-To-Market Strategy</strong></li>
              </ul>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={2}>
            <Card withPurpleBar className="h-full">
              <CardIcon><MonitorIcon /></CardIcon>
              <CardTitle>Web Development Services</CardTitle>
              <CardDescription>
                Fast sites that convert. React, Next.js, TypeScript. No WordPress templates. No bloat.
              </CardDescription>
              <ul className="mt-3 space-y-1.5 text-[0.85rem] text-gray-600">
                <li><strong>Custom Website Design &amp; Development</strong></li>
                <li><strong>E-Commerce &amp; SaaS Platforms</strong></li>
                <li><strong>Speed Optimization &amp; Core Web Vitals</strong></li>
              </ul>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={3}>
            <Card withPurpleBar className="h-full">
              <CardIcon><LogInIcon /></CardIcon>
              <CardTitle>UI/UX Design Services</CardTitle>
              <CardDescription>
                Research-backed design that reduces friction and increases conversions. We test until it works — not until it looks cool.
              </CardDescription>
              <ul className="mt-3 space-y-1.5 text-[0.85rem] text-gray-600">
                <li><strong>User Research &amp; Wireframing</strong></li>
                <li><strong>Interface Design &amp; Prototyping</strong></li>
                <li><strong>Usability Testing &amp; Iteration</strong></li>
              </ul>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={4}>
            <Card withPurpleBar className="h-full">
              <CardIcon><GlobeIcon /></CardIcon>
              <CardTitle>Digital Marketing Services</CardTitle>
              <CardDescription>
                Google Ads, Meta Ads, email sequences, and analytics — managed and optimized weekly. You see what&apos;s working. We kill what&apos;s not.
              </CardDescription>
              <ul className="mt-3 space-y-1.5 text-[0.85rem] text-gray-600">
                <li><strong>Search Engine Optimization (SEO)</strong></li>
                <li><strong>PPC &amp; Paid Advertising Management</strong></li>
                <li><strong>Email Marketing &amp; Automation</strong></li>
                <li><strong>Social Media Marketing</strong></li>
              </ul>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={5} className="lg:col-span-2">
            <Card withPurpleBar className="p-10 h-full">
              <CardIcon><SmartphoneIcon /></CardIcon>
              <CardTitle>Mobile App Development Services</CardTitle>
              <CardDescription>
                iOS, Android, React Native, Flutter. From MVP to App Store. We handle the build, the deployment, and the optimization.
              </CardDescription>
              <ul className="mt-4 space-y-1.5 text-[0.85rem] text-gray-600">
                <li><strong>iOS &amp; Android App Development</strong></li>
                <li><strong>Cross-Platform Apps With React Native</strong></li>
              </ul>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={6}>
            <Card withPurpleBar className="h-full">
              <CardIcon><ActivityIcon /></CardIcon>
              <CardTitle>AI Automation Services</CardTitle>
              <CardDescription>
                Custom AI agents, chatbots, and workflow automation that replace 40+ hours of manual work per week.
              </CardDescription>
              <ul className="mt-3 space-y-1.5 text-[0.85rem] text-gray-600">
                <li><strong>Custom AI Chatbots &amp; Virtual Assistants</strong></li>
                <li><strong>Workflow Automation &amp; Integration</strong></li>
                <li><strong>AI-Powered Analytics &amp; Reporting</strong></li>
              </ul>
            </Card>
          </RevealOnScroll>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SectionHeader
            badge="Tools & Tech"
            title={<>Our <span className="text-gradient">Stack</span></>}
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="bg-white/50 backdrop-blur-2xl border border-black/[0.04] rounded-[36px] max-w-[1200px] mx-auto overflow-hidden">
            <div className="overflow-hidden relative py-10">
              <div className="absolute left-0 top-0 bottom-0 w-[120px] bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-[120px] bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

              <div className="flex items-center gap-10 animate-marquee w-max">
                {[...techStack, ...techStack].map((tech, index) => (
                  <div
                    key={`${tech.name}-${index}`}
                    className="group flex flex-col items-center gap-2.5 px-4"
                  >
                    <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:border-transparent">
                      <tech.icon className="w-9 h-9 transition-transform duration-300 group-hover:scale-110" style={{ color: tech.color }} />
                    </div>
                    <span className="text-[0.7rem] font-medium text-gray-500 whitespace-nowrap transition-colors duration-300 group-hover:text-gray-700">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* CTA Banner */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <div className="bg-purple-500 rounded-[36px] py-[clamp(48px,6vw,80px)] px-[clamp(24px,4vw,64px)] text-center relative overflow-hidden max-w-[1200px] mx-auto">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white tracking-[-0.03em] mb-3 relative">
              Ready to build?
            </h2>
            <p className="text-[1.05rem] text-white/80 mb-8 relative">
              Tell us what you need. We&apos;ll tell you exactly how we&apos;d do it.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2.5 px-9 py-4 bg-white text-purple-700 rounded-full text-base font-semibold transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] relative"
            >
              Get in Touch
              <ArrowRightIcon />
            </Link>
          </div>
        </RevealOnScroll>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Marketing Services",
            "description": "Six integrated marketing services built as one system",
            "url": "https://www.softstandardsinc.com/services",
            "numberOfItems": 6,
            "itemListElement": [
              { "@type": "Service", "position": 1, "name": "Brand Strategy", "description": "Strategic brand foundation — positioning, messaging, and identity that builds trust before you say a word.", "provider": { "@type": "Organization", "name": "Soft Standards" }, "url": "https://www.softstandardsinc.com/services#brand-strategy" },
              { "@type": "Service", "position": 2, "name": "Web Development", "description": "Fast, conversion-optimized websites built with Next.js, React, and TypeScript.", "provider": { "@type": "Organization", "name": "Soft Standards" }, "url": "https://www.softstandardsinc.com/services#web-development" },
              { "@type": "Service", "position": 3, "name": "UI/UX Design", "description": "Research-backed, tested, and refined user interfaces.", "provider": { "@type": "Organization", "name": "Soft Standards" }, "url": "https://www.softstandardsinc.com/services#ui-ux-design" },
              { "@type": "Service", "position": 4, "name": "Digital Marketing", "description": "SEO, PPC, email, and social media running as one integrated system.", "provider": { "@type": "Organization", "name": "Soft Standards" }, "url": "https://www.softstandardsinc.com/services#digital-marketing" },
              { "@type": "Service", "position": 5, "name": "Mobile App Development", "description": "iOS, Android, and cross-platform apps using React Native.", "provider": { "@type": "Organization", "name": "Soft Standards" }, "url": "https://www.softstandardsinc.com/services#mobile-apps" },
              { "@type": "Service", "position": 6, "name": "AI Automation", "description": "Custom AI agents, chatbots, and workflow automation that replace 40+ hours of manual work per week.", "provider": { "@type": "Organization", "name": "Soft Standards" }, "url": "https://www.softstandardsinc.com/services#ai-automation" }
            ]
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What services does Soft Standards offer?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We offer six core services: Brand Strategy, Web Development, UI/UX Design, Digital Marketing, Mobile App Development, and AI Automation & Agents. Each service is tailored to your business needs.",
                },
              },
              {
                "@type": "Question",
                name: "What tech stack do you use for web development?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We use modern frameworks including React, Next.js, TypeScript, Tailwind CSS, Three.js, and GSAP for animations. Our sites are fast, accessible, and conversion-optimized.",
                },
              },
              {
                "@type": "Question",
                name: "Do you build mobile apps for both iOS and Android?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we build both native and cross-platform mobile apps using React Native and Flutter. We handle everything from concept to App Store and Play Store submission.",
                },
              },
              {
                "@type": "Question",
                name: "What kind of AI automation do you provide?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We build custom AI chatbots, voice agents, workflow automation, and intelligent agents that integrate with your existing tools. From basic automation to advanced ML-powered solutions.",
                },
              },
              {
                "@type": "Question",
                name: "How long does a typical project take?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Timelines vary by scope. A website typically takes 2-4 weeks, an app 4-8 weeks, and brand strategy 2-3 weeks. We also offer rush delivery at 50% faster for an additional 25% of project cost.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
