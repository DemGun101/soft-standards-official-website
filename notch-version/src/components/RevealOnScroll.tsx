'use client';

import { useEffect, useRef, ReactNode, useState } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function RevealOnScroll({ children, className = '', delay }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Calculate delay in seconds for CSS
  const delaySeconds = delay ? delay * 0.1 : 0;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delaySeconds}s, transform 0.7s ease ${delaySeconds}s`,
      }}
    >
      {children}
    </div>
  );
}
