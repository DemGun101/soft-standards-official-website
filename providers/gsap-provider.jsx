"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

export function GSAPProvider({ children }) {
  useEffect(() => {
    // Refresh ScrollTrigger on mount and resize
    ScrollTrigger.refresh();

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      // Kill all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}

export { gsap, ScrollTrigger };
