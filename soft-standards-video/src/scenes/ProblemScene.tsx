import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Poppins";
import { Background } from "../components/Background";
import { colors } from "../design";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const snappy = { damping: 20, stiffness: 300 };

const problems = [
  "Content gets likes, not sales",
  "Ads burn cash with no ROI",
  "Competitors with worse products win",
  "Nothing runs without you",
];

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const headerProgress = spring({
    frame,
    fps,
    config: snappy,
  });

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background variant="dark" />

      {/* Red warning glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)`,
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(80px)",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 60,
        }}
      >
        {/* Header - snaps in */}
        <div
          style={{
            opacity: interpolate(headerProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(headerProgress, [0, 1], [0.8, 1])})`,
            marginBottom: 50,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: colors.purple[400],
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            The Problem
          </div>
          <h2
            style={{
              fontSize: Math.min(width * 0.042, 60),
              fontWeight: 700,
              color: colors.white,
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Why Your Marketing{" "}
            <span style={{ color: "#EF4444" }}>Isn't Working</span>
          </h2>
        </div>

        {/* Problems - rapid fire appearance */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: width * 0.7,
          }}
        >
          {problems.map((problem, index) => {
            const itemDelay = 8 + index * 5; // Very fast stagger
            const itemProgress = spring({
              frame: frame - itemDelay,
              fps,
              config: snappy,
            });

            const opacity = interpolate(itemProgress, [0, 1], [0, 1]);
            const x = interpolate(itemProgress, [0, 1], [-80, 0]);
            const scale = interpolate(itemProgress, [0, 1], [0.9, 1]);

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  opacity,
                  transform: `translateX(${x}px) scale(${scale})`,
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.25)",
                  borderRadius: 14,
                  padding: "18px 24px",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(239, 68, 68, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="#EF4444"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontSize: Math.min(width * 0.02, 24),
                    fontWeight: 500,
                    color: colors.slate[200],
                  }}
                >
                  {problem}
                </span>
              </div>
            );
          })}
        </div>

        {/* Punch line */}
        <div
          style={{
            marginTop: 40,
            opacity: interpolate(
              spring({
                frame: frame - 35,
                fps,
                config: snappy,
              }),
              [0, 1],
              [0, 1]
            ),
            transform: `scale(${interpolate(
              spring({ frame: frame - 35, fps, config: snappy }),
              [0, 1],
              [0.8, 1]
            )})`,
          }}
        >
          <p
            style={{
              fontSize: Math.min(width * 0.026, 32),
              fontWeight: 700,
              color: colors.white,
              textAlign: "center",
            }}
          >
            You don't have a{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${colors.purple[500]} 0%, ${colors.purple[400]} 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              SYSTEM
            </span>
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
