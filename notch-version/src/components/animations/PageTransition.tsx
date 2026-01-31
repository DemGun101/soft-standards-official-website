'use client';

import { useRef, useEffect, ReactNode } from 'react';
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

  useEffect(() => {
    if (!containerRef.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      if (isFirstMount.current) {
        // Initial page load animation
        gsap.set(overlayRef.current, { scaleY: 1, transformOrigin: 'top' });
        gsap.set(containerRef.current, { opacity: 0 });

        const tl = gsap.timeline();
        tl.to(overlayRef.current, {
          scaleY: 0,
          duration: 0.8,
          ease: 'power3.inOut',
          delay: 0.2,
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
        const tl = gsap.timeline();

        tl.set(overlayRef.current, { scaleY: 0, transformOrigin: 'bottom' })
          .to(overlayRef.current, {
            scaleY: 1,
            duration: 0.5,
            ease: 'power3.inOut',
          })
          .set(overlayRef.current, { transformOrigin: 'top' })
          .to(overlayRef.current, {
            scaleY: 0,
            duration: 0.5,
            ease: 'power3.inOut',
          });
      }
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <>
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-gray-900 pointer-events-none"
        style={{ transformOrigin: 'top' }}
      />

      {/* Page content */}
      <div ref={containerRef}>{children}</div>
    </>
  );
}
