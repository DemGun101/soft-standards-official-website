'use client';

import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  start?: string;
  end?: string;
}

export default function Parallax({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
  start = 'top bottom',
  end = 'bottom top',
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const distance = 100 * speed;

    const animationProps: gsap.TweenVars = {};

    switch (direction) {
      case 'up':
        animationProps.yPercent = -distance;
        break;
      case 'down':
        animationProps.yPercent = distance;
        break;
      case 'left':
        animationProps.xPercent = -distance;
        break;
      case 'right':
        animationProps.xPercent = distance;
        break;
    }

    const animation = gsap.fromTo(
      ref.current,
      {
        yPercent: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
        xPercent: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      },
      {
        ...animationProps,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: start,
          end: end,
          scrub: 0.5,
        },
      }
    );

    return () => {
      animation.kill();
    };
  }, [speed, direction, start, end]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
