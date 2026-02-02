"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface AudioAnalyzerHook {
  audioLevel: number;
  frequencyData: Uint8Array<ArrayBuffer>;
  isAnalyzing: boolean;
  startAnalyzing: (analyserNode: AnalyserNode) => void;
  stopAnalyzing: () => void;
}

export function useAudioAnalyzer(): AudioAnalyzerHook {
  const [audioLevel, setAudioLevel] = useState(0);
  const [frequencyData, setFrequencyData] = useState<Uint8Array<ArrayBuffer>>(
    new Uint8Array(128)
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);

  const analyze = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current) return;

    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    // Get frequency data
    analyser.getByteFrequencyData(dataArray as Uint8Array<ArrayBuffer>);

    // Calculate average audio level (0-1)
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const average = sum / dataArray.length / 255;

    setAudioLevel(average);
    setFrequencyData(new Uint8Array(dataArray) as Uint8Array<ArrayBuffer>);

    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(analyze);
  }, []);

  const startAnalyzing = useCallback(
    (analyserNode: AnalyserNode) => {
      if (isAnalyzing) return;

      analyserRef.current = analyserNode;
      dataArrayRef.current = new Uint8Array(analyserNode.frequencyBinCount) as Uint8Array<ArrayBuffer>;

      setIsAnalyzing(true);
      analyze();
    },
    [analyze, isAnalyzing]
  );

  const stopAnalyzing = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setIsAnalyzing(false);
    setAudioLevel(0);
    setFrequencyData(new Uint8Array(128) as Uint8Array<ArrayBuffer>);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    audioLevel,
    frequencyData,
    isAnalyzing,
    startAnalyzing,
    stopAnalyzing,
  };
}
