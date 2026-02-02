"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { VoiceAgentStatus } from "@/lib/voice-agent-config";

interface TranscriptOverlayProps {
  transcript: string;
  response: string;
  status: VoiceAgentStatus;
}

export default function TranscriptOverlay({
  transcript,
  response,
  status,
}: TranscriptOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  // Animate transcript appearance
  useEffect(() => {
    if (transcript && transcriptRef.current) {
      gsap.fromTo(
        transcriptRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [transcript]);

  // Animate response appearance
  useEffect(() => {
    if (response && responseRef.current) {
      gsap.fromTo(
        responseRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [response]);

  // Don't show if nothing to display
  if (!transcript && !response && status !== "listening") {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="w-full max-w-md mx-auto space-y-4 text-center"
    >
      {/* User transcript */}
      {transcript && (
        <div ref={transcriptRef} className="space-y-1">
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            You
          </span>
          <p className="text-gray-300 text-lg">{transcript}</p>
        </div>
      )}

      {/* AI response */}
      {response && (
        <div ref={responseRef} className="space-y-1">
          <span className="text-xs text-purple-400 uppercase tracking-wider">
            Soft Standards AI
          </span>
          <p className="text-white text-lg leading-relaxed">{response}</p>
        </div>
      )}

      {/* Listening indicator */}
      {status === "listening" && !transcript && (
        <p className="text-gray-500 text-sm animate-pulse">
          Listening for your voice...
        </p>
      )}
    </div>
  );
}
