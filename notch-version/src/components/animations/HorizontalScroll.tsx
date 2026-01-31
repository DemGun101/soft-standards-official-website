'use client';

import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function HorizontalScroll({
  children,
  className = '',
  containerClassName = '',
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return;

    const sections = gsap.utils.toArray<HTMLElement>(
      wrapperRef.current.children
    );
    const totalWidth = sections.reduce(
      (acc, section) => acc + section.offsetWidth,
      0
    );

    const animation = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => '+=' + totalWidth,
        anticipatePin: 1,
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden ${containerClassName}`}>
      <div ref={wrapperRef} className={`flex ${className}`}>
        {children}
      </div>
    </div>
  );
}
