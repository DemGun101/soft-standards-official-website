"use client";

import { useVoiceAgentContext } from "@/providers/VoiceAgentProvider";

export default function VoiceAgentTrigger() {
  const { isOpen, open, status } = useVoiceAgentContext();

  console.log("[VoiceAgentTrigger] isOpen:", isOpen, "status:", status);

  const handleClick = () => {
    console.log("[VoiceAgentTrigger] clicked, calling open()");
    open();
  };

  if (isOpen) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Open voice assistant"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-purple-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />

      {/* Button */}
      <div
        className="relative w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full
        flex items-center justify-center shadow-lg shadow-purple-500/30
        hover:shadow-xl hover:shadow-purple-500/40 hover:scale-110
        transition-all duration-300"
      >
        {/* Microphone icon */}
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
          className="text-white"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      </div>

      {/* Tooltip */}
      <div
        className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-sm
        rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap
        pointer-events-none"
      >
        Talk to AI Assistant
        <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-900" />
      </div>

      {/* Pulse animation when idle */}
      <div className="absolute inset-0 rounded-full border-2 border-purple-400 animate-ping opacity-30" />
    </button>
  );
}
