'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal, Parallax, MagneticButton } from '@/components/animations';
import { ArrowRightIcon } from '@/components/Icons';
import SoftStandardsLogo from '@/components/SoftStandardsLogo';
import FAQSection from '@/components/FAQSection';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    result: '$12K/month → $89K/month in 90 days',
    text: "Three agencies, zero results. Soft Standards rebuilt everything. Within 90 days we 7x'd monthly revenue. Nothing else comes close.",
    name: 'James Thornton',
    role: 'Founder, SpaceDome AI',
    avatar: '/images/case-studies/james-thornton.png'
  },
  {
    result: '67% drop in cost per lead. Pipeline full for 6 months.',
    text: "Healthcare isn't sexy for agencies. They got it. CPL dropped 67% in month one. We had to slow intake.",
    name: 'Rachel Kim',
    role: 'VP Digital, Bicycle Health',
    avatar: '/images/case-studies/rachel-kim.png'
  },
  {
    result: 'First real marketing system in 8 years of business.',
    text: "They built us a machine, not a website. I finally feel like a CEO.",
    name: 'Daniel Porter',
    role: 'Managing Director, Meridian Consulting',
    avatar: '/images/case-studies/daniel-porter.png'
  },
  {
    result: '4.2x conversion rate. E-commerce revenue doubled.',
    text: "Same traffic. Same product. Better system. Conversion rate up 4.2x, revenue doubled.",
    name: 'Sarah Lin',
    role: 'Founder, Trellis Studios',
    avatar: '/images/case-studies/sarah-lin.png'
  },
];

export default function HomeContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const storySection1Ref = useRef<HTMLDivElement>(null);
  const storySection2Ref = useRef<HTMLDivElement>(null);
  const storySection3Ref = useRef<HTMLDivElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance timeline
      const heroTl = gsap.timeline({ delay: 0.3 });

      // Animate hero gradient background
      heroTl.fromTo(
        '.hero-gradient',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }
      );

      // Animate badge
      heroTl.fromTo(
        '.hero-badge',
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=1'
      );

      // Split and animate title
      if (heroTitleRef.current) {
        const titleText = heroTitleRef.current.innerHTML;
        heroTitleRef.current.innerHTML = titleText;
        heroTl.fromTo(
          heroTitleRef.current,
          { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
          { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power3.out' },
          '-=0.5'
        );
      }

      // Animate subtitle
      heroTl.fromTo(
        heroSubtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      );

      // Animate CTA buttons
      heroTl.fromTo(
        '.hero-cta-btn',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
        '-=0.4'
      );

      // Animate scroll indicator
      heroTl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      );

      // Scroll indicator bounce animation
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Hero parallax on scroll
      gsap.to('.hero-gradient', {
        yPercent: 50,
        scale: 1.2,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Hero content fade out on scroll
      gsap.to(heroContentRef.current, {
        opacity: 0,
        y: -100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Story Section 1 - The Problem
      gsap.fromTo(
        '.story-1-text',
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storySection1Ref.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.story-1-visual',
        { opacity: 0, x: 80, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storySection1Ref.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Story Section 2 - AI Integration (Pinned)
      const aiTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: storySection2Ref.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
        },
      });

      aiTimeline
        .fromTo('.ai-circle-1', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 })
        .fromTo('.ai-circle-2', { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.7, duration: 1 }, '-=0.5')
        .fromTo('.ai-circle-3', { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.4, duration: 1 }, '-=0.5')
        .fromTo('.ai-text-1', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .fromTo('.ai-text-2', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .to('.ai-circles-container', { rotation: 180, duration: 2, ease: 'none' })
        .fromTo('.ai-text-3', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 }, '-=1');

      // Story Section 3 - The Solution
      gsap.fromTo(
        '.solution-card',
        { opacity: 0, y: 60, rotationX: 15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storySection3Ref.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stats counter animation
      const statElements = document.querySelectorAll('.stat-number');
      statElements.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0', 10);
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stat,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // CTA Section animations
      gsap.fromTo(
        '.cta-glow',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Floating elements animation
      gsap.utils.toArray<HTMLElement>('.floating-element').forEach((el, i) => {
        gsap.to(el, {
          y: 'random(-20, 20)',
          x: 'random(-10, 10)',
          rotation: 'random(-5, 5)',
          duration: 'random(3, 5)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.2,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        data-section="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-5 md:px-10 py-20 overflow-hidden"
      >
        {/* Animated gradient background */}
        <div className="hero-gradient absolute top-[-30%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(124,58,237,0.12)_0%,rgba(124,58,237,0.04)_40%,transparent_70%)] rounded-full pointer-events-none" />
        <div className="hero-gradient absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(6,182,212,0.08)_0%,transparent_60%)] rounded-full pointer-events-none" />

        {/* Floating elements */}
        <div className="floating-element absolute top-[20%] left-[10%] w-3 h-3 bg-purple-400/30 rounded-full" />
        <div className="floating-element absolute top-[30%] right-[15%] w-2 h-2 bg-cyan-400/30 rounded-full" />
        <div className="floating-element absolute bottom-[30%] left-[20%] w-4 h-4 bg-purple-300/20 rounded-full" />
        <div className="floating-element absolute bottom-[25%] right-[10%] w-2 h-2 bg-purple-500/30 rounded-full" />

        <div ref={heroContentRef} className="relative z-10 text-center max-w-[900px]">
          {/* Animated Logo */}
          <div className="flex justify-center mb-8">
            <SoftStandardsLogo theme="light" className="w-32 h-32 md:w-40 md:h-40" autoPlay />
          </div>

          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-full text-[0.85rem] font-medium text-gray-600 mb-8 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
            </span>
            For Founders Who Are Done Guessing
          </div>

          {/* Title */}
          <h1
            ref={heroTitleRef}
            className="text-[clamp(2.8rem,6.5vw,5rem)] font-extrabold tracking-[-0.04em] leading-[1.1] mb-6 text-gray-900"
          >
            We Build Marketing Systems
            <br />
            <span className="text-gradient">That Sell While You Sleep</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={heroSubtitleRef}
            className="text-[clamp(1.05rem,2vw,1.25rem)] text-gray-500 max-w-[650px] mx-auto leading-relaxed mb-6"
          >
            Brand. Website. Ads. Automation. Done-for-you in 30 days — you only pay if it works.
          </p>

          {/* CTAs */}
          <div ref={heroCTARef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <MagneticButton>
              <Link
                href="/book"
                className="hero-cta-btn group inline-flex items-center gap-2.5 px-8 py-4 bg-gray-900 text-white rounded-full text-base font-semibold transition-all shadow-[0_4px_20px_rgba(15,23,42,0.2)] hover:bg-purple-600 hover:shadow-[0_8px_30px_rgba(124,58,237,0.4)]"
              >
                See If You Qualify
                <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="#story"
                className="hero-cta-btn inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 border-2 border-gray-100 rounded-full text-base font-semibold transition-all hover:border-purple-200 hover:text-purple-600"
              >
                Watch How It Works (2 min)
              </Link>
            </MagneticButton>
          </div>

          {/* Trust Bar */}
          <div className="hero-cta-btn flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <span className="font-bold text-gray-900">150+</span> systems built
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="flex items-center gap-2">
              <span className="font-bold text-gray-900">$47M+</span> in tracked client revenue
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="flex items-center gap-2">
              <span className="font-bold text-gray-900">97%</span> client retention
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll to explore</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* Story Section 1: Problem Agitation */}
      <section
        id="story"
        data-section="story"
        ref={storySection1Ref}
        className="min-h-screen flex items-center px-5 md:px-10 py-24 bg-gray-50 relative overflow-hidden"
      >
        {/* Background decorative blobs */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-red-200 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20" />

        <div className="max-w-[900px] mx-auto relative z-10">
          {/* Section header */}
          <div className="story-1-text text-center mb-12">
            <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-8">
              We Build the Entire
              <br />
              <span className="text-gradient">Marketing Machine</span>
            </h2>
          </div>

          {/* Problem content */}
          <div className="story-1-visual">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgba(15,23,42,0.06)] border border-gray-100 mb-8">
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
                You&apos;ve tried agencies, freelancers, and doing it yourself. You&apos;re still:
              </p>
              <ul className="space-y-4 text-lg text-gray-700 mb-10">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">&#10007;</span>
                  <span>Posting content that gets likes but not revenue</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">&#10007;</span>
                  <span>Running ads with no idea what&apos;s actually working</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">&#10007;</span>
                  <span>Watching competitors with worse products outpace you</span>
                </li>
              </ul>
            </div>

            {/* The real problem */}
            <div className="relative rounded-3xl overflow-hidden bg-gray-900 p-8 md:p-10 text-center shadow-[0_20px_60px_rgba(15,23,42,0.2)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(124,58,237,0.15),transparent_60%)]" />
              <div className="relative z-10">
                <p className="text-white text-2xl md:text-3xl font-bold mb-4">
                  The problem isn&apos;t your product or your effort. It&apos;s that you don&apos;t have a <span className="text-gradient">system.</span>
                </p>
                <p className="text-gray-400 text-lg">
                  You have scattered tactics. We build the machine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section 2: The Shift */}
      <section
        ref={storySection2Ref}
        data-section="vision"
        className="min-h-screen flex items-center justify-center px-5 md:px-10 py-20 bg-gray-900 relative overflow-hidden"
      >
        <div className="ai-circles-container absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="ai-circle-1 absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-green-500/30 rounded-full" />
          <div className="ai-circle-2 absolute w-[450px] h-[450px] md:w-[700px] md:h-[700px] border border-green-500/20 rounded-full" />
          <div className="ai-circle-3 absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] border border-green-500/10 rounded-full" />
        </div>

        <div className="relative z-10 text-center max-w-[800px]">
          <h2 className="ai-text-1 text-[clamp(2rem,5vw,3.5rem)] font-bold text-white mb-10 leading-tight">
            An AI Marketing Agency Built
            <br />
            <span className="text-gradient">for Growth, Not Guesswork</span>
          </h2>

          <div className="ai-text-2 max-w-[550px] mx-auto mb-10">
            <p className="text-gray-300 text-lg leading-relaxed">
              Imagine waking up to 12 qualified leads in your inbox, a calendar booked with buyers who already want to say yes, and a brand so clear it sells before the first call.
            </p>
          </div>

          <div className="ai-text-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 max-w-[500px] mx-auto">
              <p className="text-gray-400 text-lg mb-2">Struggling brands <span className="text-white">market.</span></p>
              <p className="text-lg mb-4"><span className="text-gradient font-bold italic">Scaling brands engineer.</span></p>
              <p className="text-gray-500 text-base">
                We don&apos;t do marketing. We build revenue systems — powered by AI, designed by humans, <span className="text-green-400 font-semibold">guaranteed to perform.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Animated particles */}
        <div className="floating-element absolute top-[20%] left-[15%] w-2 h-2 bg-green-400 rounded-full opacity-60" />
        <div className="floating-element absolute top-[40%] right-[20%] w-3 h-3 bg-cyan-400 rounded-full opacity-40" />
        <div className="floating-element absolute bottom-[30%] left-[25%] w-2 h-2 bg-green-300 rounded-full opacity-50" />
        <div className="floating-element absolute bottom-[20%] right-[15%] w-4 h-4 bg-purple-500 rounded-full opacity-30" />
      </section>

      {/* Story Section 3: How It Works */}
      <section
        ref={storySection3Ref}
        data-section="process"
        className="min-h-screen flex items-center px-5 md:px-10 py-20 md:py-32"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-gray-900 mb-4">
                How Our Performance-Based
                <span className="text-gradient"> Model Works</span>
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Phase 1 */}
            <div className="solution-card group bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-gray-100 hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)] hover:border-purple-100 transition-all duration-500 relative">
              <div className="absolute -top-3 left-8">
                <span className="inline-block px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-bold">
                  PHASE 1
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">We Build Your Marketing System</h3>
              <p className="text-gray-500 leading-relaxed mb-6">
                We download everything in your head. Your story. Your customers. Your competitors. Your goals. Then we build the entire system — website, automations, ad creative, email sequences.
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-400">You get:</p>
                <p className="text-sm font-semibold text-purple-600">Complete brand strategy + full website + automation stack</p>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="solution-card group bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-gray-100 hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)] hover:border-purple-100 transition-all duration-500 relative">
              <div className="absolute -top-3 left-8">
                <span className="inline-block px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-bold">
                  PHASE 2
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">30-Day Proof Period — You Pay Nothing</h3>
              <p className="text-gray-500 leading-relaxed mb-6">
                Ads go live. Sequences start running. Leads start flowing. You start closing. We prove it works before you invest a dollar.
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-400">You get:</p>
                <p className="text-sm font-semibold text-purple-600">Live campaigns + lead flow + zero risk</p>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="solution-card group bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-gray-100 hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)] hover:border-purple-100 transition-all duration-500 relative">
              <div className="absolute -top-3 left-8">
                <span className="inline-block px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-bold">
                  PHASE 3
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">Monthly Growth — Only When It Works</h3>
              <p className="text-gray-500 leading-relaxed mb-6">
                We watch the data. Kill what doesn&apos;t work. Double down on what does. You only pay when results are proven.
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-400">You get:</p>
                <p className="text-sm font-semibold text-purple-600">Optimization playbook + ongoing growth</p>
              </div>
            </div>
          </div>

          {/* After 30 Days */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 bg-gray-900 rounded-3xl p-8 md:p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.15),transparent_60%)]" />
              <div className="relative z-10">
                <p className="text-purple-400 text-sm font-semibold uppercase tracking-wider mb-3">After 30 Days</p>
                <p className="text-white text-xl md:text-2xl font-bold">
                  After 30 days, you own everything. Every asset. Every login. Every piece of copy. No hostage contracts. It&apos;s yours forever.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Results/Social Proof Section */}
      <section data-section="receipts" className="py-20 md:py-32 px-5 md:px-10 bg-gray-50" style={{ minHeight: '200px' }}>
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-gray-900">
              150+ Marketing Systems Built.
              <span className="text-gradient"> $47M+ in Client Revenue.</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <ScrollReveal delay={0} className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-gray-100">
              <div className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-gray-900 mb-2">
                <span className="text-purple-500">$</span>
                <span className="stat-number" data-target="47">47</span>
                <span className="text-purple-500">M+</span>
              </div>
              <div className="text-sm md:text-base text-gray-500 font-medium">Revenue generated for clients</div>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-gray-100">
              <div className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-gray-900 mb-2">
                <span className="stat-number" data-target="340">340</span>
                <span className="text-purple-500">%</span>
              </div>
              <div className="text-sm md:text-base text-gray-500 font-medium">Average ROI in 90 days</div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-gray-100">
              <div className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-gray-900 mb-2">
                <span className="stat-number" data-target="67">67</span>
                <span className="text-purple-500">%</span>
              </div>
              <div className="text-sm md:text-base text-gray-500 font-medium">Average drop in cost per lead</div>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-gray-100">
              <div className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-gray-900 mb-2">
                <span className="stat-number" data-target="97">97</span>
                <span className="text-purple-500">%</span>
              </div>
              <div className="text-sm md:text-base text-gray-500 font-medium">Client retention rate</div>
            </ScrollReveal>
          </div>

          <noscript>
            <style>{`.stat-number { display: inline; }`}</style>
          </noscript>
        </div>
      </section>

      {/* Testimonial Section */}
      <section data-section="testimonials" className="py-20 md:py-32 px-5 md:px-10">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal className="text-center">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-gray-900 mb-4">
              Marketing Results
              <span className="text-gradient"> From Real Clients</span>
            </h2>
            <p className="text-lg text-gray-500 mb-8">Don&apos;t take our word for it. Look at the receipts.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-[600px] mx-auto text-left">
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">+185% Organic Traffic for SpaceDome AI</h3>
                <p className="text-sm text-gray-500 mt-1">Web platform &amp; brand identity built from zero</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">67% Lower Cost Per Lead for Bicycle Health</h3>
                <p className="text-sm text-gray-500 mt-1">Patient acquisition system for telehealth</p>
              </div>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Testimonial Cards Container */}
            <div className="relative overflow-hidden pt-6" aria-live="polite" aria-atomic="true">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-2"
                  >
                    <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-gray-100">
                      {/* Result badge */}
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                        <span className="inline-block px-4 py-2 bg-green-500 text-white rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                          {testimonial.result}
                        </span>
                      </div>

                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 mt-4">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>

                      <div className="flex items-center justify-center gap-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden relative flex-shrink-0">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                            loading="lazy"
                            quality={85}
                          />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-500">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots - Fixed touch target sizes */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className="flex items-center justify-center w-11 h-11"
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <span className={`block rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-purple-500 w-8 h-2.5'
                      : 'bg-gray-300 hover:bg-gray-400 w-2.5 h-2.5'
                  }`} />
                </button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-purple-500 hover:shadow-xl transition-all"
              aria-label="Previous testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-purple-500 hover:shadow-xl transition-all"
              aria-label="Next testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section id="contact" data-section="contact" className="cta-section relative py-20 md:py-32 px-5 md:px-10 bg-gray-900 overflow-hidden">
        {/* Glow effects */}
        <div className="cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(124,58,237,0.3)_0%,transparent_60%)] rounded-full pointer-events-none" />
        <div className="cta-glow absolute top-[30%] right-[10%] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(6,182,212,0.2)_0%,transparent_60%)] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-[900px] mx-auto">
          <ScrollReveal>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white mb-12 leading-tight text-center">
              Book a Free 15-Minute
              <span className="text-gradient"> Growth Audit</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Path 1 */}
            <ScrollReveal delay={0.1}>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 h-full">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mb-6 text-gray-400 text-xl font-bold">
                  1
                </div>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Close this tab. Keep guessing.
                </p>
              </div>
            </ScrollReveal>

            {/* Path 2 */}
            <ScrollReveal delay={0.2}>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30 h-full">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-6 text-white text-xl font-bold">
                  2
                </div>
                <p className="text-white text-lg leading-relaxed">
                  Book a 15-minute call. We&apos;ll show you the system, the cost, and whether we&apos;re the right fit.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.3} className="text-center">
            <p className="text-gray-400 text-lg mb-8">No pitch. No pressure. Just clarity.</p>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="text-center">
            <MagneticButton strength={0.2}>
              <Link
                href="/book"
                className="group inline-flex items-center gap-2.5 px-10 py-5 bg-white text-gray-900 rounded-full text-lg font-semibold transition-all hover:bg-purple-500 hover:text-white hover:shadow-[0_8px_30px_rgba(124,58,237,0.4)]"
              >
                Book Your Free Growth Audit
                <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
            <p className="text-gray-500 text-sm mt-6">
              Limited to 4 new clients per month. Currently accepting applications.
            </p>
          </ScrollReveal>

          {/* Trust badges */}
          <ScrollReveal delay={0.5} className="mt-16 pt-10 border-t border-white/10">
            <p className="text-sm text-gray-500 mb-6 text-center">Trusted by innovative brands worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              <span className="text-white font-semibold text-lg">SpaceDome AI</span>
              <span className="text-white font-semibold text-lg">Bicycle Health</span>
              <span className="text-white font-semibold text-lg">Meridian Consulting</span>
              <span className="text-white font-semibold text-lg">Trellis Studios</span>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
