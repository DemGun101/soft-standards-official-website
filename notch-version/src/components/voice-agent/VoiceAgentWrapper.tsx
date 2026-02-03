"use client";

import { useEffect } from "react";
import { VoiceAgentProvider } from "@/providers/VoiceAgentProvider";
import { VoiceAgentOrb, VoiceAgentTrigger } from "./index";
import { useVoiceAgentContext } from "@/providers/VoiceAgentProvider";

function VoiceAgentUI() {
  const { isOpen, status, error } = useVoiceAgentContext();

  useEffect(() => {
    console.log("[VoiceAgentUI] state changed - isOpen:", isOpen, "status:", status, "error:", error);
    if (error) {
      console.error("[VoiceAgentUI] ERROR:", error);
    }
  }, [isOpen, status, error]);

  return (
    <>
      <VoiceAgentTrigger />
      {isOpen && <VoiceAgentOrb />}
    </>
  );
}

export default function VoiceAgentWrapper() {
  console.log("[VoiceAgentWrapper] rendering");
  return (
    <VoiceAgentProvider>
      <VoiceAgentUI />
    </VoiceAgentProvider>
  );
}
