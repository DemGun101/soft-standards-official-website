"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { voiceAgentConfig } from "@/lib/voice-agent-config";

interface SpeechRecognitionHook {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  wakeWordDetected: boolean;
  startListening: (skipWakeWord?: boolean) => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export function useSpeechRecognition(): SpeechRecognitionHook {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [wakeWordDetected, setWakeWordDetected] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isListeningRef = useRef(false);
  const skipWakeWordRef = useRef(false);

  // Check for wake word in transcript
  const checkWakeWord = useCallback((text: string): boolean => {
    const normalizedText = text.toLowerCase().trim();
    return voiceAgentConfig.wakeWord.phrases.some((phrase) => {
      // Check for exact match or fuzzy match
      if (normalizedText.includes(phrase)) return true;
      // Simple fuzzy matching - check if words are similar
      const words = normalizedText.split(" ");
      const phraseWords = phrase.split(" ");
      if (words.length >= phraseWords.length) {
        for (let i = 0; i <= words.length - phraseWords.length; i++) {
          const slice = words.slice(i, i + phraseWords.length).join(" ");
          if (similarityScore(slice, phrase) >= voiceAgentConfig.wakeWord.fuzzyThreshold) {
            return true;
          }
        }
      }
      return false;
    });
  }, []);

  // Simple string similarity score (Levenshtein-based)
  const similarityScore = (a: string, b: string): number => {
    if (a === b) return 1;
    if (a.length === 0 || b.length === 0) return 0;

    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    const maxLen = Math.max(a.length, b.length);
    return 1 - matrix[b.length][a.length] / maxLen;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setIsSupported(false);
      setError("Speech recognition is not supported in this browser");
      return;
    }

    setIsSupported(true);

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      console.log("[SpeechRecognition] onresult event");

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcriptText = result[0].transcript;
        console.log("[SpeechRecognition] transcript:", transcriptText, "isFinal:", result.isFinal);

        if (result.isFinal) {
          // If skipping wake word (manual open), capture transcript directly
          if (skipWakeWordRef.current) {
            setTranscript((prev) => (prev ? prev + " " + transcriptText : transcriptText).trim());
          } else {
            // Check for wake word in final results
            if (!wakeWordDetected && checkWakeWord(transcriptText)) {
              setWakeWordDetected(true);
              // Remove wake word from transcript
              const cleanedTranscript = transcriptText
                .toLowerCase()
                .replace(/hey soft ?standards?/gi, "")
                .trim();
              if (cleanedTranscript) {
                setTranscript(cleanedTranscript);
              }
            } else if (wakeWordDetected) {
              setTranscript((prev) => (prev ? prev + " " + transcriptText : transcriptText));
            }
          }
        } else {
          interim += transcriptText;

          // Also check interim results for wake word (only if not skipping)
          if (!skipWakeWordRef.current && !wakeWordDetected && checkWakeWord(transcriptText)) {
            setWakeWordDetected(true);
          }
        }
      }

      setInterimTranscript(interim);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.log("[SpeechRecognition] onerror:", event.error);
      if (event.error === "no-speech") {
        // Ignore no-speech errors during continuous listening
        return;
      }
      if (event.error === "aborted") {
        // Ignore aborted errors (happens when we stop listening)
        return;
      }
      console.error("[SpeechRecognition] Setting error:", event.error);
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
      isListeningRef.current = false;
    };

    recognition.onend = () => {
      console.log("[SpeechRecognition] onend, isListeningRef:", isListeningRef.current);
      // Restart if we should still be listening
      if (isListeningRef.current) {
        try {
          console.log("[SpeechRecognition] restarting...");
          recognition.start();
        } catch (err) {
          console.log("[SpeechRecognition] restart failed:", err);
          // Already started, ignore
        }
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [checkWakeWord, wakeWordDetected]);

  const startListening = useCallback((skipWakeWord = false) => {
    console.log("[SpeechRecognition] startListening called, skipWakeWord:", skipWakeWord);
    console.log("[SpeechRecognition] recognitionRef.current:", !!recognitionRef.current, "isListeningRef.current:", isListeningRef.current);

    if (!recognitionRef.current || isListeningRef.current) {
      console.log("[SpeechRecognition] skipping - no recognition or already listening");
      return;
    }

    setError(null);
    setTranscript("");
    setInterimTranscript("");
    setWakeWordDetected(false);
    skipWakeWordRef.current = skipWakeWord;

    try {
      recognitionRef.current.start();
      console.log("[SpeechRecognition] recognition.start() called successfully");
      setIsListening(true);
      isListeningRef.current = true;
    } catch (err) {
      setError("Failed to start speech recognition");
      console.error("Speech recognition start error:", err);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;

    isListeningRef.current = false;
    setIsListening(false);

    try {
      recognitionRef.current.stop();
    } catch {
      // Already stopped, ignore
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    setWakeWordDetected(false);
  }, []);

  return {
    isListening,
    isSupported,
    transcript,
    interimTranscript,
    error,
    wakeWordDetected,
    startListening,
    stopListening,
    resetTranscript,
  };
}
