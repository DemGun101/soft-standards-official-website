'use client';

import { useRef, useEffect, ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      if (isFirstMount.current) {
        // Initial page load animation
        const tl = gsap.timeline({
          onComplete: () => setIsReady(true),
        });
        tl.to(overlayRef.current, {
          scaleY: 0,
          duration: 0.8,
          ease: 'power3.inOut',
          delay: 0.1,
        })
          .to(
            containerRef.current,
            {
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
            },
            '-=0.4'
          );

        isFirstMount.current = false;
      } else {
        // Page transition animation
        setIsReady(false);
        gsap.set(containerRef.current, { opacity: 0 });

        const tl = gsap.timeline({
          onComplete: () => setIsReady(true),
        });

        tl.set(overlayRef.current, { scaleY: 0, transformOrigin: 'bottom' })
          .to(overlayRef.current, {
            scaleY: 1,
            duration: 0.4,
            ease: 'power3.inOut',
          })
          .set(overlayRef.current, { transformOrigin: 'top' })
          .to(overlayRef.current, {
            scaleY: 0,
            duration: 0.4,
            ease: 'power3.inOut',
          })
          .to(
            containerRef.current,
            {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            },
            '-=0.2'
          );
      }
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <>
      {/* Transition overlay - starts fully covering the page */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-gray-900 pointer-events-none"
        style={{ transform: 'scaleY(1)', transformOrigin: 'top' }}
      />

      {/* Page content - starts hidden */}
      <div ref={containerRef} style={{ opacity: 0 }}>
        {children}
      </div>
    </>
  );
}
