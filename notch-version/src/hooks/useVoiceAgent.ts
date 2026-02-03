"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { useAudioPlayback } from "./useAudioPlayback";
import { useAudioAnalyzer } from "./useAudioAnalyzer";
import { SectionInfo } from "./useScrollContext";
import { ScrollContext } from "@/data/voice-agent-context";
import {
  VoiceAgentStatus,
  ConversationMessage,
  VoiceCommand,
  voiceAgentConfig,
} from "@/lib/voice-agent-config";

interface VoiceAgentHook {
  status: VoiceAgentStatus;
  isOpen: boolean;
  conversation: ConversationMessage[];
  currentTranscript: string;
  currentResponse: string;
  error: string | null;
  audioLevel: number;
  frequencyData: Uint8Array;
  isSupported: boolean;
  open: () => void;
  close: () => void;
  startListening: () => void;
  stopListening: () => void;
  sendMessage: (text: string) => Promise<void>;
  clearConversation: () => void;
}

interface ScrollContextInput {
  currentSection: SectionInfo | null;
  visibleSections: SectionInfo[];
  scrollToSection: (sectionId: string) => void;
}

export function useVoiceAgent(scrollContextInput?: ScrollContextInput): VoiceAgentHook {
  const router = useRouter();

  const [status, setStatus] = useState<VoiceAgentStatus>("idle");
  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [error, setError] = useState<string | null>(null);

  const processingRef = useRef(false);
  const manualOpenRef = useRef(false);
  const scrollContextRef = useRef(scrollContextInput);
  const pendingCommandRef = useRef<VoiceCommand | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastContentRef = useRef("");
  const sendMessageRef = useRef<((text: string) => Promise<void>) | null>(null);

  useEffect(() => {
    scrollContextRef.current = scrollContextInput;
  }, [scrollContextInput]);

  const {
    isListening,
    isSupported,
    transcript,
    interimTranscript,
    error: speechError,
    startListening: startSpeech,
    stopListening: stopSpeech,
    resetTranscript,
  } = useSpeechRecognition();

  const {
    isPlaying,
    isLoading: isLoadingAudio,
    error: audioError,
    analyserNode,
    playAudio,
    stopAudio,
  } = useAudioPlayback();

  const {
    audioLevel,
    frequencyData,
    startAnalyzing,
    stopAnalyzing,
  } = useAudioAnalyzer();

  // Combined transcript - use final + interim
  const currentTranscript = (transcript + " " + interimTranscript).trim();

  // Update status
  useEffect(() => {
    let newStatus: VoiceAgentStatus = "idle";

    if (error || speechError || audioError) {
      newStatus = "error";
    } else if (isPlaying) {
      newStatus = "speaking";
    } else if (isLoadingAudio || processingRef.current) {
      newStatus = "processing";
    } else if (isListening) {
      newStatus = "listening";
    }

    setStatus(newStatus);
  }, [isListening, isPlaying, isLoadingAudio, error, speechError, audioError]);

  // Audio visualization
  useEffect(() => {
    if (isPlaying && analyserNode) {
      startAnalyzing(analyserNode);
    } else {
      stopAnalyzing();
    }
  }, [isPlaying, analyserNode, startAnalyzing, stopAnalyzing]);

  // Handle errors
  useEffect(() => {
    if (speechError) {
      console.error("[VoiceAgent] speechError:", speechError);
      setError(speechError);
    }
  }, [speechError]);

  // Interrupt audio when user speaks
  useEffect(() => {
    if (!isOpen || !manualOpenRef.current) return;

    const content = currentTranscript;
    if (isPlaying && content.length >= 3) {
      stopAudio();
      pendingCommandRef.current = null;
    }
  }, [currentTranscript, isPlaying, isOpen, stopAudio]);

  // Process speech - use BOTH final and interim transcripts
  useEffect(() => {
    if (!isOpen || !manualOpenRef.current) return;
    if (isPlaying || isLoadingAudio || processingRef.current) return;

    // Use combined content (final + interim)
    const content = currentTranscript;
    if (!content || content.length < 2) return;

    // Check if content changed - only then reset the timer
    if (content !== lastContentRef.current) {
      // Clear existing timer when content changes
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }

      lastContentRef.current = content;

      // Wait for silence (content stops changing)
      console.log("[VoiceAgent] Starting silence timer for:", content);
      silenceTimerRef.current = setTimeout(() => {
        console.log("[VoiceAgent] Silence timer fired, sending:", content);
        if (content && content.length >= 2 && !processingRef.current) {
          sendMessageRef.current?.(content);
        }
      }, 1200); // 1.2 seconds of silence
    }

    // Don't clear timer in cleanup - only clear when content changes
  }, [currentTranscript, isOpen, isPlaying, isLoadingAudio]);

  // Auto-resume listening
  useEffect(() => {
    console.log("[VoiceAgent] Auto-resume check - isOpen:", isOpen, "isPlaying:", isPlaying, "isLoadingAudio:", isLoadingAudio, "processingRef:", processingRef.current, "isListening:", isListening);

    if (!isOpen || !manualOpenRef.current) {
      console.log("[VoiceAgent] Not resuming - not open or not manual");
      return;
    }
    if (isPlaying || isLoadingAudio || processingRef.current) {
      console.log("[VoiceAgent] Not resuming - playing/loading/processing");
      return;
    }
    if (isListening) {
      console.log("[VoiceAgent] Not resuming - already listening");
      return;
    }
    // Don't auto-resume if there's an error
    if (speechError || error) {
      console.log("[VoiceAgent] Not auto-resuming due to error:", speechError || error);
      return;
    }

    console.log("[VoiceAgent] Will auto-resume listening in 500ms");
    const timer = setTimeout(() => {
      console.log("[VoiceAgent] Auto-resuming now");
      if (isOpen && manualOpenRef.current && !processingRef.current && !isPlaying && !isLoadingAudio && !speechError && !error) {
        resetTranscript();
        lastContentRef.current = "";
        startSpeech(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [isPlaying, isLoadingAudio, isOpen, isListening, startSpeech, resetTranscript, speechError, error]);

  const executeCommand = useCallback(
    (command: VoiceCommand) => {
      if (!command.type) return;

      if (command.type === "navigate" && command.target) {
        const isValidRoute = voiceAgentConfig.validRoutes.some(
          (r) => r.path === command.target
        );
        if (isValidRoute) {
          router.push(command.target);
        }
      } else if (command.type === "book" && command.target) {
        window.open(command.target, "_blank", "noopener,noreferrer");
      } else if (command.type === "scroll" && command.target) {
        if (scrollContextRef.current?.scrollToSection) {
          scrollContextRef.current.scrollToSection(command.target);
        } else {
          const element =
            document.getElementById(command.target) ||
            document.querySelector(`[data-section="${command.target}"]`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    },
    [router]
  );

  const buildScrollContext = useCallback((): ScrollContext | undefined => {
    const currentSection = scrollContextRef.current?.currentSection;
    if (!currentSection) return undefined;

    return {
      currentSection: currentSection.id,
      sectionName: currentSection.name,
      sectionDescription: currentSection.description,
      talkingPoints: currentSection.talkingPoints,
      currentPage: typeof window !== "undefined" ? window.location.pathname : "/",
    };
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      console.log("[VoiceAgent] sendMessage called with:", text);
      if (!text.trim() || processingRef.current) {
        console.log("[VoiceAgent] sendMessage skipped - empty or processing");
        return;
      }

      processingRef.current = true;
      setError(null);
      setCurrentResponse("");

      // Stop listening and clear
      stopSpeech();
      resetTranscript();
      lastContentRef.current = "";

      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }

      try {
        const userMessage: ConversationMessage = { role: "user", content: text };
        setConversation((prev) => [...prev, userMessage]);

        const scrollContext = buildScrollContext();

        const response = await fetch("/api/voice/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            conversationHistory: conversation,
            scrollContext,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to get response");
        }

        const data = await response.json();
        console.log("[VoiceAgent] API response:", data);
        const { response: assistantResponse, command } = data;

        const assistantMessage: ConversationMessage = {
          role: "assistant",
          content: assistantResponse,
        };
        setConversation((prev) => [...prev, assistantMessage]);
        setCurrentResponse(assistantResponse);

        pendingCommandRef.current = command;

        // Set processing to false BEFORE playing audio
        // This allows auto-resume to work when audio ends
        processingRef.current = false;

        await playAudio(assistantResponse);

        if (pendingCommandRef.current?.type) {
          executeCommand(pendingCommandRef.current);
          pendingCommandRef.current = null;
        }
      } catch (err) {
        console.error("Voice agent error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
        processingRef.current = false;
      }
    },
    [conversation, playAudio, executeCommand, resetTranscript, stopSpeech, buildScrollContext]
  );

  // Keep ref updated for use in setTimeout callbacks
  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  const open = useCallback(() => {
    console.log("[VoiceAgent] open() called");
    setIsOpen(true);
    setError(null);
    manualOpenRef.current = true;
    lastContentRef.current = "";
    resetTranscript();
    console.log("[VoiceAgent] calling startSpeech(true)");
    startSpeech(true);
  }, [startSpeech, resetTranscript]);

  const close = useCallback(() => {
    setIsOpen(false);
    manualOpenRef.current = false;
    processingRef.current = false;
    stopSpeech();
    stopAudio();
    stopAnalyzing();
    resetTranscript();
    lastContentRef.current = "";
    pendingCommandRef.current = null;
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, [stopSpeech, stopAudio, stopAnalyzing, resetTranscript]);

  const startListening = useCallback(() => {
    setError(null);
    startSpeech();
  }, [startSpeech]);

  const stopListening = useCallback(() => {
    stopSpeech();
  }, [stopSpeech]);

  const clearConversation = useCallback(() => {
    setConversation([]);
    setCurrentResponse("");
    resetTranscript();
    lastContentRef.current = "";
  }, [resetTranscript]);

  return {
    status,
    isOpen,
    conversation,
    currentTranscript,
    currentResponse,
    error,
    audioLevel,
    frequencyData,
    isSupported,
    open,
    close,
    startListening,
    stopListening,
    sendMessage,
    clearConversation,
  };
}
