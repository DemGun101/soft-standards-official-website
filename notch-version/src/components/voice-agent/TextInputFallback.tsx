"use client";

import { useState, FormEvent, KeyboardEvent } from "react";
import { VoiceAgentStatus } from "@/lib/voice-agent-config";

interface TextInputFallbackProps {
  onSubmit: (text: string) => Promise<void>;
  status: VoiceAgentStatus;
}

export default function TextInputFallback({
  onSubmit,
  status,
}: TextInputFallbackProps) {
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDisabled =
    isSubmitting || status === "processing" || status === "speaking";

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || isDisabled) return;

    setIsSubmitting(true);
    try {
      await onSubmit(trimmedInput);
      setInput("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={isDisabled}
          className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-full
            text-white placeholder-gray-500 focus:outline-none focus:border-purple-500
            focus:ring-2 focus:ring-purple-500/20 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isDisabled || !input.trim()}
          className="px-6 py-3 bg-purple-500 text-white rounded-full font-medium
            hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50
            transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <svg
              className="w-5 h-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </div>

      <p className="text-center text-gray-600 text-xs mt-3">
        Or type your message if voice isn&apos;t working
      </p>
    </form>
  );
}
