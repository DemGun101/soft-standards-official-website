"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, slideStep, scalePop } from "@/lib/animations";
import type { DayAvailability, TimeSlot, BookingResponse } from "@/lib/booking-types";
import StepIndicator from "@/components/booking/step-indicator";
import CalendarGrid from "@/components/booking/calendar-grid";
import TimeSlots from "@/components/booking/time-slots";
import DetailsForm from "@/components/booking/details-form";

export default function Booking() {
  const now = new Date();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1);
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSlots = useCallback(async (year: number, month: number) => {
    setLoading(true);
    setError(null);
    const monthStr = `${year}-${String(month).padStart(2, "0")}`;
    try {
      const res = await fetch(`/api/booking/slots?month=${monthStr}`);
      if (!res.ok) throw new Error("Failed to load availability");
      const data = await res.json();
      setAvailability(data.days);
    } catch {
      setAvailability([]);
      setError("Could not load availability. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlots(currentYear, currentMonth);
  }, [currentYear, currentMonth, fetchSlots]);

  const nowMonth = now.getFullYear() * 12 + now.getMonth();
  const curMonth = currentYear * 12 + (currentMonth - 1);
  const canGoPrev = curMonth > nowMonth;
  const canGoNext = curMonth < nowMonth + 3;

  function goToPrevMonth() {
    if (!canGoPrev) return;
    if (currentMonth === 1) {
      setCurrentYear((y) => y - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDate(null);
  }

  function goToNextMonth() {
    if (!canGoNext) return;
    if (currentMonth === 12) {
      setCurrentYear((y) => y + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDate(null);
  }

  function goForward() {
    setDirection(1);
    setStep((s) => s + 1);
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => s - 1);
  }

  function handleSelectDate(date: string) {
    setSelectedDate(date);
    setSelectedSlot(null);
    goForward();
  }

  function handleSelectSlot(slot: TimeSlot) {
    setSelectedSlot(slot);
  }

  function handleBackToCalendar() {
    setSelectedSlot(null);
    goBack();
  }

  function handleBackToSlots() {
    goBack();
  }

  async function handleSubmit(data: {
    name: string;
    email: string;
    company: string;
    challenge: string;
  }) {
    if (!selectedSlot || !selectedDate) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          slot: selectedSlot,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });

      const result: BookingResponse = await res.json();

      if (!result.success) {
        setError(result.error || "Something went wrong.");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const selectedDayData = availability.find((d) => d.date === selectedDate);
  const slotsForDay = selectedDayData?.slots || [];

  return (
    <section id="booking" className="relative px-5 sm:px-8 py-32 md:py-40 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-[800px] text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="mb-4 text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.02em]"
          >
            30 minutes. No pitch.{" "}
            <span className="font-serif italic font-normal text-muted">
              Just strategy.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            className="mb-4 text-[16px] text-muted"
          >
            We&apos;ll learn about your business, show you what we&apos;d build,
            and map out next steps — whether you work with us or not.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.15}
            className="mb-14 flex items-center justify-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-[13px] font-medium text-muted">
              We take on a limited number of projects each month
            </span>
          </motion.div>
        </div>

        {/* Booking wizard card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
          className={`
            mx-auto max-w-[520px] overflow-hidden rounded-[24px]
            border-t border-border-subtle bg-card
            p-6 sm:p-8
            transition-all duration-500
            ${success
              ? "shadow-[0_0_80px_rgba(26,255,117,0.06)]"
              : "shadow-[0_0_60px_rgba(123,97,255,0.04)] hover:shadow-[0_0_80px_rgba(123,97,255,0.08)]"
            }
          `}
        >
          {success ? (
            <motion.div
              variants={scalePop}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center py-10 text-center"
            >
              {/* Animated check */}
              <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full bg-success/20 animate-ping" style={{ animationDuration: "2s" }} />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-success/10 shadow-[0_0_40px_rgba(26,255,117,0.2)]">
                  <motion.svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-success"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    />
                  </motion.svg>
                </div>
              </div>

              <h3 className="mb-2 text-[22px] font-bold text-foreground">
                You&apos;re booked!
              </h3>
              <p className="text-[15px] text-muted mb-4">
                {selectedDate &&
                  selectedSlot &&
                  (() => {
                    const [y, m, d] = selectedDate.split("-").map(Number);
                    const date = new Date(y, m - 1, d);
                    return `${date.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })} at ${selectedSlot.label} ET`;
                  })()}
              </p>

              {/* Info card */}
              <div className="w-full max-w-[320px] rounded-2xl border border-border-subtle bg-background/50 p-5">
                <div className="flex items-center gap-3 text-left">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-accent">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">We&apos;ll be in touch</p>
                    <p className="text-[12px] text-muted">Confirmation email coming shortly</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              <StepIndicator current={step} />

              {/* Error banner */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="overflow-hidden rounded-xl border border-danger/20 bg-danger/5 px-4 py-3 text-[13px] text-danger"
                  >
                    <span className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
                        <path d="M12 9v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {error}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait" custom={direction}>
                {step === 0 && (
                  <motion.div
                    key="step-0"
                    custom={direction}
                    variants={slideStep}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <CalendarGrid
                      year={currentYear}
                      month={currentMonth}
                      days={availability}
                      selectedDate={selectedDate}
                      loading={loading}
                      onSelectDate={handleSelectDate}
                      onPrevMonth={goToPrevMonth}
                      onNextMonth={goToNextMonth}
                      canGoPrev={canGoPrev}
                      canGoNext={canGoNext}
                    />
                  </motion.div>
                )}

                {step === 1 && selectedDate && (
                  <motion.div
                    key="step-1"
                    custom={direction}
                    variants={slideStep}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <TimeSlots
                      date={selectedDate}
                      slots={slotsForDay}
                      selectedSlot={selectedSlot}
                      onSelectSlot={handleSelectSlot}
                      onBack={handleBackToCalendar}
                      onContinue={goForward}
                    />
                  </motion.div>
                )}

                {step === 2 && selectedDate && selectedSlot && (
                  <motion.div
                    key="step-2"
                    custom={direction}
                    variants={slideStep}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <DetailsForm
                      date={selectedDate}
                      slot={selectedSlot}
                      submitting={submitting}
                      onBack={handleBackToSlots}
                      onSubmit={handleSubmit}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.3}
          className="mt-10 text-center text-[14px] text-muted"
        >
          Prefer email?{" "}
          <a
            href="mailto:contact@softstandardsinc.com"
            className="text-accent transition-colors duration-300 hover:text-accent-hover"
          >
            contact@softstandardsinc.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}
