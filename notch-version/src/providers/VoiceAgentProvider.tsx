"use client";

import { createContext, useContext, ReactNode } from "react";
import { useVoiceAgent } from "@/hooks/useVoiceAgent";
import { useScrollContext, SectionInfo } from "@/hooks/useScrollContext";
import { VoiceAgentStatus, ConversationMessage } from "@/lib/voice-agent-config";

interface VoiceAgentContextType {
  // State
  status: VoiceAgentStatus;
  isOpen: boolean;
  conversation: ConversationMessage[];
  currentTranscript: string;
  currentResponse: string;
  error: string | null;
  audioLevel: number;
  frequencyData: Uint8Array;
  isSupported: boolean;

  // Scroll context
  currentSection: SectionInfo | null;
  visibleSections: SectionInfo[];
  scrollToSection: (sectionId: string) => void;

  // Actions
  open: () => void;
  close: () => void;
  startListening: () => void;
  stopListening: () => void;
  sendMessage: (text: string) => Promise<void>;
  clearConversation: () => void;
}

const VoiceAgentContext = createContext<VoiceAgentContextType | null>(null);

export function VoiceAgentProvider({ children }: { children: ReactNode }) {
  const scrollContext = useScrollContext();
  const voiceAgent = useVoiceAgent(scrollContext);

  const value: VoiceAgentContextType = {
    ...voiceAgent,
    currentSection: scrollContext.currentSection,
    visibleSections: scrollContext.visibleSections,
    scrollToSection: scrollContext.scrollToSection,
  };

  return (
    <VoiceAgentContext.Provider value={value}>
      {children}
    </VoiceAgentContext.Provider>
  );
}

export function useVoiceAgentContext(): VoiceAgentContextType {
  const context = useContext(VoiceAgentContext);
  if (!context) {
    throw new Error(
      "useVoiceAgentContext must be used within a VoiceAgentProvider"
    );
  }
  return context;
}
