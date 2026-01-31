'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SoftStandardsLogoIconProps {
  className?: string;
  autoPlay?: boolean;
  hoverEffect?: boolean;
}

export default function SoftStandardsLogoIcon({
  className = '',
  autoPlay = true,
  hoverEffect = true
}: SoftStandardsLogoIconProps) {
  const logoRef = useRef<SVGSVGElement>(null);
  const shape1Ref = useRef<SVGPathElement>(null);
  const shape2Ref = useRef<SVGPathElement>(null);
  const shape3Ref = useRef<SVGPathElement>(null);
  const shape4Ref = useRef<SVGPathElement>(null);
  const shape5Ref = useRef<SVGPathElement>(null);
  const shape6Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!autoPlay || !logoRef.current) return;

    const shapes = [
      shape1Ref.current,
      shape2Ref.current,
      shape3Ref.current,
      shape4Ref.current,
      shape5Ref.current,
      shape6Ref.current,
    ].filter(Boolean);

    // Set initial state
    gsap.set(shapes, {
      opacity: 0,
      scale: 0.5,
      transformOrigin: 'center center',
    });

    // Create main timeline
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });

    // Animate shapes in sequence with overlap
    tl.to(shape1Ref.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    }, 0)
      .to(shape6Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      }, 0.1)
      .to(shape2Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      }, 0.2)
      .to(shape5Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      }, 0.3)
      .to(shape3Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      }, 0.4)
      .to(shape4Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      }, 0.5);

    // Add subtle rotation animation on hover
    const handleMouseEnter = () => {
      if (!hoverEffect) return;
      gsap.to(shapes, {
        rotation: 5,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.out',
        transformOrigin: 'center center',
      });
    };

    const handleMouseLeave = () => {
      if (!hoverEffect) return;
      gsap.to(shapes, {
        rotation: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.out',
      });
    };

    const logo = logoRef.current;
    logo.addEventListener('mouseenter', handleMouseEnter);
    logo.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      logo.removeEventListener('mouseenter', handleMouseEnter);
      logo.removeEventListener('mouseleave', handleMouseLeave);
      tl.kill();
    };
  }, [autoPlay, hoverEffect]);

  return (
    <svg
      ref={logoRef}
      viewBox="368 442 1265 1116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ cursor: hoverEffect ? 'pointer' : 'default' }}
    >
      <defs>
        {/* Individual gradients for each shape */}
        <linearGradient
          id="navGradient1"
          x1="398.377"
          y1="1506.57"
          x2="1566.19"
          y2="497.932"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B3BF4" />
          <stop offset="1" stopColor="#A38FF9" />
        </linearGradient>

        <linearGradient
          id="navGradient2"
          x1="552.338"
          y1="1684.79"
          x2="1720.15"
          y2="676.151"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B3BF4" />
          <stop offset="1" stopColor="#A38FF9" />
        </linearGradient>

        <linearGradient
          id="navGradient3"
          x1="666.387"
          y1="1816.79"
          x2="1834.2"
          y2="808.152"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B3BF4" />
          <stop offset="1" stopColor="#A38FF9" />
        </linearGradient>

        <linearGradient
          id="navGradient4"
          x1="411.887"
          y1="1522.22"
          x2="1579.7"
          y2="513.433"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B3BF4" />
          <stop offset="1" stopColor="#A38FF9" />
        </linearGradient>

        <linearGradient
          id="navGradient5"
          x1="257.928"
          y1="1344.01"
          x2="1425.74"
          y2="335.221"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B3BF4" />
          <stop offset="1" stopColor="#A38FF9" />
        </linearGradient>

        <linearGradient
          id="navGradient6"
          x1="143.877"
          y1="1212"
          x2="1311.69"
          y2="203.213"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B3BF4" />
          <stop offset="1" stopColor="#A38FF9" />
        </linearGradient>
      </defs>

      {/* Shape 1: Bottom-left quarter circle */}
      <path
        ref={shape1Ref}
        d="M703.071 1186.06H405.438C384.869 1186.06 368.291 1202.64 368.291 1223.21C368.291 1408.18 518.105 1557.99 703.071 1557.99C723.639 1557.99 740.217 1541.41 740.217 1520.84V1223.21C740.217 1202.64 723.639 1186.06 703.071 1186.06Z"
        fill="url(#navGradient1)"
      />

      {/* Shape 2: Middle rectangle */}
      <path
        ref={shape2Ref}
        d="M1149.45 1037.18H851.813C831.297 1037.18 814.666 1053.81 814.666 1074.33V1520.85C814.666 1541.37 831.297 1558 851.813 1558H1149.45C1169.96 1558 1186.59 1541.37 1186.59 1520.85V1074.33C1186.59 1053.81 1169.96 1037.18 1149.45 1037.18Z"
        fill="url(#navGradient2)"
      />

      {/* Shape 3: Right quarter circle */}
      <path
        ref={shape3Ref}
        d="M1298.19 888.432C1277.62 888.432 1261.04 905.01 1261.04 925.578V1520.69C1261.04 1541.26 1277.62 1557.84 1298.19 1557.84C1483.15 1557.84 1632.97 1408.02 1632.97 1223.06C1632.97 1038.09 1483.15 888.278 1298.19 888.278V888.432Z"
        fill="url(#navGradient3)"
      />

      {/* Shape 4: Top-right quarter circle */}
      <path
        ref={shape4Ref}
        d="M1298.19 442.056C1277.62 442.056 1261.04 458.634 1261.04 479.203V776.836C1261.04 797.405 1277.62 813.982 1298.19 813.982H1595.82C1616.39 813.982 1632.97 797.405 1632.97 776.836C1632.97 591.87 1483.15 442.056 1298.19 442.056Z"
        fill="url(#navGradient4)"
      />

      {/* Shape 5: Top-middle rectangle */}
      <path
        ref={shape5Ref}
        d="M1149.45 442.056H851.813C831.297 442.056 814.666 458.687 814.666 479.203V925.729C814.666 946.244 831.297 962.875 851.813 962.875H1149.45C1169.96 962.875 1186.59 946.244 1186.59 925.729V479.203C1186.59 458.687 1169.96 442.056 1149.45 442.056Z"
        fill="url(#navGradient5)"
      />

      {/* Shape 6: Left quarter circle */}
      <path
        ref={shape6Ref}
        d="M703.071 442.056C518.105 442.056 368.291 591.87 368.291 776.836C368.291 961.801 518.105 1111.62 703.071 1111.62C723.639 1111.62 740.217 1095.04 740.217 1074.47V479.203C740.217 458.634 723.639 442.056 703.071 442.056Z"
        fill="url(#navGradient6)"
      />
    </svg>
  );
}
