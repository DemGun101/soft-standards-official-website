'use client';

import { useRef, useEffect, ReactNode, ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
  splitBy?: 'chars' | 'words' | 'lines';
  scrollTrigger?: boolean;
}

export default function SplitText({
  children,
  className = '',
  as: Component = 'div',
  delay = 0,
  stagger = 0.03,
  splitBy = 'chars',
  scrollTrigger = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const text = containerRef.current.innerText;
    let elements: string[] = [];

    if (splitBy === 'chars') {
      elements = text.split('');
    } else if (splitBy === 'words') {
      elements = text.split(' ');
    } else {
      elements = text.split('\n');
    }

    // Create spans for each element
    containerRef.current.innerHTML = elements
      .map((el, i) => {
        if (splitBy === 'chars' && el === ' ') {
          return '<span class="split-char" style="display: inline-block;">&nbsp;</span>';
        }
        return `<span class="split-char" style="display: inline-block; opacity: 0; transform: translateY(40px);">${el}${splitBy === 'words' && i < elements.length - 1 ? '&nbsp;' : ''}</span>`;
      })
      .join('');

    const chars = containerRef.current.querySelectorAll('.split-char');

    const animationConfig = {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: stagger,
      delay: delay,
      ease: 'power3.out',
    };

    if (scrollTrigger) {
      gsap.to(chars, {
        ...animationConfig,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    } else {
      gsap.to(chars, animationConfig);
    }

    hasAnimated.current = true;
  }, [delay, stagger, splitBy, scrollTrigger]);

  return (
    <Component ref={containerRef as any} className={className}>
      {children}
    </Component>
  );
}
