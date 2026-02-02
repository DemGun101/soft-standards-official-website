"use client";

import { useRef, useEffect, useCallback } from "react";
import { VoiceAgentStatus, voiceAgentConfig } from "@/lib/voice-agent-config";

interface VoiceOrbCanvasProps {
  status: VoiceAgentStatus;
  audioLevel: number;
  frequencyData: Uint8Array;
  size?: number;
}

export default function VoiceOrbCanvas({
  status,
  audioLevel,
  frequencyData,
  size = 200,
}: VoiceOrbCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const smoothedLevelsRef = useRef<number[]>(new Array(32).fill(0));

  // Get color based on status
  const getStatusColor = useCallback((status: VoiceAgentStatus) => {
    const colors = voiceAgentConfig.orb.colors;
    switch (status) {
      case "listening":
        return colors.listening;
      case "processing":
        return colors.processing;
      case "speaking":
        return colors.speaking;
      case "error":
        return "#ef4444";
      default:
        return colors.idle;
    }
  }, []);

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 99, g: 102, b: 241 };
  };

  // Draw the orb with internal vectors
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (Math.min(size, size) / 2) * 0.8;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save context for transformations
    ctx.save();
    ctx.scale(dpr, dpr);

    // Get current color
    const color = getStatusColor(status);
    const rgb = hexToRgb(color);

    // Number of vectors/bars inside the circle
    const numBars = 32;
    const angleStep = (Math.PI * 2) / numBars;

    // Smooth the frequency data for fluid animation
    const smoothingFactor = 0.15;
    for (let i = 0; i < numBars; i++) {
      let targetLevel = 0;

      if (status === "speaking" && frequencyData.length > 0) {
        // Map bars to frequency bands
        const freqIndex = Math.floor((i / numBars) * frequencyData.length);
        targetLevel = frequencyData[freqIndex] / 255;
      } else if (status === "listening") {
        // Create a wave effect when listening
        const wave = Math.sin(timeRef.current * 3 + i * 0.3) * 0.3 + 0.3;
        targetLevel = audioLevel > 0.1 ? audioLevel * 0.8 + wave * 0.2 : wave * 0.4;
      } else if (status === "processing") {
        // Rotating pulse effect when processing
        const offset = (timeRef.current * 4 + i * angleStep) % (Math.PI * 2);
        targetLevel = (Math.sin(offset) * 0.5 + 0.5) * 0.6;
      } else {
        // Gentle breathing when idle
        const breath = Math.sin(timeRef.current * 1.5 + i * 0.1) * 0.15 + 0.2;
        targetLevel = breath;
      }

      // Smooth transition
      smoothedLevelsRef.current[i] +=
        (targetLevel - smoothedLevelsRef.current[i]) * smoothingFactor;
    }

    // Draw outer glow
    const glowIntensity = status === "speaking" ? 0.4 + audioLevel * 0.3 : 0.2;
    const glowGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      radius * 0.5,
      centerX,
      centerY,
      radius * 1.4
    );
    glowGradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity})`);
    glowGradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 0.3})`);
    glowGradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.4, 0, Math.PI * 2);
    ctx.fillStyle = glowGradient;
    ctx.fill();

    // Draw the main circle outline
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw inner circle (smaller)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;
    ctx.fill();

    // Draw vectors/bars radiating from center
    ctx.save();
    ctx.translate(centerX, centerY);

    for (let i = 0; i < numBars; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const level = smoothedLevelsRef.current[i];

      // Calculate bar dimensions
      const minLength = radius * 0.2;
      const maxLength = radius * 0.85;
      const barLength = minLength + (maxLength - minLength) * level;
      const barWidth = 4 + level * 4;

      // Starting position (from inner circle)
      const startRadius = radius * 0.18;
      const startX = Math.cos(angle) * startRadius;
      const startY = Math.sin(angle) * startRadius;

      // End position
      const endX = Math.cos(angle) * barLength;
      const endY = Math.sin(angle) * barLength;

      // Create gradient for each bar
      const barGradient = ctx.createLinearGradient(startX, startY, endX, endY);
      const opacity = 0.4 + level * 0.6;
      barGradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`);
      barGradient.addColorStop(1, `rgba(${rgb.r + 40}, ${rgb.g + 40}, ${rgb.b + 40}, ${opacity * 0.6})`);

      // Draw the bar
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = barGradient;
      ctx.lineWidth = barWidth;
      ctx.lineCap = "round";
      ctx.stroke();

      // Add a glow effect at the tip when active
      if (level > 0.4) {
        ctx.beginPath();
        ctx.arc(endX, endY, barWidth * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r + 60}, ${rgb.g + 60}, ${rgb.b + 60}, ${level * 0.5})`;
        ctx.fill();
      }
    }

    ctx.restore();

    // Draw a subtle inner gradient fill
    const innerGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      radius * 0.6
    );
    innerGradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`);
    innerGradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = innerGradient;
    ctx.fill();

    ctx.restore();

    // Update time
    timeRef.current += 0.016;

    // Continue animation
    animationRef.current = requestAnimationFrame(draw);
  }, [status, audioLevel, frequencyData, getStatusColor, size]);

  // Handle canvas setup and resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
  }, [size]);

  // Start animation loop
  useEffect(() => {
    draw();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-pointer transition-transform hover:scale-105"
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
