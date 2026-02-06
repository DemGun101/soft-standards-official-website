import Link from 'next/link';
import { Metadata } from 'next';
import Card, { CardIcon, CardTitle, CardDescription } from '@/components/Card';
import RevealOnScroll from '@/components/RevealOnScroll';
import { SectionHeader } from '@/components/Section';
import { CheckCircleIcon, SunIcon, EyeIcon, CheckIcon, ArrowRightIcon } from '@/components/Icons';
import HeroSection from '@/components/HeroSection';

export const metadata: Metadata = {
  title: 'About Us — Our Team & Story',
  description: 'Meet the team behind Soft Standards Inc. — developers, designers, and strategists with 4+ years of experience and 40+ projects delivered. Founded in 2022, we blend AI with authentic brand storytelling.',
  keywords: ['about soft standards', 'digital marketing team', 'marketing agency story', 'AI marketing experts'],
  openGraph: {
    title: 'About Soft Standards Inc. — Our Team & Story',
    description: 'Meet the team behind 40+ successful projects. Developers, designers, and strategists who blend AI with authentic brand storytelling.',
    type: 'website',
    url: 'https://softstandards.net/about',
  },
  alternates: { canonical: 'https://softstandards.net/about' },
};

const values = [
  { icon: <CheckCircleIcon />, title: 'Precision', desc: 'Every pixel, every line of code, every word — we sweat the details because they define the experience.' },
  { icon: <SunIcon />, title: 'Innovation', desc: "We push boundaries with emerging tech and creative thinking — never settling for the obvious solution." },
  { icon: <EyeIcon />, title: 'Transparency', desc: 'No black boxes. Clients see our process, our reasoning, and our metrics — open collaboration always.' },
  { icon: <CheckIcon />, title: 'Impact', desc: 'Beautiful design is nothing without results. We measure success by the outcomes we create for our partners.' },
];

const timeline = [
  { year: '2022', title: 'Founded', desc: 'Muhammad Furqan and Ishfaq Ahmed started Soft Standards with a simple belief: businesses deserve marketing that feels human, not automated. Our first project was a local brand refresh that turned into a long-term partnership.' },
  { year: '2023', title: 'First Major Client', desc: 'Partnered with SpaceDome AI to build their web presence from scratch — positioning their AI agent platform for a global audience. This project put us on the map in the tech space.' },
  { year: '2024', title: 'Team Growth', desc: 'Grew from a two-person operation to a team of six across development, design, and business development. Took on Bicycle Health and expanded into healthcare digital marketing.' },
  { year: '2025', title: 'Scaling Up', desc: 'Crossed 40 completed projects, established our AI automation practice, and began serving clients across multiple industries from our New York base.' },
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
      <HeroSection
        title={<>We are <span className="text-gradient">Soft Standards Inc.</span></>}
        subtitle="A close-knit team of developers, designers, and strategists who believe great digital work starts with genuinely understanding your story."
        badge="Our Story"
        background="light"
      />

      {/* Stats Bar */}
      <section className="px-[clamp(20px,5vw,80px)] -mt-6 pb-[clamp(40px,6vw,80px)]">
        <RevealOnScroll>
          <div className="flex items-center justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <div className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em] text-gray-900">
                4<span className="text-purple-500">+</span>
              </div>
              <div className="text-[0.85rem] text-gray-500 font-medium mt-1">Years</div>
            </div>
            <div className="w-px h-12 bg-gray-100" />
            <div className="text-center">
              <div className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em] text-gray-900">
                40<span className="text-purple-500">+</span>
              </div>
              <div className="text-[0.85rem] text-gray-500 font-medium mt-1">Projects</div>
            </div>
            <div className="w-px h-12 bg-gray-100" />
            <div className="text-center">
              <div className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em] text-gray-900">6</div>
              <div className="text-[0.85rem] text-gray-500 font-medium mt-1">Team Members</div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Mission & Values */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SectionHeader
            badge="What Drives Us"
            title={<>Mission & <span className="text-gradient">Values</span></>}
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          <RevealOnScroll className="lg:col-span-3">
            <div className="bg-purple-50 rounded-[36px] p-12 text-center border border-purple-100">
              <p className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-semibold text-purple-800 leading-[1.6] max-w-[700px] mx-auto">
                &ldquo;We exist to help businesses tell their story with honesty and craft — building digital products that connect with real people and drive real results.&rdquo;
              </p>
            </div>
          </RevealOnScroll>

          {values.map((value, index) => (
            <RevealOnScroll key={value.title} delay={index + 1}>
              <Card withPurpleBar className="h-full">
                <CardIcon>{value.icon}</CardIcon>
                <CardTitle>{value.title}</CardTitle>
                <CardDescription>{value.desc}</CardDescription>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SectionHeader
            badge="Our Journey"
            title={<>The <span className="text-gradient">Story</span></>}
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
            subtitle="Diverse minds, unified mission. Here are some of the people behind Soft Standards."
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {team.map((member, index) => (
            <RevealOnScroll key={member.name} delay={(index % 4) + 1}>
              <div className="text-center group">
                <div className={`w-full aspect-square rounded-[36px] bg-gradient-to-br ${member.gradient} mb-4 overflow-hidden relative transition-transform duration-350 group-hover:scale-[1.03]`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(124,58,237,0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-0.5">{member.name}</h4>
                <p className="text-[0.85rem] text-gray-500">{member.role}</p>
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
            title={<>Client <span className="text-gradient">Highlights</span></>}
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
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white tracking-[-0.03em] mb-3 relative">
              Want to work with us?
            </h2>
            <p className="text-[1.05rem] text-white/80 mb-8 relative">
              We&apos;re always looking for ambitious projects and great people.
            </p>
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
