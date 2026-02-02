"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { useAudioPlayback } from "./useAudioPlayback";
import { useAudioAnalyzer } from "./useAudioAnalyzer";
import {
  VoiceAgentStatus,
  ConversationMessage,
  VoiceCommand,
  voiceAgentConfig,
} from "@/lib/voice-agent-config";

interface VoiceAgentHook {
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

  // Actions
  open: () => void;
  close: () => void;
  startListening: () => void;
  stopListening: () => void;
  sendMessage: (text: string) => Promise<void>;
  clearConversation: () => void;
}

export function useVoiceAgent(): VoiceAgentHook {
  const router = useRouter();

  // State
  const [status, setStatus] = useState<VoiceAgentStatus>("idle");
  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Refs for tracking state in callbacks
  const statusRef = useRef<VoiceAgentStatus>("idle");
  const processingRef = useRef(false);
  const manualOpenRef = useRef(false); // Track if opened via click (skip wake word)

  // Hooks
  const {
    isListening,
    isSupported,
    transcript,
    interimTranscript,
    error: speechError,
    wakeWordDetected,
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

  // Current transcript (final + interim)
  const currentTranscript = transcript + (interimTranscript ? " " + interimTranscript : "");

  // Update status based on state changes
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
    statusRef.current = newStatus;
  }, [isListening, isPlaying, isLoadingAudio, error, speechError, audioError]);

  // Start audio analysis when playing
  useEffect(() => {
    if (isPlaying && analyserNode) {
      startAnalyzing(analyserNode);
    } else {
      stopAnalyzing();
    }
  }, [isPlaying, analyserNode, startAnalyzing, stopAnalyzing]);

  // Handle errors
  useEffect(() => {
    if (speechError) setError(speechError);
    if (audioError) setError(audioError);
  }, [speechError, audioError]);

  // Process transcript when ready (wake word detected OR manual open)
  useEffect(() => {
    const shouldProcess = manualOpenRef.current || wakeWordDetected;
    if (!shouldProcess || !transcript || processingRef.current) return;

    // Wait a bit for user to finish speaking
    const timeout = setTimeout(() => {
      if (transcript && !processingRef.current) {
        stopSpeech();
        sendMessage(transcript);
      }
    }, 1500); // Wait 1.5s after last speech

    return () => clearTimeout(timeout);
  }, [transcript, wakeWordDetected, stopSpeech]);

  // Handle command execution
  const executeCommand = useCallback(
    (command: VoiceCommand) => {
      if (!command.type) return;

      if (command.type === "navigate" && command.target) {
        // Validate route
        const isValidRoute = voiceAgentConfig.validRoutes.some(
          (r) => r.path === command.target
        );
        if (isValidRoute) {
          router.push(command.target);
        }
      } else if (command.type === "book" && command.target) {
        // Open booking URL in new tab
        window.open(command.target, "_blank", "noopener,noreferrer");
      }
    },
    [router]
  );

  // Send message to Claude API
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || processingRef.current) return;

      processingRef.current = true;
      setError(null);
      setCurrentResponse("");

      try {
        // Add user message to conversation
        const userMessage: ConversationMessage = { role: "user", content: text };
        setConversation((prev) => [...prev, userMessage]);

        // Call chat API
        const response = await fetch("/api/voice/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            conversationHistory: conversation,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to get response");
        }

        const data = await response.json();
        const { response: assistantResponse, command } = data;

        // Add assistant message to conversation
        const assistantMessage: ConversationMessage = {
          role: "assistant",
          content: assistantResponse,
        };
        setConversation((prev) => [...prev, assistantMessage]);
        setCurrentResponse(assistantResponse);

        // Play the response
        await playAudio(assistantResponse);

        // Execute any commands after playing
        if (command && command.type) {
          // Small delay to let user hear the response
          setTimeout(() => executeCommand(command), 500);
        }

        // Reset transcript and resume listening
        resetTranscript();

        // Resume listening after speaking is done
        setTimeout(() => {
          if (isOpen) {
            startSpeech();
          }
        }, 100);
      } catch (err) {
        console.error("Voice agent error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        processingRef.current = false;
      }
    },
    [conversation, playAudio, executeCommand, resetTranscript, isOpen, startSpeech]
  );

  // Open voice agent (manual open skips wake word requirement)
  const open = useCallback(() => {
    setIsOpen(true);
    setError(null);
    manualOpenRef.current = true;
    startSpeech(true); // Skip wake word when manually opened
  }, [startSpeech]);

  // Close voice agent
  const close = useCallback(() => {
    setIsOpen(false);
    manualOpenRef.current = false;
    stopSpeech();
    stopAudio();
    stopAnalyzing();
    resetTranscript();
  }, [stopSpeech, stopAudio, stopAnalyzing, resetTranscript]);

  // Manual start/stop listening
  const startListening = useCallback(() => {
    setError(null);
    startSpeech();
  }, [startSpeech]);

  const stopListening = useCallback(() => {
    stopSpeech();
  }, [stopSpeech]);

  // Clear conversation history
  const clearConversation = useCallback(() => {
    setConversation([]);
    setCurrentResponse("");
    resetTranscript();
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
