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
import { ServiceIcon } from "../components/ServiceIcon";
import { colors, services } from "../design";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const snappy = { damping: 20, stiffness: 300 };
const bouncy = { damping: 12, stiffness: 200 };

export const ServicesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const headerProgress = spring({
    frame,
    fps,
    config: snappy,
  });

  const isVertical = height > width;
  const gridCols = isVertical ? 2 : 3;

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background variant="dark" />

      {/* Cyan accent glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)`,
          bottom: "15%",
          left: "25%",
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
              color: colors.cyan[500],
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            What We Build
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
            End-to-End{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${colors.purple[500]} 0%, ${colors.cyan[500]} 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Digital Solutions
            </span>
          </h2>
        </div>

        {/* Services grid - rapid pop-in */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            gap: isVertical ? 14 : 20,
            maxWidth: isVertical ? width * 0.9 : width * 0.75,
          }}
        >
          {services.map((service, index) => {
            const itemDelay = 5 + index * 3; // Super fast stagger
            const itemProgress = spring({
              frame: frame - itemDelay,
              fps,
              config: bouncy,
            });

            const opacity = interpolate(itemProgress, [0, 1], [0, 1]);
            const scale = interpolate(itemProgress, [0, 1], [0.5, 1]);

            return (
              <div
                key={index}
                style={{
                  opacity,
                  transform: `scale(${scale})`,
                }}
              >
                <div
                  style={{
                    background: `linear-gradient(145deg, rgba(124, 58, 237, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)`,
                    border: `1px solid rgba(124, 58, 237, 0.2)`,
                    borderRadius: 16,
                    padding: isVertical ? "20px 16px" : "28px 24px",
                    textAlign: "center",
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: isVertical ? 48 : 60,
                      height: isVertical ? 48 : 60,
                      borderRadius: 14,
                      background: `linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px",
                    }}
                  >
                    <ServiceIcon
                      icon={service.icon}
                      size={isVertical ? 28 : 34}
                    />
                  </div>

                  <h3
                    style={{
                      fontSize: isVertical ? 14 : 17,
                      fontWeight: 600,
                      color: colors.white,
                      margin: 0,
                    }}
                  >
                    {service.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: isVertical ? 25 : 40,
            opacity: interpolate(
              spring({ frame: frame - 30, fps, config: snappy }),
              [0, 1],
              [0, 1]
            ),
          }}
        >
          <p
            style={{
              fontSize: isVertical ? 14 : 20,
              fontWeight: 500,
              color: colors.slate[400],
              textAlign: "center",
            }}
          >
            Powered by{" "}
            <span style={{ color: colors.purple[400], fontWeight: 600 }}>
              AI
            </span>
            , designed by{" "}
            <span style={{ color: colors.cyan[400], fontWeight: 600 }}>
              humans
            </span>
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
