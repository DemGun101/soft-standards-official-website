import Link from 'next/link';
import Card, { CardIcon, CardTitle, CardDescription } from '@/components/Card';
import { LayersIcon, MonitorIcon, GlobeIcon, ArrowRightIcon } from '@/components/Icons';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-5 md:px-10 py-[140px] pb-20 text-center relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(124,58,237,0.08)_0%,transparent_70%)] rounded-full pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-gray-100 rounded-full text-[0.85rem] font-medium text-gray-500 mb-8 shadow-[0_1px_3px_rgba(15,23,42,0.04)] animate-fade-in-down opacity-0">
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse-slow" />
          Available for new projects
        </div>

        {/* Title */}
        <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-extrabold tracking-[-0.04em] leading-[1.05] max-w-[900px] mb-6 text-gray-900 animate-fade-in-up opacity-0 delay-150">
          <span className="text-gradient">The New Standard</span> in Digital Marketing.
        </h1>

        {/* Subtitle */}
        <p className="text-[clamp(1.05rem,2vw,1.3rem)] text-gray-500 max-w-[560px] leading-[1.6] mb-12 animate-fade-in-up opacity-0 delay-300">
          A modern SaaS-powered agency delivering AI Automation, Branding, Digital Marketing, Web Development, and App Development — with precision, clarity, and purpose.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up opacity-0 delay-450">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2.5 px-9 py-4 bg-purple-500 text-white rounded-full text-base font-semibold transition-all shadow-[0_4px_20px_rgba(124,58,237,0.3)] hover:bg-purple-600 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,58,237,0.4)] w-full sm:w-auto justify-center"
          >
            Start a Project
            <ArrowRightIcon />
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-9 py-4 bg-white text-gray-900 border-[1.5px] border-gray-100 rounded-full text-base font-semibold transition-all hover:border-gray-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] w-full sm:w-auto justify-center"
          >
            View Our Work
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mt-[72px] px-6 sm:px-12 py-9 bg-white rounded-[36px] border border-black/5 shadow-[0_4px_24px_rgba(15,23,42,0.06)] animate-fade-in-up opacity-0 delay-600">
          <div className="text-center">
            <div className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em] text-gray-900">
              120<span className="text-purple-500">+</span>
            </div>
            <div className="text-[0.85rem] text-gray-500 font-medium mt-1">Projects Delivered</div>
          </div>
          <div className="w-12 h-px sm:w-px sm:h-12 bg-gray-100" />
          <div className="text-center">
            <div className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em] text-gray-900">
              98<span className="text-purple-500">%</span>
            </div>
            <div className="text-[0.85rem] text-gray-500 font-medium mt-1">Client Satisfaction</div>
          </div>
          <div className="w-12 h-px sm:w-px sm:h-12 bg-gray-100" />
          <div className="text-center">
            <div className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em] text-gray-900">
              8<span className="text-purple-500">+</span>
            </div>
            <div className="text-[0.85rem] text-gray-500 font-medium mt-1">Years of Experience</div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="px-5 md:px-10 pb-[100px] animate-fade-in-up opacity-0 delay-750">
        <div className="flex flex-wrap justify-center gap-6 max-w-[1200px] mx-auto">
          <Card withPurpleBar className="flex-1 min-w-[260px] max-w-[340px]">
            <CardIcon>
              <LayersIcon />
            </CardIcon>
            <CardTitle>AI Automation</CardTitle>
            <CardDescription>
              Intelligent automation solutions that streamline your workflows and boost productivity.
            </CardDescription>
          </Card>

          <Card withPurpleBar className="flex-1 min-w-[260px] max-w-[340px]">
            <CardIcon>
              <MonitorIcon />
            </CardIcon>
            <CardTitle>Web Development</CardTitle>
            <CardDescription>
              High-performance websites and web apps built with modern frameworks and best practices.
            </CardDescription>
          </Card>

          <Card withPurpleBar className="flex-1 min-w-[260px] max-w-[340px]">
            <CardIcon>
              <GlobeIcon />
            </CardIcon>
            <CardTitle>Digital Marketing</CardTitle>
            <CardDescription>
              Data-driven strategies that amplify your reach and convert visitors into loyal customers.
            </CardDescription>
          </Card>
        </div>
      </section>
    </>
  );
}
