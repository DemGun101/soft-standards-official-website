"use client";

import { useState, useEffect } from "react";
import { useVoiceAgentContext } from "@/providers/VoiceAgentProvider";
import VoiceOrbCanvas from "./VoiceOrbCanvas";
import TranscriptOverlay from "./TranscriptOverlay";
import TextInputFallback from "./TextInputFallback";

export default function VoiceAgentOrb() {
  const {
    status,
    isOpen,
    currentTranscript,
    currentResponse,
    error,
    audioLevel,
    frequencyData,
    isSupported,
    open,
    close,
    sendMessage,
  } = useVoiceAgentContext();

  const [isMounted, setIsMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Get status text for display
  const getStatusText = () => {
    switch (status) {
      case "idle":
        return "Click to start";
      case "listening":
        return "Listening... speak now";
      case "processing":
        return "Thinking...";
      case "speaking":
        return "";
      case "error":
        return error || "Something went wrong";
      default:
        return "";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90 backdrop-blur-xl">
      {/* Close button */}
      {isOpen && (
        <button
          onClick={close}
          className="absolute top-6 right-6 p-3 text-gray-400 hover:text-white transition-colors"
          aria-label="Close voice agent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      <div className="flex flex-col items-center gap-8 max-w-lg w-full px-6">
        {/* Orb */}
        <div
          onClick={() => {
            if (!isOpen) {
              open();
            }
          }}
          className="relative"
        >
          <VoiceOrbCanvas
            status={status}
            audioLevel={audioLevel}
            frequencyData={frequencyData}
            size={200}
          />

          {/* Microphone indicator */}
          {status === "listening" && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
              <div className="flex gap-1">
                <span className="w-1 h-4 bg-red-500 rounded-full animate-pulse" />
                <span className="w-1 h-4 bg-red-500 rounded-full animate-pulse delay-75" />
                <span className="w-1 h-4 bg-red-500 rounded-full animate-pulse delay-150" />
              </div>
            </div>
          )}
        </div>

        {/* Status text */}
        <p
          className={`text-center text-lg font-medium transition-colors ${
            status === "error" ? "text-red-400" : "text-gray-300"
          }`}
        >
          {getStatusText()}
        </p>

        {/* Transcript overlay */}
        <TranscriptOverlay
          transcript={currentTranscript}
          response={currentResponse}
          status={status}
        />

        {/* Text input fallback */}
        {!isSupported && (
          <TextInputFallback onSubmit={sendMessage} status={status} />
        )}

        {/* Manual text input option */}
        {isSupported && isOpen && status === "idle" && (
          <TextInputFallback onSubmit={sendMessage} status={status} />
        )}
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
