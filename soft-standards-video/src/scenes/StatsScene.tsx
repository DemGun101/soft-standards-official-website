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
import { colors, stats } from "../design";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const snappy = { damping: 20, stiffness: 300 };
const bouncy = { damping: 12, stiffness: 200 };

const statItems = [
  { value: stats.systemsBuilt, suffix: "+", label: "Systems Built" },
  { value: stats.revenueGenerated, prefix: "$", suffix: "M+", label: "Revenue" },
  { value: stats.avgROI, suffix: "%", label: "Avg ROI" },
  { value: stats.clientRetention, suffix: "%", label: "Retention" },
];

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const headerProgress = spring({
    frame,
    fps,
    config: snappy,
  });

  const isVertical = height > width;

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background variant="dark" />

      {/* Glowing orbs */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 70%)`,
          top: "10%",
          left: "35%",
          filter: "blur(100px)",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: isVertical ? 40 : 60,
        }}
      >
        {/* Header */}
        <div
          style={{
            opacity: interpolate(headerProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(headerProgress, [0, 1], [0.7, 1])})`,
            marginBottom: isVertical ? 40 : 55,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: isVertical ? 12 : 14,
              fontWeight: 600,
              color: colors.purple[400],
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            The Receipts
          </div>
          <h2
            style={{
              fontSize: isVertical ? 30 : Math.min(width * 0.038, 54),
              fontWeight: 700,
              color: colors.white,
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Results That{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${colors.purple[500]} 0%, ${colors.cyan[500]} 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Speak Louder
            </span>
          </h2>
        </div>

        {/* Stats grid - fast bounce */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isVertical ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: isVertical ? 18 : 30,
            maxWidth: isVertical ? width * 0.9 : width * 0.85,
          }}
        >
          {statItems.map((stat, index) => {
            const itemDelay = 5 + index * 4;
            const itemProgress = spring({
              frame: frame - itemDelay,
              fps,
              config: bouncy,
            });

            const opacity = interpolate(itemProgress, [0, 1], [0, 1]);
            const scale = interpolate(itemProgress, [0, 1], [0.5, 1]);

            // Animated counter
            const counterProgress = interpolate(
              frame - itemDelay - 5,
              [0, 30],
              [0, 1],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            );
            const displayValue = Math.round(stat.value * counterProgress);

            return (
              <div
                key={index}
                style={{
                  opacity,
                  transform: `scale(${scale})`,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    background: `linear-gradient(145deg, rgba(124, 58, 237, 0.15) 0%, rgba(6, 182, 212, 0.08) 100%)`,
                    border: "1px solid rgba(124, 58, 237, 0.25)",
                    borderRadius: 24,
                    padding: isVertical ? "28px 16px" : "40px 28px",
                  }}
                >
                  <div
                    style={{
                      fontSize: isVertical ? 42 : 56,
                      fontWeight: 800,
                      background: `linear-gradient(135deg, ${colors.purple[500]} 0%, ${colors.cyan[500]} 100%)`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      lineHeight: 1,
                    }}
                  >
                    {stat.prefix || ""}
                    {displayValue}
                    {stat.suffix}
                  </div>
                  <p
                    style={{
                      fontSize: isVertical ? 13 : 16,
                      fontWeight: 500,
                      color: colors.slate[400],
                      marginTop: 10,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
