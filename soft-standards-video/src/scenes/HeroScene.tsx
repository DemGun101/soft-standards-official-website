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

// Snappy spring config for modern feel
const snappy = { damping: 20, stiffness: 300 };
const smooth = { damping: 30, stiffness: 200 };

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // Fast logo pop
  const logoScale = spring({
    frame,
    fps,
    config: snappy,
  });

  // Quick badge reveal
  const badgeProgress = spring({
    frame: frame - 3,
    fps,
    config: snappy,
  });

  // Headline snaps in
  const headlineProgress = spring({
    frame: frame - 8,
    fps,
    config: smooth,
  });

  // Subheadline follows fast
  const subProgress = spring({
    frame: frame - 15,
    fps,
    config: smooth,
  });

  // Pulsing glow
  const glowPulse = interpolate(
    Math.sin(frame * 0.12),
    [-1, 1],
    [0.3, 0.6]
  );

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background variant="dark" />

      {/* Animated glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(124, 58, 237, ${glowPulse}) 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          filter: "blur(60px)",
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
        {/* Badge - pops in */}
        <div
          style={{
            opacity: interpolate(badgeProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(badgeProgress, [0, 1], [0.5, 1])}) translateY(${interpolate(badgeProgress, [0, 1], [-20, 0])}px)`,
            marginBottom: 30,
          }}
        >
          <div
            style={{
              background: `rgba(124, 58, 237, 0.2)`,
              border: `1px solid rgba(124, 58, 237, 0.4)`,
              borderRadius: 999,
              padding: "10px 24px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: colors.purple[500],
                boxShadow: `0 0 12px ${colors.purple[500]}`,
              }}
            />
            <span
              style={{
                color: colors.purple[400],
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              For Founders Who Are Done Guessing
            </span>
          </div>
        </div>

        {/* Logo - bounces in */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            marginBottom: 40,
          }}
        >
          <Logo size={90} showText={true} />
        </div>

        {/* Headline - slides up fast */}
        <div
          style={{
            opacity: interpolate(headlineProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headlineProgress, [0, 1], [50, 0])}px)`,
            textAlign: "center",
            maxWidth: width * 0.85,
            marginBottom: 24,
          }}
        >
          <h1
            style={{
              fontSize: Math.min(width * 0.052, 76),
              fontWeight: 800,
              color: colors.white,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            We Build{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${colors.purple[500]} 0%, ${colors.purple[400]} 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Marketing Machines
            </span>
            <br />
            That Print Money While You Sleep
          </h1>
        </div>

        {/* Subheadline */}
        <div
          style={{
            opacity: interpolate(subProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(subProgress, [0, 1], [30, 0])}px)`,
            textAlign: "center",
            maxWidth: width * 0.65,
          }}
        >
          <p
            style={{
              fontSize: Math.min(width * 0.02, 26),
              fontWeight: 400,
              color: colors.slate[300],
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            Brand. Website. Ads. Automation. Done-for-you in 30 days.
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
