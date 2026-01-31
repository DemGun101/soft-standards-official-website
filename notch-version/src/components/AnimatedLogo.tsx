'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface AnimatedLogoProps {
  variant?: 'light' | 'dark';
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function AnimatedLogo({
  variant = 'light',
  size = 200,
  className = '',
  animate = true,
}: AnimatedLogoProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const shape1Ref = useRef<SVGPathElement>(null);
  const shape2Ref = useRef<SVGPathElement>(null);
  const shape3Ref = useRef<SVGPathElement>(null);
  const shape4Ref = useRef<SVGPathElement>(null);
  const shape5Ref = useRef<SVGPathElement>(null);
  const shape6Ref = useRef<SVGPathElement>(null);

  const isDark = variant === 'dark';
  const bgColor = isDark ? '#00002D' : '#F7F5FE';

  useEffect(() => {
    if (!animate || !svgRef.current) return;

    const shapes = [
      shape1Ref.current,
      shape2Ref.current,
      shape3Ref.current,
      shape4Ref.current,
      shape5Ref.current,
      shape6Ref.current,
    ].filter(Boolean);

    const ctx = gsap.context(() => {
      // Initial state - shapes invisible and scaled down
      gsap.set(shapes, {
        opacity: 0,
        scale: 0,
        transformOrigin: 'center center',
      });

      // Main entrance timeline
      const tl = gsap.timeline({
        delay: 0.5,
        defaults: { ease: 'back.out(1.7)' },
      });

      // Animate each shape with stagger - creating a wave pattern
      // Order: top-left, top-center, top-right, bottom-right, bottom-center, bottom-left
      const animationOrder = [
        shape6Ref.current, // Top-left (full quarter circle)
        shape5Ref.current, // Top-center (rectangle)
        shape4Ref.current, // Top-right (quarter circle)
        shape3Ref.current, // Bottom-right (large quarter circle)
        shape2Ref.current, // Bottom-center (rectangle)
        shape1Ref.current, // Bottom-left (quarter circle)
      ].filter(Boolean);

      // Staggered entrance with scale and opacity
      tl.to(animationOrder, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: {
          each: 0.12,
          from: 'start',
        },
      });

      // Add a subtle pulse effect after entrance
      tl.to(
        shapes,
        {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        },
        '+=0.2'
      );

      tl.to(shapes, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.inOut',
      });

      // Continuous subtle breathing animation
      gsap.to(shapes, {
        scale: 1.015,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2,
        stagger: {
          each: 0.1,
          from: 'random',
        },
      });

      // Subtle gradient shimmer effect - rotating the gradient
      const gradients = svgRef.current?.querySelectorAll('linearGradient');
      if (gradients) {
        gradients.forEach((grad, i) => {
          gsap.to(grad.querySelectorAll('stop'), {
            attr: { 'stop-opacity': 0.85 },
            duration: 1.5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 0.2,
          });
        });
      }
    }, svgRef);

    return () => ctx.revert();
  }, [animate]);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradient definitions matching the original logos */}
        <linearGradient
          id={`gradient1-${variant}`}
          x1="30%"
          y1="100%"
          x2="100%"
          y2="30%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B3BF4" />
          <stop offset="1" stopColor="#A38FF9" />
        </linearGradient>
        <linearGradient
          id={`gradient2-${variant}`}
          x1="35%"
          y1="100%"
          x2="100%"
          y2="35%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B3BF4" />
          <stop offset="1" stopColor="#A38FF9" />
        </linearGradient>
        <linearGradient
          id={`gradient3-${variant}`}
          x1="40%"
          y1="100%"
          x2="100%"
          y2="40%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B3BF4" />
          <stop offset="1" stopColor="#A38FF9" />
        </linearGradient>
        <linearGradient
          id={`gradient4-${variant}`}
          x1="32%"
          y1="95%"
          x2="95%"
          y2="32%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B3BF4" />
          <stop offset="1" stopColor="#A38FF9" />
        </linearGradient>
        <linearGradient
          id={`gradient5-${variant}`}
          x1="25%"
          y1="90%"
          x2="90%"
          y2="25%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B3BF4" />
          <stop offset="1" stopColor="#A38FF9" />
        </linearGradient>
        <linearGradient
          id={`gradient6-${variant}`}
          x1="20%"
          y1="85%"
          x2="85%"
          y2="20%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B3BF4" />
          <stop offset="1" stopColor="#A38FF9" />
        </linearGradient>
      </defs>

      {/* Background shape - circle for light, rounded rect for dark */}
      {isDark ? (
        <rect
          x="5"
          y="5"
          width="190"
          height="190"
          rx="44"
          fill={bgColor}
        />
      ) : (
        <circle cx="100" cy="100" r="95" fill={bgColor} />
      )}

      {/*
        Logo shapes - 6 modular geometric pieces forming an abstract pattern
        Inspired by the original design with quarter circles and rounded rectangles
      */}

      {/* Shape 1: Bottom-left quarter circle */}
      <path
        ref={shape1Ref}
        d="M70.5 118.5H40.7C38.6 118.5 36.9 120.2 36.9 122.3C36.9 140.8 51.9 155.8 70.5 155.8C72.6 155.8 74.2 154.1 74.2 152V122.3C74.2 120.2 72.6 118.5 70.5 118.5Z"
        fill={`url(#gradient1-${variant})`}
      />

      {/* Shape 2: Bottom-center rectangle */}
      <path
        ref={shape2Ref}
        d="M115 103.5H85C82.9 103.5 81.2 105.2 81.2 107.3V152C81.2 154.1 82.9 155.8 85 155.8H115C117.1 155.8 118.8 154.1 118.8 152V107.3C118.8 105.2 117.1 103.5 115 103.5Z"
        fill={`url(#gradient2-${variant})`}
      />

      {/* Shape 3: Bottom-right large quarter circle */}
      <path
        ref={shape3Ref}
        d="M129.9 88.9C127.8 88.9 126.1 90.6 126.1 92.7V152C126.1 154.1 127.8 155.8 129.9 155.8C148.4 155.8 163.4 140.8 163.4 122.3C163.4 103.8 148.4 88.9 129.9 88.9Z"
        fill={`url(#gradient3-${variant})`}
      />

      {/* Shape 4: Top-right quarter circle */}
      <path
        ref={shape4Ref}
        d="M129.9 44.2C127.8 44.2 126.1 45.9 126.1 48V77.8C126.1 79.9 127.8 81.5 129.9 81.5H159.7C161.8 81.5 163.4 79.9 163.4 77.8C163.4 59.2 148.4 44.2 129.9 44.2Z"
        fill={`url(#gradient4-${variant})`}
      />

      {/* Shape 5: Top-center rectangle */}
      <path
        ref={shape5Ref}
        d="M115 44.2H85C82.9 44.2 81.2 45.9 81.2 48V92.7C81.2 94.8 82.9 96.5 85 96.5H115C117.1 96.5 118.8 94.8 118.8 92.7V48C118.8 45.9 117.1 44.2 115 44.2Z"
        fill={`url(#gradient5-${variant})`}
      />

      {/* Shape 6: Top-left full quarter circle */}
      <path
        ref={shape6Ref}
        d="M70.5 44.2C51.9 44.2 36.9 59.2 36.9 77.8C36.9 96.3 51.9 111.3 70.5 111.3C72.6 111.3 74.2 109.6 74.2 107.5V48C74.2 45.9 72.6 44.2 70.5 44.2Z"
        fill={`url(#gradient6-${variant})`}
      />
    </svg>
  );
}
