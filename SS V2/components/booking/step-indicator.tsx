"use client";

import { motion } from "framer-motion";

const STEPS = [
  { label: "Date", icon: "M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" },
  { label: "Time", icon: "M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" },
  { label: "Details", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
] as const;

interface StepIndicatorProps {
  current: number;
}

export default function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((step, i) => {
        const isActive = i === current;
        const isCompleted = i < current;
        const isUpcoming = i > current;

        return (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              {/* Circle with icon */}
              <motion.div
                animate={{
                  scale: isActive ? 1 : 0.85,
                  opacity: isUpcoming ? 0.4 : 1,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className={`
                  relative flex h-10 w-10 items-center justify-center rounded-full
                  transition-colors duration-300
                  ${isActive
                    ? "bg-accent shadow-[0_0_20px_rgba(123,97,255,0.35)]"
                    : isCompleted
                      ? "bg-accent/20"
                      : "bg-border-subtle"
                  }
                `}
              >
                {isCompleted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-accent">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={isActive ? "text-white" : "text-muted"}
                  >
                    <path d={step.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </motion.div>

              <span
                className={`text-[11px] font-semibold tracking-wide uppercase transition-colors duration-300 ${
                  isActive ? "text-accent" : isCompleted ? "text-foreground" : "text-muted/50"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {i < STEPS.length - 1 && (
              <div className="relative mx-4 h-[2px] w-16 -translate-y-[13px] overflow-hidden rounded-full bg-border-subtle">
                <motion.div
                  initial={false}
                  animate={{ scaleX: isCompleted ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  className="absolute inset-0 origin-left bg-accent"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
