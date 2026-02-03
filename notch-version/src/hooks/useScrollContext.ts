"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface SectionInfo {
  id: string;
  name: string;
  description: string;
  talkingPoints: string[];
}

export const homepageSections: SectionInfo[] = [
  {
    id: "hero",
    name: "Hero",
    description: "Brand introduction and value proposition",
    talkingPoints: [
      "Marketing machines that work while you sleep",
      "30-day done-for-you system",
      "Pay only if it works guarantee",
      "$47M+ in tracked client revenue",
    ],
  },
  {
    id: "story",
    name: "Problem",
    description: "Customer pain points and marketing challenges",
    talkingPoints: [
      "Random tactics don't work",
      "Agencies with excuses",
      "Content that gets likes but not sales",
      "Burning cash on ads without results",
    ],
  },
  {
    id: "vision",
    name: "Vision",
    description: "What success looks like with Soft Standards",
    talkingPoints: [
      "Wake up to qualified leads",
      "Calendar booked with buyers",
      "Brand clarity that sells",
      "Revenue machine vs random marketing",
    ],
  },
  {
    id: "process",
    name: "Process",
    description: "4-week implementation timeline",
    talkingPoints: [
      "Week 1: Extract - strategy document",
      "Week 2: Build - website + automation",
      "Week 3: Launch - ads and lead flow",
      "Week 4: Optimize - data-driven refinement",
    ],
  },
  {
    id: "receipts",
    name: "Results",
    description: "Social proof and metrics",
    talkingPoints: [
      "$47M+ client revenue generated",
      "312% average ROI in 90 days",
      "67% average drop in cost per lead",
      "97% client retention rate",
    ],
  },
  {
    id: "testimonials",
    name: "Testimonials",
    description: "Customer success stories",
    talkingPoints: [
      "James Thornton: $12K to $89K/month in 90 days",
      "Rachel Kim: 67% drop in cost per lead",
      "Daniel Porter: First working marketing system in 8 years",
      "Sarah Lin: 4.2x conversion rate increase",
    ],
  },
  {
    id: "contact",
    name: "Call to Action",
    description: "Book a consultation",
    talkingPoints: [
      "Free 15-minute growth audit",
      "No pitch, no pressure, just clarity",
      "Limited to 4 new clients per month",
      "Two paths: keep doing what you're doing or build a system",
    ],
  },
];

interface ScrollContextHook {
  currentSection: SectionInfo | null;
  visibleSections: SectionInfo[];
  scrollToSection: (sectionId: string) => void;
}

export function useScrollContext(): ScrollContextHook {
  const [currentSection, setCurrentSection] = useState<SectionInfo | null>(null);
  const [visibleSections, setVisibleSections] = useState<SectionInfo[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionElements = new Map<Element, SectionInfo>();

    // Create observer with threshold that detects visibility
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible: SectionInfo[] = [];
        let mostVisibleSection: SectionInfo | null = null;
        let highestRatio = 0;

        entries.forEach((entry) => {
          const sectionInfo = sectionElements.get(entry.target);
          if (!sectionInfo) return;

          if (entry.isIntersecting) {
            visible.push(sectionInfo);

            // Track the most visible section (highest intersection ratio)
            if (entry.intersectionRatio > highestRatio) {
              mostVisibleSection = sectionInfo;
              highestRatio = entry.intersectionRatio;
            }
          }
        });

        // Update visible sections
        if (visible.length > 0) {
          setVisibleSections(visible);
        }

        // Update current section based on most visible
        if (mostVisibleSection) {
          setCurrentSection(mostVisibleSection);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    // Find and observe sections
    homepageSections.forEach((sectionInfo) => {
      // Try finding by id first, then by data attribute
      let element = document.getElementById(sectionInfo.id);
      if (!element) {
        element = document.querySelector(`[data-section="${sectionInfo.id}"]`);
      }

      if (element && observerRef.current) {
        sectionElements.set(element, sectionInfo);
        observerRef.current.observe(element);
      }
    });

    // Set initial section to hero if on homepage
    if (window.location.pathname === "/") {
      setCurrentSection(homepageSections[0]);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element =
      document.getElementById(sectionId) ||
      document.querySelector(`[data-section="${sectionId}"]`);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return {
    currentSection,
    visibleSections,
    scrollToSection,
  };
}
