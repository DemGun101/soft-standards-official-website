import Link from 'next/link';
import { Metadata } from 'next';
import RevealOnScroll from '@/components/RevealOnScroll';
import { SectionHeader } from '@/components/Section';
import HeroSection from '@/components/HeroSection';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import PersonSchema from '@/components/schemas/PersonSchema';

export const metadata: Metadata = {
  title: 'About Soft Standards | AI Marketing Agency | 150+ Systems Built Since 2022',
  description: '6-person AI marketing agency founded in 2022. Offices in New York and Lahore. 150+ marketing systems, $47M+ client revenue, 97% retention. Meet the team behind the results.',
  keywords: ['about soft standards', 'AI marketing agency team', 'marketing agency New York', 'digital marketing team'],
  openGraph: {
    title: 'About Soft Standards | AI Marketing Agency | 150+ Systems Built Since 2022',
    description: '6-person AI marketing agency founded in 2022. Offices in New York and Lahore. 150+ marketing systems, $47M+ client revenue, 97% retention.',
    type: 'website',
    url: 'https://www.softstandardsinc.com/about',
  },
  alternates: { canonical: 'https://www.softstandardsinc.com/about' },
};

const timeline = [
  { year: '2022', title: 'Founded', desc: 'Muhammad Furqan and Ishfaq Ahmed started Soft Standards. Two people, one belief: businesses deserve marketing that actually works.' },
  { year: '2023', title: 'First Major Client', desc: "First major client — built SpaceDome AI's entire web presence from scratch." },
  { year: '2024', title: 'Team Growth', desc: 'Grew to a team of six. Expanded into AI automation.' },
  { year: '2025', title: 'Scaling Up', desc: '40+ projects delivered across the US, Canada, UK, and Australia.' },
];

const team = [
  { name: 'Muhammad Furqan', role: 'CEO', gradient: 'from-gray-100 to-gray-200' },
  { name: 'Ishfaq Ahmed', role: 'CTO', gradient: 'from-indigo-100 to-indigo-200' },
  { name: 'Zain-ul-Abedeen', role: 'Business Development', gradient: 'from-emerald-100 to-emerald-200' },
  { name: 'Akash Ahmed', role: 'Senior Developer & AI Automation', gradient: 'from-amber-100 to-amber-200' },
  { name: 'Alishba Ahmed', role: 'Senior Graphic Designer', gradient: 'from-pink-100 to-pink-200' },
  { name: 'Hashir Saleem', role: 'Associate Graphic Designer', gradient: 'from-violet-100 to-violet-200' },
];

const awards = [
  { year: '2025', name: 'SpaceDome AI', body: 'Full web platform & brand identity for AI agent startup' },
  { year: '2024', name: 'Bicycle Health', body: 'Digital marketing & patient acquisition platform' },
  { year: '2024', name: 'Meridian Consulting', body: 'Brand refresh & website redesign' },
  { year: '2023', name: 'Trellis Studios', body: 'E-commerce platform & growth strategy' },
  { year: '2023', name: 'Apex Ventures', body: 'Landing page & investor presentation design' },
];


export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        breadcrumbs={[{ name: 'Home', href: '/' }]}
        currentPage="About"
      />
      <PersonSchema name="Muhammad Furqan" jobTitle="CEO" />
      <PersonSchema name="Ishfaq Ahmed" jobTitle="CTO" />
      <PersonSchema name="Zain-ul-Abedeen" jobTitle="Business Development" />


      <HeroSection
        title={<>We&apos;re Soft Standards Inc. — <span className="text-gradient">AI Marketing Agency</span> in New York &amp; Lahore</>}
        subtitle="Six people. Two cities. One obsession: building digital systems that actually make money for the businesses we work with."
        badge="Our Story"
        background="light"
      />

      {/* Stats Bar */}
      <section className="px-[clamp(20px,5vw,80px)] -mt-6 pb-[clamp(40px,6vw,80px)]">
        <RevealOnScroll>
          <div className="flex items-center justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <div className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em] text-gray-900">
                150<span className="text-purple-500">+</span>
              </div>
              <div className="text-[0.85rem] text-gray-500 font-medium mt-1">Marketing Systems</div>
            </div>
            <div className="w-px h-12 bg-gray-100" />
            <div className="text-center">
              <div className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em] text-gray-900">
                $47M<span className="text-purple-500">+</span>
              </div>
              <div className="text-[0.85rem] text-gray-500 font-medium mt-1">Client Revenue</div>
            </div>
            <div className="w-px h-12 bg-gray-100" />
            <div className="text-center">
              <div className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em] text-gray-900">
                97<span className="text-purple-500">%</span>
              </div>
              <div className="text-[0.85rem] text-gray-500 font-medium mt-1">Retention</div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Quick Facts */}
      <section className="px-[clamp(20px,5vw,80px)] pb-[clamp(40px,6vw,80px)]">
        <RevealOnScroll>
          <div className="max-w-[800px] mx-auto bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Offices in New York and Lahore</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <dt className="text-sm font-semibold text-gray-500">Founded</dt>
                <dd className="text-base text-gray-900">2022</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-500">Headquarters</dt>
                <dd className="text-base text-gray-900">New York, USA</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-500">Team Size</dt>
                <dd className="text-base text-gray-900">6 members</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-500">Industries Served</dt>
                <dd className="text-base text-gray-900">Technology, Healthcare, E-commerce, Professional Services</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-500">Core Technologies</dt>
                <dd className="text-base text-gray-900">Next.js, React, TypeScript, AI/ML, Three.js</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-500">Notable Clients</dt>
                <dd className="text-base text-gray-900">SpaceDome AI, Bicycle Health, Meridian Consulting, Trellis Studios</dd>
              </div>
            </dl>
          </div>
        </RevealOnScroll>
      </section>

      {/* Mission & Values */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SectionHeader
            badge="What Drives Us"
            title={<>Our Approach to <span className="text-gradient">Marketing</span></>}
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          <RevealOnScroll className="lg:col-span-3">
            <div className="bg-white rounded-[36px] p-12 text-center border border-gray-100">
              <p className="text-[clamp(1rem,2vw,1.15rem)] text-gray-600 leading-[1.8] max-w-[700px] mx-auto">
                Most agencies optimize for looking busy. We optimize for outcomes. We&apos;d rather build one system that generates $89K/month than send you a 40-page report about &quot;brand awareness.&quot;
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="lg:col-span-3">
            <div className="bg-white rounded-[36px] p-12 text-center border border-gray-100">
              <p className="text-[clamp(1rem,2vw,1.15rem)] text-gray-600 leading-[1.8] max-w-[700px] mx-auto">
                We&apos;re not the biggest agency. We&apos;re not trying to be. We&apos;re the team that picks up the phone, ships on time, and doesn&apos;t hide behind jargon.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SectionHeader
            badge="Our Journey"
            title={<>Founded in 2022 to Build Marketing Systems That <span className="text-gradient">Actually Work</span></>}
          />
        </RevealOnScroll>

        <div className="max-w-[700px] mx-auto relative pl-6 lg:pl-0">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-100" />

          {timeline.map((item, index) => (
            <RevealOnScroll key={item.year} delay={index + 1}>
              <div className="relative pl-16 pb-12 last:pb-0">
                <div className="absolute left-[14px] top-1 w-[22px] h-[22px] rounded-full bg-white border-[3px] border-purple-500 z-10" />
                <span className="inline-flex px-3.5 py-1 bg-purple-50 text-purple-700 rounded-full text-[0.8rem] font-bold mb-2.5">
                  {item.year}
                </span>
                <h4 className="text-[1.15rem] font-bold text-gray-900 mb-1.5">{item.title}</h4>
                <p className="text-[0.9rem] text-gray-500 leading-[1.7]">{item.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SectionHeader
            badge="Our People"
            title={<>Meet the <span className="text-gradient">Team</span></>}
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {team.map((member, index) => (
            <RevealOnScroll key={member.name} delay={(index % 4) + 1}>
              <div className="text-center group">
                <div className={`w-full aspect-square rounded-[36px] bg-gradient-to-br ${member.gradient} mb-4 overflow-hidden relative transition-transform duration-350 group-hover:scale-[1.03]`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(124,58,237,0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-0.5">{member.name} — {member.role}</h3>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Awards Scroll */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SectionHeader
            badge="Our Work"
            title={<>150+ Marketing Systems. $47M+ in Client Revenue. <span className="text-gradient">97% Retention.</span></>}
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="flex gap-5 overflow-x-auto pb-5 scrollbar-hide snap-x snap-mandatory">
            {awards.map((award) => (
              <div
                key={`${award.year}-${award.name}`}
                className="flex-shrink-0 w-[280px] snap-start bg-white/50 backdrop-blur-xl border border-black/[0.04] border-l-[3px] border-l-purple-500 rounded-[28px] p-7"
              >
                <div className="text-[0.8rem] font-bold text-purple-600 mb-2">{award.year}</div>
                <h4 className="text-[1.1rem] font-bold text-gray-900 mb-1">{award.name}</h4>
                <p className="text-[0.85rem] text-gray-500">{award.body}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* CTA Banner */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <div className="bg-purple-500 rounded-[36px] py-[clamp(48px,6vw,80px)] px-[clamp(24px,4vw,64px)] text-center relative overflow-hidden max-w-[1200px] mx-auto">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white tracking-[-0.03em] mb-8 relative">
              Work With Us
            </h2>
            <div className="flex flex-wrap gap-4 justify-center relative">
              <Link
                href="/book"
                className="inline-flex items-center gap-2.5 px-9 py-4 bg-white text-purple-700 rounded-full text-base font-semibold transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
              >
                Start a Project
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-9 py-4 bg-transparent text-white border-[1.5px] border-white/30 rounded-full text-base font-semibold transition-all hover:bg-white/10"
              >
                Join the Team
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
