import Link from 'next/link';
import { Metadata } from 'next';
import Card, { CardIcon, CardTitle, CardDescription } from '@/components/Card';
import RevealOnScroll from '@/components/RevealOnScroll';
import { SectionHeader } from '@/components/Section';
import { CheckCircleIcon, SunIcon, EyeIcon, CheckIcon, ArrowRightIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'About — Soft Standards Inc.',
  description: 'A team of strategists, designers, and engineers obsessed with building digital products that move the needle.',
};

const values = [
  { icon: <CheckCircleIcon />, title: 'Precision', desc: 'Every pixel, every line of code, every word — we sweat the details because they define the experience.' },
  { icon: <SunIcon />, title: 'Innovation', desc: "We push boundaries with emerging tech and creative thinking — never settling for the obvious solution." },
  { icon: <EyeIcon />, title: 'Transparency', desc: 'No black boxes. Clients see our process, our reasoning, and our metrics — open collaboration always.' },
  { icon: <CheckIcon />, title: 'Impact', desc: 'Beautiful design is nothing without results. We measure success by the outcomes we create for our partners.' },
];

const timeline = [
  { year: '2018', title: 'Founded', desc: 'Started as a two-person studio with one mission: raise the bar for digital craft. Our first client was a local fintech startup that became our long-term partner.' },
  { year: '2020', title: 'First Major Award', desc: 'Recognized by Awwwards with a Site of the Day for our work on the Nexus Fintech rebrand — a turning point that put us on the global radar.' },
  { year: '2022', title: '50th Project Milestone', desc: 'Crossed 50 completed projects and grew our team to 15. Expanded into mobile development and digital marketing disciplines.' },
  { year: '2025', title: 'Global Expansion', desc: 'Opened remote hubs across three continents, serving clients in 12+ countries. 120+ projects delivered and counting.' },
];

const team = [
  { name: 'Zain Ahmed', role: 'Founder & CEO', gradient: 'from-gray-100 to-gray-200' },
  { name: 'Maya Torres', role: 'Design Director', gradient: 'from-emerald-100 to-emerald-200' },
  { name: 'Liam Patel', role: 'Head of Engineering', gradient: 'from-indigo-100 to-indigo-200' },
  { name: 'Emma Nakamura', role: 'Strategy Lead', gradient: 'from-amber-100 to-amber-200' },
  { name: 'Carlos Reyes', role: 'Senior Developer', gradient: 'from-pink-100 to-pink-200' },
  { name: 'Aisha Khalil', role: 'UX Researcher', gradient: 'from-green-100 to-green-200' },
  { name: 'Noah Fischer', role: 'Marketing Lead', gradient: 'from-gray-200 to-gray-300' },
  { name: 'Sofia Kim', role: 'Project Manager', gradient: 'from-emerald-200 to-emerald-400' },
];

const awards = [
  { year: '2025', name: 'Red Dot Design Award', body: 'Interface & User Experience' },
  { year: '2024', name: 'Awwwards Site of the Day', body: 'Verdant Health Platform' },
  { year: '2024', name: 'CSS Design Award', body: 'Best UI Design' },
  { year: '2023', name: 'Webby Award', body: 'Best Agency Website' },
  { year: '2022', name: 'FWA of the Day', body: 'Nexus Fintech Rebrand' },
  { year: '2021', name: 'Awwwards Honorable Mention', body: 'Orbit SaaS Mobile App' },
  { year: '2020', name: 'Awwwards SOTD', body: 'Nexus Brand Identity' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Split */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-[1200px] mx-auto pt-[clamp(140px,18vw,200px)] pb-[clamp(60px,8vw,100px)] px-[clamp(20px,5vw,80px)]">
        <div className="text-center lg:text-left">
          <h1 className="text-[clamp(2.8rem,7vw,5rem)] font-extrabold tracking-[-0.04em] leading-[1.05] mb-6">
            We are <span className="text-gradient">Soft Standards Inc.</span>
          </h1>
          <p className="text-[clamp(1.05rem,2vw,1.25rem)] text-gray-500 max-w-[560px] mx-auto lg:mx-0 leading-[1.7] mb-10">
            A team of strategists, designers, and engineers obsessed with building digital products that move the needle. We&apos;ve spent 8 years refining our craft — and we&apos;re just getting started.
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-8 sm:gap-12">
            <div className="text-center lg:text-left">
              <div className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em] text-gray-900">
                8<span className="text-purple-500">+</span>
              </div>
              <div className="text-[0.85rem] text-gray-500 font-medium mt-1">Years</div>
            </div>
            <div className="w-px h-12 bg-gray-100" />
            <div className="text-center lg:text-left">
              <div className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em] text-gray-900">
                120<span className="text-purple-500">+</span>
              </div>
              <div className="text-[0.85rem] text-gray-500 font-medium mt-1">Projects</div>
            </div>
            <div className="w-px h-12 bg-gray-100" />
            <div className="text-center lg:text-left">
              <div className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em] text-gray-900">25</div>
              <div className="text-[0.85rem] text-gray-500 font-medium mt-1">Team Members</div>
            </div>
          </div>
        </div>

        <div className="aspect-[4/3] bg-gradient-to-br from-purple-100 to-purple-400 rounded-[36px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(124,58,237,0.3)] to-transparent rounded-[36px]" />
        </div>
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
                &ldquo;We exist to raise the standard of digital — building products with intention, craft, and a relentless focus on outcomes that matter.&rdquo;
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
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
            badge="Recognition"
            title={<>Awards & <span className="text-gradient">Honors</span></>}
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
                href="#contact"
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
