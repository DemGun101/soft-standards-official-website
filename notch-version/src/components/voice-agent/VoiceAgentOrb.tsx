"use client";

import { useState, useEffect, useCallback } from "react";
import { useVoiceAgentContext } from "@/providers/VoiceAgentProvider";
import VoiceOrb3DCanvas from "./VoiceOrb3D";

export default function VoiceAgentOrb() {
  const {
    status,
    isOpen,
    audioLevel,
    frequencyData,
    open,
    close,
  } = useVoiceAgentContext();

  const [isMounted, setIsMounted] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);

  // Detect background color based on scroll position
  const detectBackground = useCallback(() => {
    const orbY = 60;
    const sections = document.querySelectorAll("section");

    for (const section of sections) {
      const rect = section.getBoundingClientRect();

      if (orbY >= rect.top && orbY <= rect.bottom) {
        const computedStyle = window.getComputedStyle(section);
        const bgColor = computedStyle.backgroundColor;

        const match = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
          const r = parseInt(match[1]);
          const g = parseInt(match[2]);
          const b = parseInt(match[3]);
          const luminance = (r * 299 + g * 587 + b * 114) / 1000;
          setIsOverDark(luminance < 128);
          return;
        }

        const isDark = section.classList.contains("bg-gray-900") ||
                      section.classList.contains("bg-black") ||
                      section.classList.contains("dark");
        setIsOverDark(isDark);
        return;
      }
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    detectBackground();
    window.addEventListener("scroll", detectBackground, { passive: true });
    return () => {
      window.removeEventListener("scroll", detectBackground);
    };
  }, [detectBackground]);

  if (!isMounted) {
    return null;
  }

  const handleClick = () => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  };

  return (
    <div className="fixed top-6 left-6 z-50">
      <div onClick={handleClick} className="cursor-pointer">
        <VoiceOrb3DCanvas
          status={status}
          audioLevel={audioLevel}
          frequencyData={frequencyData}
          size={150}
          isOverDark={isOverDark}
        />
      </div>
    </div>
  );
}
