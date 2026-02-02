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

  // Initialize audio context on first interaction
  const initAudioContext = useCallback(() => {
    if (audioContextRef.current) return audioContextRef.current;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = ctx;
    setAudioContext(ctx);

    // Create analyser node for visualization
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.8;
    analyserRef.current = analyser;
    setAnalyserNode(analyser);

    return ctx;
  }, []);

  const playAudio = useCallback(
    async (text: string) => {
      if (!text) return;

      setIsLoading(true);
      setError(null);

      try {
        // Fetch TTS audio from our API
        const response = await fetch("/api/voice/tts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to generate speech");
        }

        // Get audio blob
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        // Initialize audio context if needed
        const ctx = initAudioContext();

        // Resume audio context if suspended (browser autoplay policy)
        if (ctx.state === "suspended") {
          await ctx.resume();
        }

        // Create or reuse audio element
        if (!audioRef.current) {
          audioRef.current = new Audio();
        }

        const audio = audioRef.current;
        audio.src = audioUrl;

        // Connect to audio context for analysis
        if (!sourceNodeRef.current && analyserRef.current) {
          sourceNodeRef.current = ctx.createMediaElementSource(audio);
          sourceNodeRef.current.connect(analyserRef.current);
          analyserRef.current.connect(ctx.destination);
        }

        // Set up event handlers
        audio.onplay = () => {
          setIsPlaying(true);
          setIsLoading(false);
        };

        audio.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
        };

        audio.onerror = () => {
          setError("Failed to play audio");
          setIsPlaying(false);
          setIsLoading(false);
          URL.revokeObjectURL(audioUrl);
        };

        // Play the audio
        await audio.play();
      } catch (err) {
        console.error("Audio playback error:", err);
        setError(err instanceof Error ? err.message : "Failed to play audio");
        setIsPlaying(false);
        setIsLoading(false);
      }
    },
    [initAudioContext]
  );

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
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
