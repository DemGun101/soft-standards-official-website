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
import { colors, processSteps } from "../design";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const snappy = { damping: 20, stiffness: 300 };
const bouncy = { damping: 12, stiffness: 200 };

export const ProcessScene: React.FC = () => {
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

      {/* Purple glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 70%)`,
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          filter: "blur(80px)",
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
            marginBottom: isVertical ? 35 : 50,
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
            How It Works
          </div>
          <h2
            style={{
              fontSize: isVertical ? 32 : Math.min(width * 0.038, 54),
              fontWeight: 700,
              color: colors.white,
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Stranger to Customer{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${colors.purple[500]} 0%, ${colors.purple[400]} 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              in 4 Weeks
            </span>
          </h2>
        </div>

        {/* Process steps - fast stagger */}
        <div
          style={{
            display: "flex",
            flexDirection: isVertical ? "column" : "row",
            gap: isVertical ? 16 : 24,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {processSteps.map((step, index) => {
            const itemDelay = 6 + index * 5; // Very fast stagger
            const itemProgress = spring({
              frame: frame - itemDelay,
              fps,
              config: bouncy,
            });

            const opacity = interpolate(itemProgress, [0, 1], [0, 1]);
            const scale = interpolate(itemProgress, [0, 1], [0.6, 1]);
            const y = interpolate(itemProgress, [0, 1], [50, 0]);

            return (
              <div
                key={index}
                style={{
                  width: isVertical ? width * 0.8 : width * 0.18,
                  opacity,
                  transform: `scale(${scale}) translateY(${y}px)`,
                }}
              >
                <div
                  style={{
                    background: `linear-gradient(145deg, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0.05) 100%)`,
                    border: `1px solid rgba(124, 58, 237, 0.25)`,
                    borderRadius: 20,
                    padding: isVertical ? "20px 24px" : "28px 20px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: isVertical ? "row" : "column",
                    alignItems: "center",
                    gap: isVertical ? 16 : 12,
                  }}
                >
                  {/* Week number */}
                  <div
                    style={{
                      width: isVertical ? 44 : 52,
                      height: isVertical ? 44 : 52,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${colors.purple[500]} 0%, ${colors.purple[600]} 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 6px 20px rgba(124, 58, 237, 0.4)`,
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: isVertical ? 18 : 20,
                        fontWeight: 700,
                        color: colors.white,
                      }}
                    >
                      {step.week}
                    </span>
                  </div>

                  <div style={{ textAlign: isVertical ? "left" : "center" }}>
                    <h3
                      style={{
                        fontSize: isVertical ? 18 : 20,
                        fontWeight: 700,
                        color: colors.white,
                        marginBottom: 4,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: isVertical ? 13 : 14,
                        fontWeight: 400,
                        color: colors.slate[400],
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
