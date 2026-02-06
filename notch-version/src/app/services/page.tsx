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

export const metadata: Metadata = {
  title: 'Services — Soft Standards Inc.',
  description: 'From strategy to execution, we deliver end-to-end digital solutions that transform businesses and create lasting impact.',
};

const techStack = [
  'Figma', 'React', 'Next.js', 'Node.js', 'TypeScript', 'AWS',
  'Shopify', 'WordPress', 'Tailwind CSS', 'Framer', 'Webflow', 'Python',
  'OpenAI', 'LangChain'
];

export default function ServicesPage() {
  return (
    <>
      <HeroSection
        title={<>Services built for <span className="text-gradient">growth</span>.</>}
        subtitle="From strategy to execution, we deliver end-to-end digital solutions that transform businesses and create lasting impact."
        breadcrumbs={[{ href: '/', label: 'Home' }]}
        breadcrumbCurrent="Services"
        background="dark"
      />

      {/* Services Bento Grid */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SectionHeader
            badge="What We Do"
            title={<>Our <span className="text-gradient">Expertise</span></>}
            subtitle="Six core disciplines, one seamless experience. Every service designed to drive measurable results."
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          <RevealOnScroll delay={1} className="lg:col-span-2">
            <Card withPurpleBar className="p-10 h-full">
              <CardIcon><LayersIcon /></CardIcon>
              <CardTitle>Brand Strategy</CardTitle>
              <CardDescription>
                We define and shape brand identities that cut through the noise. From positioning and messaging to visual systems that scale, we build brands that people remember and trust.
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-4">
                {['Brand Audit', 'Visual Identity', 'Brand Guidelines', 'Naming', 'Tone of Voice'].map((item) => (
                  <span key={item} className="px-3.5 py-1.5 bg-purple-50 text-purple-700 rounded-full text-[0.8rem] font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={2}>
            <Card withPurpleBar className="h-full">
              <CardIcon><MonitorIcon /></CardIcon>
              <CardTitle>Web Development</CardTitle>
              <CardDescription>
                High-performance websites built with modern tech stacks. Fast, accessible, and conversion-optimized.
              </CardDescription>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={3}>
            <Card withPurpleBar className="h-full">
              <CardIcon><LogInIcon /></CardIcon>
              <CardTitle>UI/UX Design</CardTitle>
              <CardDescription>
                User-centered design that delights. We craft intuitive interfaces backed by research and testing.
              </CardDescription>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={4}>
            <Card withPurpleBar className="h-full">
              <CardIcon><GlobeIcon /></CardIcon>
              <CardTitle>Digital Marketing</CardTitle>
              <CardDescription>
                Data-driven campaigns that amplify reach and convert visitors into customers.
              </CardDescription>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={5} className="lg:col-span-2">
            <Card withPurpleBar className="p-10 h-full">
              <CardIcon><SmartphoneIcon /></CardIcon>
              <CardTitle>Mobile Apps</CardTitle>
              <CardDescription>
                Native and cross-platform mobile applications that deliver seamless experiences. We handle everything from concept to App Store — with performance, design, and scalability built in from day one.
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-4">
                {['iOS', 'Android', 'React Native', 'Flutter', 'App Store Optimization'].map((item) => (
                  <span key={item} className="px-3.5 py-1.5 bg-purple-50 text-purple-700 rounded-full text-[0.8rem] font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={6}>
            <Card withPurpleBar className="h-full">
              <CardIcon><ActivityIcon /></CardIcon>
              <CardTitle>SEO & Analytics</CardTitle>
              <CardDescription>
                Organic growth strategies backed by real data. We make sure your audience finds you.
              </CardDescription>
            </Card>
          </RevealOnScroll>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)] max-w-[1200px] mx-auto">
        <RevealOnScroll>
          <SectionHeader
            badge="How We Work"
            title={<>Our <span className="text-gradient">Process</span></>}
            subtitle="A proven framework that turns ideas into outcomes — methodically, transparently, and on schedule."
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="flex flex-col lg:flex-row items-start justify-center gap-0 relative px-[clamp(20px,5vw,40px)]">
            {[
              { num: '01', title: 'Discovery', desc: 'Deep dive into your business, audience, and goals to build the strategic foundation.' },
              { num: '02', title: 'Strategy', desc: 'Define the roadmap, tech stack, and design direction with clear milestones.' },
              { num: '03', title: 'Design & Build', desc: 'Iterative design sprints paired with agile development for rapid, quality output.' },
              { num: '04', title: 'Launch & Scale', desc: 'Go live with confidence, then optimize continuously based on real performance data.' },
            ].map((step, index) => (
              <div key={step.num} className="flex-1 text-center relative px-4 pb-8 lg:pb-0">
                {index < 3 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] right-[calc(-50%+28px)] h-0.5 bg-gray-100 transition-colors hover:bg-purple-400" />
                )}
                <div className="w-14 h-14 flex items-center justify-center bg-purple-500 text-white rounded-full text-[1.1rem] font-bold mx-auto mb-4 relative z-10 transition-all hover:scale-110 hover:shadow-[0_4px_20px_rgba(124,58,237,0.3)]">
                  {step.num}
                </div>
                <h4 className="text-[1.05rem] font-bold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-[0.85rem] text-gray-500 leading-[1.6]">{step.desc}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
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
            <div className="overflow-hidden relative py-8">
              <div className="absolute left-0 top-0 bottom-0 w-[120px] bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-[120px] bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

              <div className="flex items-center gap-12 animate-marquee w-max">
                {[...techStack, ...techStack].map((tech, index) => (
                  <span
                    key={`${tech}-${index}`}
                    className="text-base font-semibold text-gray-500 px-6 py-2 bg-white rounded-full border border-gray-100 whitespace-nowrap transition-colors hover:text-purple-500"
                  >
                    {tech}
                  </span>
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
              Ready to start your project?
            </h2>
            <p className="text-[1.05rem] text-white/80 mb-8 relative">
              Let&apos;s talk about what we can build together.
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
    </>
  );
}
