"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import type { TimeSlot } from "@/lib/booking-types";

interface TimeSlotsProps {
  date: string;
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
  onBack: () => void;
  onContinue: () => void;
}

function formatDateHeading(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function TimeSlots({
  date,
  slots,
  selectedSlot,
  onSelectSlot,
  onBack,
  onContinue,
}: TimeSlotsProps) {
  // Group slots by morning (before 12) and afternoon (12+)
  const morning = slots.filter((s) => {
    const hour = new Date(s.start).getHours();
    return hour < 12;
  });
  const afternoon = slots.filter((s) => {
    const hour = new Date(s.start).getHours();
    return hour >= 12;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <button
          onClick={onBack}
          className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle transition-all duration-200 hover:border-accent/40 hover:bg-accent/5"
          aria-label="Back to calendar"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="transition-transform duration-200 group-hover:-translate-x-0.5">
            <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div>
          <h3 className="text-[17px] font-bold tracking-tight text-foreground">
            Pick a time
          </h3>
        </div>
      </div>
      <p className="mb-6 ml-[52px] text-[13px] text-muted font-serif italic">
        {formatDateHeading(date)}
      </p>

      {slots.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-border-subtle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-muted">
              <path d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[14px] text-muted">No slots available</p>
          <p className="text-[12px] text-muted/60 mt-1">Try a different day</p>
        </div>
      ) : (
        <>
          {/* Morning slots */}
          {morning.length > 0 && (
            <div className="mb-5">
              <p className="mb-2.5 text-[11px] font-semibold tracking-wider text-muted/60 uppercase">
                Morning
              </p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-2" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
              >
                {morning.map((slot, i) => {
                  const isSelected =
                    selectedSlot?.start === slot.start &&
                    selectedSlot?.end === slot.end;

                  return (
                    <motion.button
                      key={slot.start}
                      variants={fadeUp}
                      custom={i * 0.04}
                      whileHover={!isSelected ? { scale: 1.03 } : undefined}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onSelectSlot(slot)}
                      className={`
                        rounded-xl border py-3 text-[13px] font-semibold
                        transition-all duration-200
                        ${isSelected
                          ? "border-accent bg-accent text-white shadow-[0_0_20px_rgba(123,97,255,0.3)]"
                          : "border-border-subtle text-foreground hover:border-accent/40 hover:bg-accent/5"
                        }
                      `}
                    >
                      {slot.label}
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          )}

          {/* Afternoon slots */}
          {afternoon.length > 0 && (
            <div>
              <p className="mb-2.5 text-[11px] font-semibold tracking-wider text-muted/60 uppercase">
                Afternoon
              </p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-2" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
              >
                {afternoon.map((slot, i) => {
                  const isSelected =
                    selectedSlot?.start === slot.start &&
                    selectedSlot?.end === slot.end;

                  return (
                    <motion.button
                      key={slot.start}
                      variants={fadeUp}
                      custom={i * 0.04}
                      whileHover={!isSelected ? { scale: 1.03 } : undefined}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onSelectSlot(slot)}
                      className={`
                        rounded-xl border py-3 text-[13px] font-semibold
                        transition-all duration-200
                        ${isSelected
                          ? "border-accent bg-accent text-white shadow-[0_0_20px_rgba(123,97,255,0.3)]"
                          : "border-border-subtle text-foreground hover:border-accent/40 hover:bg-accent/5"
                        }
                      `}
                    >
                      {slot.label}
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          )}
        </>
      )}

      {/* Continue */}
      {selectedSlot && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-7"
        >
          <button
            onClick={onContinue}
            className="group w-full rounded-[50px] bg-accent py-3.5 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_30px_rgba(123,97,255,0.3)]"
          >
            <span className="flex items-center justify-center gap-2">
              Continue
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
