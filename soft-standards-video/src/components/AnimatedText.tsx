import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { colors } from "../design";

type AnimatedTextProps = {
  text: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  delay?: number;
  gradient?: boolean;
  centered?: boolean;
  maxWidth?: number;
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  fontSize = 64,
  fontWeight = 700,
  color = colors.white,
  delay = 0,
  gradient = false,
  centered = true,
  maxWidth,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: centered ? "center" : "flex-start",
        gap: fontSize * 0.25,
        maxWidth: maxWidth,
      }}
    >
      {words.map((word, wordIndex) => {
        const wordDelay = delay + wordIndex * 3;

        const progress = spring({
          frame: frame - wordDelay,
          fps,
          config: { damping: 15, stiffness: 100 },
        });

        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const y = interpolate(progress, [0, 1], [30, 0]);

        return (
          <span
            key={wordIndex}
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize,
              fontWeight,
              color: gradient ? "transparent" : color,
              background: gradient
                ? `linear-gradient(135deg, ${colors.purple[500]} 0%, ${colors.purple[400]} 100%)`
                : "none",
              WebkitBackgroundClip: gradient ? "text" : undefined,
              backgroundClip: gradient ? "text" : undefined,
              opacity,
              transform: `translateY(${y}px)`,
              display: "inline-block",
              lineHeight: 1.2,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

type TypewriterTextProps = {
  text: string;
  fontSize?: number;
  color?: string;
  delay?: number;
  speed?: number;
};

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  fontSize = 32,
  color = colors.slate[300],
  delay = 0,
  speed = 2,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const charsToShow = Math.floor(adjustedFrame / speed);
  const displayText = text.slice(0, charsToShow);

  const cursorOpacity = interpolate(
    (frame % (fps / 2)),
    [0, fps / 4, fps / 2],
    [1, 1, 0]
  );

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        fontSize,
        color,
        lineHeight: 1.6,
      }}
    >
      {displayText}
      <span
        style={{
          opacity: charsToShow < text.length ? cursorOpacity : 0,
          color: colors.purple[500],
        }}
      >
        |
      </span>
    </div>
  );
};

type CounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  fontSize?: number;
  delay?: number;
  duration?: number;
};

export const Counter: React.FC<CounterProps> = ({
  value,
  suffix = "",
  prefix = "",
  fontSize = 80,
  delay = 0,
  duration = 60,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  const progress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 100, stiffness: 50 },
    durationInFrames: duration,
  });

  const displayValue = Math.round(interpolate(progress, [0, 1], [0, value]));

  const scaleProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const scale = interpolate(scaleProgress, [0, 1], [0.5, 1]);
  const opacity = interpolate(scaleProgress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        fontSize,
        fontWeight: 800,
        background: `linear-gradient(135deg, ${colors.purple[500]} 0%, ${colors.cyan[500]} 100%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {prefix}
      {displayValue}
      {suffix}
    </div>
  );
};
