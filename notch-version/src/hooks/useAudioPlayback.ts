"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface AudioPlaybackHook {
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  audioContext: AudioContext | null;
  analyserNode: AnalyserNode | null;
  playAudio: (text: string) => Promise<void>;
  stopAudio: () => void;
}

export function useAudioPlayback(): AudioPlaybackHook {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const abortedRef = useRef(false);
  const currentUrlRef = useRef<string | null>(null);

  const initAudioContext = useCallback(() => {
    if (audioContextRef.current) return audioContextRef.current;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = ctx;
    setAudioContext(ctx);

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.8;
    analyserRef.current = analyser;
    setAnalyserNode(analyser);

    return ctx;
  }, []);

  const playAudio = useCallback(
    async (text: string): Promise<void> => {
      console.log("[AudioPlayback] playAudio called with text length:", text?.length);
      if (!text) return;

      // Reset abort flag
      abortedRef.current = false;
      setIsLoading(true);
      setError(null);

      try {
        console.log("[AudioPlayback] Fetching TTS...");
        const response = await fetch("/api/voice/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        // Check if aborted during fetch
        if (abortedRef.current) {
          console.log("[AudioPlayback] Aborted during fetch");
          setIsLoading(false);
          return;
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to generate speech");
        }

        const audioBlob = await response.blob();
        console.log("[AudioPlayback] Got audio blob, size:", audioBlob.size);

        // Check if aborted during blob processing
        if (abortedRef.current) {
          console.log("[AudioPlayback] Aborted during blob processing");
          setIsLoading(false);
          return;
        }

        const audioUrl = URL.createObjectURL(audioBlob);
        currentUrlRef.current = audioUrl;

        // Simple playback without AudioContext routing
        if (!audioRef.current) {
          audioRef.current = new Audio();
        }

        const audio = audioRef.current;
        audio.src = audioUrl;
        console.log("[AudioPlayback] Audio element created, src set");

        // Return a promise that resolves when audio ends or is stopped
        return new Promise<void>((resolve) => {
          audio.onplay = () => {
            console.log("[AudioPlayback] Audio playing");
            setIsPlaying(true);
            setIsLoading(false);
          };

          audio.onended = () => {
            console.log("[AudioPlayback] Audio ended");
            setIsPlaying(false);
            if (currentUrlRef.current) {
              URL.revokeObjectURL(currentUrlRef.current);
              currentUrlRef.current = null;
            }
            resolve();
          };

          audio.onpause = () => {
            console.log("[AudioPlayback] Audio paused");
            setIsPlaying(false);
            resolve();
          };

          audio.onerror = (e) => {
            console.error("[AudioPlayback] Audio error:", e);
            setIsPlaying(false);
            setIsLoading(false);
            if (currentUrlRef.current) {
              URL.revokeObjectURL(currentUrlRef.current);
              currentUrlRef.current = null;
            }
            resolve();
          };

          // Check one more time before playing
          if (abortedRef.current) {
            console.log("[AudioPlayback] Aborted before play");
            setIsLoading(false);
            URL.revokeObjectURL(audioUrl);
            currentUrlRef.current = null;
            resolve();
            return;
          }

          console.log("[AudioPlayback] Calling audio.play()");
          audio.play().catch((err) => {
            // Handle AbortError gracefully (happens when stopped during play)
            if (err.name === "AbortError") {
              console.log("[AudioPlayback] Play aborted");
              setIsPlaying(false);
              setIsLoading(false);
            } else {
              console.error("[AudioPlayback] Play error:", err);
              setError("Failed to play audio");
            }
            setIsPlaying(false);
            setIsLoading(false);
            resolve();
          });
        });
      } catch (err) {
        console.error("[AudioPlayback] Error:", err);
        setError(err instanceof Error ? err.message : "Failed to play audio");
        setIsPlaying(false);
        setIsLoading(false);
      }
    },
    []
  );

  const stopAudio = useCallback(() => {
    abortedRef.current = true;
    setIsLoading(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);

    if (currentUrlRef.current) {
      URL.revokeObjectURL(currentUrlRef.current);
      currentUrlRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      abortedRef.current = true;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (currentUrlRef.current) {
        URL.revokeObjectURL(currentUrlRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    isPlaying,
    isLoading,
    error,
    audioContext,
    analyserNode,
    playAudio,
    stopAudio,
  };
}
