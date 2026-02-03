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
const bouncy = { damping: 12, stiffness: 200 };

const benefits = [
  "12 qualified leads in your inbox",
  "Calendar booked with buyers",
  "Brand so clear it sells itself",
];

export const SolutionScene: React.FC = () => {
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

      {/* Green success glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%)`,
          top: "40%",
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
        {/* Header - pops in */}
        <div
          style={{
            opacity: interpolate(headerProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(headerProgress, [0, 1], [0.7, 1])})`,
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
            The Shift
          </div>
          <h2
            style={{
              fontSize: Math.min(width * 0.045, 64),
              fontWeight: 700,
              color: colors.white,
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            What If Marketing Just...{" "}
            <span
              style={{
                background: `linear-gradient(135deg, #22C55E 0%, #10B981 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Worked?
            </span>
          </h2>
        </div>

        {/* Benefits - bounce in fast */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: width * 0.65,
          }}
        >
          {benefits.map((benefit, index) => {
            const itemDelay = 8 + index * 6;
            const itemProgress = spring({
              frame: frame - itemDelay,
              fps,
              config: bouncy,
            });

            const opacity = interpolate(itemProgress, [0, 1], [0, 1]);
            const x = interpolate(itemProgress, [0, 1], [80, 0]);
            const scale = interpolate(itemProgress, [0, 1], [0.85, 1]);

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  opacity,
                  transform: `translateX(${x}px) scale(${scale})`,
                  background: "rgba(34, 197, 94, 0.1)",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                  borderRadius: 16,
                  padding: "22px 28px",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(34, 197, 94, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="#22C55E"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontSize: Math.min(width * 0.022, 26),
                    fontWeight: 600,
                    color: colors.white,
                  }}
                >
                  {benefit}
                </span>
              </div>
            );
          })}
        </div>

        {/* Tagline - punchy reveal */}
        <div
          style={{
            marginTop: 45,
            opacity: interpolate(
              spring({ frame: frame - 35, fps, config: snappy }),
              [0, 1],
              [0, 1]
            ),
            transform: `scale(${interpolate(
              spring({ frame: frame - 35, fps, config: snappy }),
              [0, 1],
              [0.8, 1]
            )})`,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: Math.min(width * 0.024, 30),
              fontWeight: 700,
              color: colors.white,
            }}
          >
            We've built it{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${colors.purple[500]} 0%, ${colors.cyan[500]} 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              150+ times
            </span>
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
