'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal, Parallax, MagneticButton } from '@/components/animations';
import { ArrowRightIcon } from '@/components/Icons';
import SoftStandardsLogo from '@/components/SoftStandardsLogo';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const storySection1Ref = useRef<HTMLDivElement>(null);
  const storySection2Ref = useRef<HTMLDivElement>(null);
  const storySection3Ref = useRef<HTMLDivElement>(null);

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
            Where AI Meets Marketing Excellence
          </div>

          {/* Title */}
          <h1
            ref={heroTitleRef}
            className="text-[clamp(2.8rem,6.5vw,5rem)] font-extrabold tracking-[-0.04em] leading-[1.1] mb-6 text-gray-900"
          >
            We Don&apos;t Just Market.
            <br />
            <span className="text-gradient">We Amplify.</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={heroSubtitleRef}
            className="text-[clamp(1.05rem,2vw,1.25rem)] text-gray-500 max-w-[600px] mx-auto leading-relaxed mb-12"
          >
            Soft Standards bridges the gap between cutting-edge AI technology and authentic brand storytelling.
            We craft digital experiences that convert strangers into loyal advocates.
          </p>

          {/* CTAs */}
          <div ref={heroCTARef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <Link
                href="https://calendly.com/youngbld101/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-btn group inline-flex items-center gap-2.5 px-8 py-4 bg-gray-900 text-white rounded-full text-base font-semibold transition-all shadow-[0_4px_20px_rgba(15,23,42,0.2)] hover:bg-purple-600 hover:shadow-[0_8px_30px_rgba(124,58,237,0.4)]"
              >
                Start Your Journey
                <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="#story"
                className="hero-cta-btn inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 border-2 border-gray-100 rounded-full text-base font-semibold transition-all hover:border-purple-200 hover:text-purple-600"
              >
                See Our Approach
              </Link>
            </MagneticButton>
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

      {/* Story Section 1: Revenue Promise */}
      <section
        id="story"
        ref={storySection1Ref}
        className="min-h-screen flex items-center px-5 md:px-10 py-24 bg-gray-50 relative overflow-hidden"
      >
        {/* Background decorative blobs */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-20" />

        <div className="max-w-[1100px] mx-auto relative z-10">
          {/* Full-width headline */}
          <div className="story-1-text text-center mb-16">
            <span className="inline-block px-5 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold tracking-wide uppercase mb-6">
              Proven Revenue System
            </span>
            <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-4">
              Turn Your Personal Story Into
            </h2>
            <p className="text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold leading-[1.1]">
              <span className="text-gradient">$10K–$50K</span>
              <span className="text-gray-900"> in Monthly Revenue</span>
            </p>
          </div>

          {/* Two columns: Pain vs. Gain */}
          <div className="story-1-visual grid md:grid-cols-2 gap-6 mb-12">
            {/* Pain column */}
            <div className="bg-white rounded-3xl p-8 border border-red-100 shadow-[0_8px_30px_rgba(239,68,68,0.08)] relative">
              <div className="absolute -top-4 left-8">
                <span className="inline-block px-4 py-1.5 bg-red-50 text-red-500 border border-red-200 rounded-full text-xs font-bold uppercase tracking-wider">
                  Without Us
                </span>
              </div>
              <ul className="space-y-5 mt-4">
                <li className="flex items-center gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                    <span className="text-red-400 font-bold text-sm">✕</span>
                  </span>
                  <span className="text-gray-600 text-[15px]">Burning cash on ads that get <strong className="text-gray-800">ignored</strong></span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                    <span className="text-red-400 font-bold text-sm">✕</span>
                  </span>
                  <span className="text-gray-600 text-[15px]">Creating <strong className="text-gray-800">5x more content</strong> just to keep up</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                    <span className="text-red-400 font-bold text-sm">✕</span>
                  </span>
                  <span className="text-gray-600 text-[15px]">Cookie-cutter strategies that make you <strong className="text-gray-800">blend in</strong></span>
                </li>
              </ul>
            </div>

            {/* Gain column */}
            <div className="bg-gray-900 rounded-3xl p-8 relative shadow-[0_8px_30px_rgba(15,23,42,0.2)]">
              <div className="absolute -top-4 left-8">
                <span className="inline-block px-4 py-1.5 bg-green-500 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                  With Us
                </span>
              </div>
              <ul className="space-y-5 mt-4">
                <li className="flex items-center gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 font-bold">&#10003;</span>
                  </span>
                  <span className="text-gray-300 text-[15px]">Capture attention in under <strong className="text-white">3 seconds</strong></span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 font-bold">&#10003;</span>
                  </span>
                  <span className="text-gray-300 text-[15px]">Convert cold traffic into warm leads <strong className="text-white">automatically</strong></span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 font-bold">&#10003;</span>
                  </span>
                  <span className="text-gray-300 text-[15px]">Works <strong className="text-white">24/7</strong> without you being &ldquo;always on&rdquo;</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Full-width bottom banner */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 p-8 md:p-10 text-center shadow-[0_20px_60px_rgba(124,58,237,0.3)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="relative z-10">
              <p className="text-purple-200 text-sm font-semibold uppercase tracking-widest mb-3">The Reality</p>
              <p className="text-white text-2xl md:text-3xl font-bold mb-2">
                91% of buyers prefer authentic brands.
              </p>
              <p className="text-purple-200 text-lg mb-1">
                Most businesses can&apos;t scale personal connection. <span className="text-white font-bold">We solve that.</span>
              </p>
              <p className="text-white/80 text-base mt-4">
                More revenue, less noise, <span className="text-yellow-300 font-bold">zero burnout.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section 2: AI Integration (Pinned/Animated) */}
      <section
        ref={storySection2Ref}
        className="min-h-screen flex items-center justify-center px-5 md:px-10 py-20 bg-gray-900 relative overflow-hidden"
      >
        <div className="ai-circles-container absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="ai-circle-1 absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-purple-500/30 rounded-full" />
          <div className="ai-circle-2 absolute w-[450px] h-[450px] md:w-[700px] md:h-[700px] border border-purple-500/20 rounded-full" />
          <div className="ai-circle-3 absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] border border-purple-500/10 rounded-full" />
        </div>

        <div className="relative z-10 text-center max-w-[800px]">
          <span className="ai-text-1 inline-block px-4 py-1.5 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm border border-purple-500/30">
            Our Secret Weapon
          </span>
          <h2 className="ai-text-2 text-[clamp(2rem,5vw,3.5rem)] font-bold text-white mb-8 leading-tight">
            AI-Powered Precision Meets
            <br />
            <span className="text-gradient">Human Creativity</span>
          </h2>
          <p className="ai-text-3 text-xl text-gray-400 leading-relaxed max-w-[600px] mx-auto">
            We harness artificial intelligence not to replace human touch, but to amplify it.
            Our AI tools analyze patterns, predict trends, and optimize delivery — while our creative team
            crafts stories that resonate on a deeply human level.
          </p>
        </div>

        {/* Animated particles */}
        <div className="floating-element absolute top-[20%] left-[15%] w-2 h-2 bg-purple-400 rounded-full opacity-60" />
        <div className="floating-element absolute top-[40%] right-[20%] w-3 h-3 bg-cyan-400 rounded-full opacity-40" />
        <div className="floating-element absolute bottom-[30%] left-[25%] w-2 h-2 bg-purple-300 rounded-full opacity-50" />
        <div className="floating-element absolute bottom-[20%] right-[15%] w-4 h-4 bg-purple-500 rounded-full opacity-30" />
      </section>

      {/* Story Section 3: The Solution */}
      <section
        ref={storySection3Ref}
        className="min-h-screen flex items-center px-5 md:px-10 py-20 md:py-32"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 bg-cyan-100 text-cyan-600 rounded-full text-sm font-semibold mb-6">
                The Soft Standards Way
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-gray-900 mb-6">
                Three Pillars of
                <span className="text-gradient"> Digital Excellence</span>
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Pillar 1 */}
            <div className="solution-card group bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-gray-100 hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)] hover:border-purple-100 transition-all duration-500">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors duration-300">
                <svg className="w-7 h-7 text-purple-500 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Automation</h3>
              <p className="text-gray-500 leading-relaxed mb-6">
                Intelligent systems that learn your brand voice and scale your content without losing authenticity.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Predictive analytics
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Content optimization
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Automated workflows
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="solution-card group bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-gray-100 hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)] hover:border-purple-100 transition-all duration-500">
              <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-500 transition-colors duration-300">
                <svg className="w-7 h-7 text-cyan-500 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Brand Strategy</h3>
              <p className="text-gray-500 leading-relaxed mb-6">
                Deep brand positioning that carves your unique space in the market and minds of your audience.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                  Market positioning
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                  Voice & messaging
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                  Visual identity
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="solution-card group bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-gray-100 hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)] hover:border-purple-100 transition-all duration-500">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors duration-300">
                <svg className="w-7 h-7 text-purple-500 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Growth Marketing</h3>
              <p className="text-gray-500 leading-relaxed mb-6">
                Data-driven campaigns that turn clicks into customers and customers into advocates.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Performance ads
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Conversion optimization
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Retention strategies
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Results/Social Proof Section */}
      <section className="py-20 md:py-32 px-5 md:px-10 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-6">
              Real Results
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-gray-900">
              Numbers That
              <span className="text-gradient"> Speak Volumes</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <ScrollReveal delay={0} className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-gray-100">
              <div className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-gray-900 mb-2">
                <span className="stat-number" data-target="40">0</span>
                <span className="text-purple-500">+</span>
              </div>
              <div className="text-sm md:text-base text-gray-500 font-medium">Projects Delivered</div>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-gray-100">
              <div className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-gray-900 mb-2">
                <span className="stat-number" data-target="95">0</span>
                <span className="text-purple-500">%</span>
              </div>
              <div className="text-sm md:text-base text-gray-500 font-medium">Client Retention</div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-gray-100">
              <div className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-gray-900 mb-2">
                <span className="stat-number" data-target="280">0</span>
                <span className="text-purple-500">%</span>
              </div>
              <div className="text-sm md:text-base text-gray-500 font-medium">Avg. ROI Increase</div>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-gray-100">
              <div className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-gray-900 mb-2">
                <span className="stat-number" data-target="12">0</span>
                <span className="text-purple-500">M+</span>
              </div>
              <div className="text-sm md:text-base text-gray-500 font-medium">Impressions Generated</div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 md:py-32 px-5 md:px-10">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal className="text-center">
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-gray-100">
              {/* Quote mark */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-serif">
                &ldquo;
              </div>

              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 mt-4">
                Soft Standards brought clarity to our brand at a time when everything felt chaotic.
                They didn&apos;t just build us a website — they helped us tell our story in a way that
                truly connects with our audience. The team genuinely cares about getting it right.
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  JT
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">James Thornton</div>
                  <div className="text-sm text-gray-500">Founder, SpaceDome AI</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="cta-section relative py-20 md:py-32 px-5 md:px-10 bg-gray-900 overflow-hidden">
        {/* Glow effects */}
        <div className="cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(124,58,237,0.3)_0%,transparent_60%)] rounded-full pointer-events-none" />
        <div className="cta-glow absolute top-[30%] right-[10%] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(6,182,212,0.2)_0%,transparent_60%)] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-[800px] mx-auto text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm border border-purple-500/30">
              Ready to Transform?
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white mb-6 leading-tight">
              Let&apos;s Build Something
              <br />
              <span className="text-gradient">Extraordinary Together</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-[600px] mx-auto leading-relaxed">
              Book a free strategy call and discover how AI-powered marketing can
              accelerate your growth without losing your authentic voice.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton strength={0.2}>
                <Link
                  href="https://calendly.com/youngbld101/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-8 py-4 bg-white text-gray-900 rounded-full text-base font-semibold transition-all hover:bg-purple-500 hover:text-white hover:shadow-[0_8px_30px_rgba(124,58,237,0.4)]"
                >
                  Book a Free Strategy Call
                  <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white/20 rounded-full text-base font-semibold transition-all hover:border-purple-400 hover:text-purple-300"
                >
                  View Case Studies
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>

          {/* Trust badges */}
          <ScrollReveal delay={0.4} className="mt-16 pt-10 border-t border-white/10">
            <p className="text-sm text-gray-500 mb-6">Trusted by innovative brands worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              <span className="text-white font-semibold text-lg">SpaceDome AI</span>
              <span className="text-white font-semibold text-lg">Bicycle Health</span>
              <span className="text-white font-semibold text-lg">Meridian Consulting</span>
              <span className="text-white font-semibold text-lg">Trellis Studios</span>
              <span className="text-white font-semibold text-lg">Apex Ventures</span>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
