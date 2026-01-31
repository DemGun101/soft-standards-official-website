'use client';

import { useEffect, useRef, createContext, useContext, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GSAPContextType {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
}

const GSAPContext = createContext<GSAPContextType | null>(null);

export function useGSAPContext() {
  const context = useContext(GSAPContext);
  if (!context) {
    throw new Error('useGSAPContext must be used within GSAPProvider');
  }
  return context;
}

interface GSAPProviderProps {
  children: ReactNode;
}

export default function GSAPProvider({ children }: GSAPProviderProps) {
  const smoothWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configure GSAP defaults for smooth animations
    gsap.config({
      force3D: true,
    });

    gsap.defaults({
      ease: 'power3.out',
      duration: 1,
    });

    // Smooth scroll effect using native CSS
    document.documentElement.style.scrollBehavior = 'auto';

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Initial refresh after fonts load
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <GSAPContext.Provider value={{ gsap, ScrollTrigger }}>
      <div ref={smoothWrapperRef} className="smooth-wrapper">
        {children}
      </div>
    </GSAPContext.Provider>
  );
}
