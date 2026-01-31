'use client';

import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AnimationVariant =
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'scale'
  | 'rotate'
  | 'blur'
  | 'slideUp'
  | 'clipReveal';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  distance?: number;
  start?: string;
  scrub?: boolean | number;
  markers?: boolean;
}

const variants = {
  fadeUp: { from: { opacity: 0, y: 60 }, to: { opacity: 1, y: 0 } },
  fadeDown: { from: { opacity: 0, y: -60 }, to: { opacity: 1, y: 0 } },
  fadeLeft: { from: { opacity: 0, x: -60 }, to: { opacity: 1, x: 0 } },
  fadeRight: { from: { opacity: 0, x: 60 }, to: { opacity: 1, x: 0 } },
  scale: { from: { opacity: 0, scale: 0.8 }, to: { opacity: 1, scale: 1 } },
  rotate: { from: { opacity: 0, rotation: -10 }, to: { opacity: 1, rotation: 0 } },
  blur: { from: { opacity: 0, filter: 'blur(10px)' }, to: { opacity: 1, filter: 'blur(0px)' } },
  slideUp: { from: { yPercent: 100 }, to: { yPercent: 0 } },
  clipReveal: { from: { clipPath: 'inset(100% 0 0 0)' }, to: { clipPath: 'inset(0% 0 0 0)' } },
};

export default function ScrollReveal({
  children,
  className = '',
  variant = 'fadeUp',
  delay = 0,
  duration = 1,
  distance = 60,
  start = 'top 85%',
  scrub = false,
  markers = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const variantConfig = variants[variant];

    // Modify distance if specified
    const fromConfig = { ...variantConfig.from };
    if ('y' in fromConfig && typeof distance === 'number') {
      fromConfig.y = fromConfig.y! > 0 ? distance : -distance;
    }
    if ('x' in fromConfig && typeof distance === 'number') {
      fromConfig.x = fromConfig.x! > 0 ? distance : -distance;
    }

    gsap.set(ref.current, fromConfig);

    const animation = gsap.to(ref.current, {
      ...variantConfig.to,
      duration: duration,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: start,
        toggleActions: scrub ? undefined : 'play none none none',
        scrub: scrub,
        markers: markers,
      },
    });

    return () => {
      animation.kill();
    };
  }, [variant, delay, duration, distance, start, scrub, markers]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
