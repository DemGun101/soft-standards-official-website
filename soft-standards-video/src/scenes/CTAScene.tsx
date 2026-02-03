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
import { Logo } from "../components/Logo";
import { colors } from "../design";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const snappy = { damping: 20, stiffness: 300 };
const bouncy = { damping: 12, stiffness: 200 };

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const isVertical = height > width;

  // Logo pops in immediately
  const logoProgress = spring({
    frame,
    fps,
    config: bouncy,
  });

  // Content follows fast
  const contentProgress = spring({
    frame: frame - 5,
    fps,
    config: snappy,
  });

  // Button bounces in
  const buttonProgress = spring({
    frame: frame - 15,
    fps,
    config: bouncy,
  });

  // Pulsing CTA glow
  const pulseScale = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [1, 1.04]
  );
  const pulseGlow = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.4, 0.8]
  );

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background variant="dark" />

      {/* Intense purple glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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
        {/* Logo - bounces in */}
        <div
          style={{
            opacity: interpolate(logoProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(logoProgress, [0, 1], [0.3, 1])})`,
            marginBottom: 30,
          }}
        >
          <Logo size={isVertical ? 60 : 80} showText={false} />
        </div>

        {/* Headline */}
        <div
          style={{
            opacity: interpolate(contentProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(contentProgress, [0, 1], [40, 0])}px)`,
            textAlign: "center",
            marginBottom: 20,
            maxWidth: isVertical ? width * 0.9 : width * 0.7,
          }}
        >
          <h2
            style={{
              fontSize: isVertical ? 32 : Math.min(width * 0.042, 60),
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Ready to Build Your{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${colors.purple[500]} 0%, ${colors.cyan[500]} 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Marketing Machine?
            </span>
          </h2>
        </div>

        {/* Subheadline */}
        <div
          style={{
            opacity: interpolate(
              spring({ frame: frame - 10, fps, config: snappy }),
              [0, 1],
              [0, 1]
            ),
            textAlign: "center",
            maxWidth: isVertical ? width * 0.85 : width * 0.45,
            marginBottom: 35,
          }}
        >
          <p
            style={{
              fontSize: isVertical ? 16 : 22,
              fontWeight: 400,
              color: colors.slate[300],
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            15-minute call. No pitch. Just clarity.
          </p>
        </div>

        {/* CTA Button - pulsing */}
        <div
          style={{
            opacity: interpolate(buttonProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(buttonProgress, [0, 1], [0.5, 1]) * pulseScale})`,
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.purple[500]} 0%, ${colors.purple[600]} 100%)`,
              borderRadius: 999,
              padding: isVertical ? "18px 40px" : "22px 56px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: `0 8px 40px rgba(124, 58, 237, ${pulseGlow})`,
            }}
          >
            <span
              style={{
                fontSize: isVertical ? 18 : 24,
                fontWeight: 700,
                color: colors.white,
              }}
            >
              Book Your Free Growth Audit
            </span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Website */}
        <div
          style={{
            opacity: interpolate(
              spring({ frame: frame - 25, fps, config: snappy }),
              [0, 1],
              [0, 1]
            ),
            marginTop: 35,
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 10,
              padding: "10px 22px",
            }}
          >
            <span
              style={{
                fontSize: isVertical ? 15 : 18,
                fontWeight: 500,
                color: colors.slate[300],
              }}
            >
              softstandards.io
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
