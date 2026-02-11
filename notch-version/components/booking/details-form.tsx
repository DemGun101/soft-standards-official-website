"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TimeSlot } from "@/lib/booking-types";

interface DetailsFormProps {
  date: string;
  slot: TimeSlot;
  submitting: boolean;
  onBack: () => void;
  onSubmit: (data: { name: string; email: string; company: string; challenge: string }) => void;
}

function formatConfirmationLine(dateStr: string, slot: TimeSlot): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const datePart = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return `${datePart} at ${slot.label} ET`;
}

const fields = [
  { key: "name", type: "text", label: "Full name", required: true, icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { key: "email", type: "email", label: "Email address", required: true, icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { key: "company", type: "text", label: "Company", required: false, icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
] as const;

export default function DetailsForm({
  date,
  slot,
  submitting,
  onBack,
  onSubmit,
}: DetailsFormProps) {
  const [values, setValues] = useState({ name: "", email: "", company: "", challenge: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Required";
    if (!values.email.trim()) {
      next.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Invalid email";
    }
    if (!values.challenge.trim()) next.challenge = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate() || submitting) return;
    onSubmit({
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim(),
      challenge: values.challenge.trim(),
    });
  }

  function updateField(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => { const next = { ...e }; delete next[key]; return next; });
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <button
          type="button"
          onClick={onBack}
          className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle transition-all duration-200 hover:border-accent/40 hover:bg-accent/5"
          aria-label="Back to time selection"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="transition-transform duration-200 group-hover:-translate-x-0.5">
            <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h3 className="text-[17px] font-bold tracking-tight text-foreground">
          Almost there
        </h3>
      </div>

      {/* Date/time confirmation chip */}
      <div className="mb-7 ml-[52px]">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3.5 py-1.5 text-[12px] font-semibold text-accent">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {formatConfirmationLine(date, slot)}
        </span>
      </div>

      <div className="space-y-3">
        {/* Text inputs with icons */}
        {fields.map((field) => (
          <div key={field.key}>
            <div
              className={`
                group flex items-center gap-3 rounded-xl border px-4 py-3
                transition-all duration-200
                ${focused === field.key
                  ? "border-accent bg-accent/[0.03] shadow-[0_0_0_3px_rgba(123,97,255,0.1)]"
                  : errors[field.key]
                    ? "border-danger/40 bg-danger/[0.02]"
                    : "border-border-subtle hover:border-accent/20"
                }
              `}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className={`shrink-0 transition-colors duration-200 ${
                  focused === field.key ? "text-accent" : "text-muted/40"
                }`}
              >
                <path d={field.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                type={field.type}
                placeholder={`${field.label}${field.required ? "" : " (optional)"}`}
                value={values[field.key as keyof typeof values]}
                onChange={(e) => updateField(field.key, e.target.value)}
                onFocus={() => setFocused(field.key)}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent text-[14px] text-foreground placeholder:text-muted/40 outline-none"
                aria-invalid={!!errors[field.key]}
              />
            </div>
            <AnimatePresence>
              {errors[field.key] && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1 text-[11px] font-medium text-danger pl-4 overflow-hidden"
                >
                  {errors[field.key]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Challenge textarea */}
        <div>
          <div
            className={`
              rounded-xl border px-4 py-3
              transition-all duration-200
              ${focused === "challenge"
                ? "border-accent bg-accent/[0.03] shadow-[0_0_0_3px_rgba(123,97,255,0.1)]"
                : errors.challenge
                  ? "border-danger/40 bg-danger/[0.02]"
                  : "border-border-subtle hover:border-accent/20"
              }
            `}
          >
            <div className="flex items-start gap-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className={`shrink-0 mt-0.5 transition-colors duration-200 ${
                  focused === "challenge" ? "text-accent" : "text-muted/40"
                }`}
              >
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <textarea
                placeholder="What's your biggest marketing challenge?"
                value={values.challenge}
                onChange={(e) => updateField("challenge", e.target.value)}
                onFocus={() => setFocused("challenge")}
                onBlur={() => setFocused(null)}
                rows={3}
                className="w-full bg-transparent text-[14px] text-foreground placeholder:text-muted/40 outline-none resize-none"
                aria-invalid={!!errors.challenge}
              />
            </div>
          </div>
          <AnimatePresence>
            {errors.challenge && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1 text-[11px] font-medium text-danger pl-4 overflow-hidden"
              >
                {errors.challenge}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={submitting}
        whileHover={!submitting ? { scale: 1.01 } : undefined}
        whileTap={!submitting ? { scale: 0.98 } : undefined}
        className="mt-6 w-full rounded-[50px] bg-accent py-4 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_40px_rgba(123,97,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
      >
        {submitting ? (
          <span className="flex items-center justify-center gap-2.5">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-80" />
            </svg>
            Confirming your booking...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Confirm Booking
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </motion.button>

      <p className="mt-4 text-center text-[11px] text-muted/50">
        We&apos;ll confirm your booking via email
      </p>
    </form>
  );
}
