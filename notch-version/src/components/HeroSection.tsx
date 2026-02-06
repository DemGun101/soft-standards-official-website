'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRightIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

interface Breadcrumb {
  href: string;
  label: string;
}

interface HeroCTA {
  href: string;
  label: string;
  external?: boolean;
}

interface HeroSectionProps {
  title: ReactNode;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  breadcrumbCurrent?: string;
  badge?: string;
  cta?: HeroCTA;
  background?: 'dark' | 'light' | 'gradient';
  showScrollIndicator?: boolean;
}

export default function HeroSection({
  title,
  subtitle,
  breadcrumbs,
  breadcrumbCurrent,
  badge,
  cta,
  background = 'dark',
  showScrollIndicator = true,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isDark = background === 'dark';
  const isGradient = background === 'gradient';

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Staggered entrance: badge → title → subtitle → CTA
      if (badge) {
        tl.fromTo(
          '.hero-badge',
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          0.3
        );
      }

      if (breadcrumbs) {
        tl.fromTo(
          '.hero-breadcrumbs',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.3
        );
      }

      tl.fromTo(
        '.hero-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        badge || breadcrumbs ? '-=0.3' : 0.3
      );

      if (subtitle) {
        tl.fromTo(
          '.hero-subtitle',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        );
      }

      if (cta) {
        tl.fromTo(
          '.hero-cta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        );
      }

      // Scroll indicator entrance + bounce
      if (showScrollIndicator && scrollRef.current) {
        tl.fromTo(
          scrollRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.2'
        );

        gsap.to(scrollRef.current, {
          y: 10,
          duration: 1.5,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
        });

        // Fade out scroll indicator on scroll
        gsap.to(scrollRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '30% top',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [badge, breadcrumbs, subtitle, cta, showScrollIndicator]);

  const bgClasses = isDark
    ? 'bg-[#0F172A] text-white'
    : isGradient
      ? 'bg-[#F8FAFC]'
      : 'bg-white';

  const textMuted = isDark ? 'text-gray-300' : 'text-gray-500';
  const gradientOpacity = isDark ? '0.12' : '0.08';

  return (
    <section
      ref={sectionRef}
      className={`min-h-[50vh] lg:min-h-[60vh] relative overflow-hidden flex flex-col items-center justify-center pt-[clamp(140px,18vw,200px)] pb-[clamp(60px,8vw,100px)] px-[clamp(20px,5vw,80px)] text-center ${bgClasses}`}
    >
      {/* Gradient background orb */}
      <div
        className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(124,58,237,${gradientOpacity}) 0%, transparent 70%)`,
          willChange: 'transform, opacity',
        }}
      />

      <div ref={contentRef} className="relative z-10 max-w-[800px] mx-auto">
        {/* Badge */}
        {badge && (
          <div className="hero-badge inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-full text-[0.85rem] font-medium text-gray-600 mb-6"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            {badge}
          </div>
        )}

        {/* Breadcrumbs */}
        {breadcrumbs && (
          <div
            className={`hero-breadcrumbs text-[0.85rem] ${textMuted} mb-6 flex items-center justify-center gap-2`}
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <ChevronRightIcon />}
                <Link
                  href={crumb.href}
                  className="text-purple-500 transition-colors hover:text-purple-400"
                >
                  {crumb.label}
                </Link>
              </span>
            ))}
            {breadcrumbCurrent && (
              <>
                <ChevronRightIcon />
                <span>{breadcrumbCurrent}</span>
              </>
            )}
          </div>
        )}

        {/* Title */}
        <h1
          className="hero-title text-[clamp(2.8rem,7vw,5rem)] font-extrabold tracking-[-0.04em] leading-[1.05] mb-6"
          style={{ opacity: 0, willChange: 'transform, opacity' }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            className={`hero-subtitle text-[clamp(1.05rem,2vw,1.25rem)] ${textMuted} max-w-[560px] mx-auto leading-[1.7]`}
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            {subtitle}
          </p>
        )}

        {/* CTA */}
        {cta && (
          <div className="hero-cta mt-8" style={{ opacity: 0, willChange: 'transform, opacity' }}>
            <Link
              href={cta.href}
              {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="inline-flex items-center gap-2.5 px-9 py-4 bg-purple-500 text-white rounded-full text-base font-semibold transition-all shadow-[0_4px_20px_rgba(124,58,237,0.3)] hover:bg-purple-600 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,58,237,0.4)]"
            >
              {cta.label}
            </Link>
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div
          ref={scrollRef}
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-400'}`}
          style={{ opacity: 0, willChange: 'transform, opacity' }}
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
      )}
    </section>
  );
}
