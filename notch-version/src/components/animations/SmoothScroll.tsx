'use client';

import { useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Configure GSAP defaults
    gsap.config({
      force3D: true,
    });

    gsap.defaults({
      ease: 'power3.out',
      duration: 1,
    });

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Refresh after fonts load
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    // Add smooth scroll behavior
    const html = document.documentElement;
    html.style.scrollBehavior = 'smooth';

    return () => {
      window.removeEventListener('resize', handleResize);
      html.style.scrollBehavior = '';
    };
  }, []);

  return <>{children}</>;
}
