"use client";

import { VoiceAgentProvider } from "@/providers/VoiceAgentProvider";
import { VoiceAgentOrb, VoiceAgentTrigger } from "./index";
import { useVoiceAgentContext } from "@/providers/VoiceAgentProvider";

function VoiceAgentUI() {
  const { isOpen } = useVoiceAgentContext();

  return (
    <>
      <VoiceAgentTrigger />
      {isOpen && <VoiceAgentOrb />}
    </>
  );
}

export default function VoiceAgentWrapper() {
  return (
    <VoiceAgentProvider>
      <VoiceAgentUI />
    </VoiceAgentProvider>
  );
}
