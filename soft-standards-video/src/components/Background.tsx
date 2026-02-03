import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { colors } from "../design";

type BackgroundProps = {
  variant?: "dark" | "light" | "gradient";
};

export const Background: React.FC<BackgroundProps> = ({ variant = "dark" }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => {
    const baseX = (i * 137) % 100;
    const baseY = (i * 97) % 100;
    const size = 4 + (i % 3) * 2;
    const speed = 0.3 + (i % 5) * 0.1;
    const color = i % 3 === 0
      ? colors.purple[500]
      : i % 3 === 1
        ? colors.cyan[500]
        : colors.purple[400];

    const yOffset = interpolate(
      (frame * speed) % 200,
      [0, 100, 200],
      [0, -30, 0]
    );
    const opacity = interpolate(
      (frame * speed + i * 10) % 150,
      [0, 75, 150],
      [0.1, 0.4, 0.1]
    );

    return { x: baseX, y: baseY + yOffset, size, color, opacity };
  });

  const bgColor = variant === "light" ? colors.slate[50] : colors.navy[900];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        overflow: "hidden",
      }}
    >
      {/* Gradient orbs */}
      <div
        style={{
          position: "absolute",
          width: width * 0.8,
          height: width * 0.8,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)`,
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: width * 0.5,
          height: width * 0.5,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)`,
          bottom: "-10%",
          right: "-10%",
        }}
      />

      {/* Floating particles */}
      {particles.map((particle, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
