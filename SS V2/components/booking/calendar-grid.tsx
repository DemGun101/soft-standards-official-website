"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { DayAvailability } from "@/lib/booking-types";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface CalendarGridProps {
  year: number;
  month: number;
  days: DayAvailability[];
  selectedDate: string | null;
  loading: boolean;
  onSelectDate: (date: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export default function CalendarGrid({
  year,
  month,
  days,
  selectedDate,
  loading,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  canGoPrev,
  canGoNext,
}: CalendarGridProps) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const cells: (DayAvailability | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const dayData = days.find((day) => day.date === dateStr);
    cells.push(dayData || { date: dateStr, available: false, slots: [] });
  }

  return (
    <div>
      {/* Month header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onPrevMonth}
          disabled={!canGoPrev}
          className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle transition-all duration-200 hover:border-accent/40 hover:bg-accent/5 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:border-border-subtle disabled:hover:bg-transparent"
          aria-label="Previous month"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="transition-transform duration-200 group-hover:-translate-x-0.5">
            <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <AnimatePresence mode="wait">
          <motion.h3
            key={`${year}-${month}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="text-[17px] font-bold tracking-tight text-foreground"
          >
            {MONTH_NAMES[month - 1]}{" "}
            <span className="font-serif italic font-normal text-muted">{year}</span>
          </motion.h3>
        </AnimatePresence>

        <button
          onClick={onNextMonth}
          disabled={!canGoNext}
          className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle transition-all duration-200 hover:border-accent/40 hover:bg-accent/5 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:border-border-subtle disabled:hover:bg-transparent"
          aria-label="Next month"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
            <path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid mb-1" style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-[11px] font-semibold tracking-wider text-muted/60 uppercase py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Separator */}
      <div className="mb-2 h-px bg-border-subtle" />

      {/* Day cells */}
      {loading ? (
        <div className="grid gap-y-1" style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="flex items-center justify-center py-1">
              <div className="h-11 w-11 rounded-xl bg-border-subtle/50 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid gap-y-1" style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}
        >
          {cells.map((cell, i) => {
            if (!cell) {
              return <div key={`blank-${i}`} className="py-1" />;
            }

            const dayNum = parseInt(cell.date.split("-")[2], 10);
            const isSelected = cell.date === selectedDate;
            const isAvailable = cell.available;
            const isToday = cell.date === todayStr;

            return (
              <div key={cell.date} className="flex items-center justify-center py-1">
                <motion.button
                  whileHover={isAvailable && !isSelected ? { scale: 1.1 } : undefined}
                  whileTap={isAvailable ? { scale: 0.9 } : undefined}
                  onClick={() => isAvailable && onSelectDate(cell.date)}
                  disabled={!isAvailable}
                  className={`
                    relative flex h-11 w-11 items-center justify-center rounded-xl
                    text-[13px] font-semibold transition-all duration-200
                    ${isSelected
                      ? "bg-accent text-white shadow-[0_0_20px_rgba(123,97,255,0.4)]"
                      : isAvailable
                        ? "text-foreground hover:bg-accent/10 cursor-pointer"
                        : "text-muted/25 cursor-not-allowed"
                    }
                    ${isToday && !isSelected ? "ring-1 ring-accent/30" : ""}
                  `}
                  aria-label={`${cell.date}${isAvailable ? ", available" : ", unavailable"}`}
                >
                  {dayNum}

                  {/* Availability indicator */}
                  {isAvailable && !isSelected && (
                    <span className="absolute bottom-[5px] left-1/2 -translate-x-1/2 h-[3px] w-[3px] rounded-full bg-accent" />
                  )}

                  {/* Today indicator */}
                  {isToday && !isSelected && !isAvailable && (
                    <span className="absolute bottom-[5px] left-1/2 -translate-x-1/2 h-[3px] w-[3px] rounded-full bg-muted/40" />
                  )}
                </motion.button>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* Footer */}
      <div className="mt-5 flex items-center justify-center gap-5 text-[11px] text-muted/60">
        <span className="flex items-center gap-1.5">
          <span className="h-[5px] w-[5px] rounded-full bg-accent" />
          Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-[5px] w-[5px] rounded-full ring-1 ring-accent/30" />
          Today
        </span>
        <span className="tracking-wide">Eastern Time</span>
      </div>
    </div>
  );
}
