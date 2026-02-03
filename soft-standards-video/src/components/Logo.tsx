import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { colors } from "../design";

type LogoProps = {
  size?: number;
  showText?: boolean;
  delay?: number;
};

export const Logo: React.FC<LogoProps> = ({
  size = 80,
  showText = true,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleProgress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const textProgress = spring({
    frame: frame - delay - 10,
    fps,
    config: { damping: 200 },
  });

  const scale = interpolate(scaleProgress, [0, 1], [0, 1]);
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textX = interpolate(textProgress, [0, 1], [20, 0]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      {/* Logo Icon - S mark */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.25,
          background: `linear-gradient(135deg, ${colors.purple[500]} 0%, ${colors.purple[600]} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${scale})`,
          boxShadow: `0 8px 30px rgba(124, 58, 237, 0.4)`,
        }}
      >
        <svg
          width={size * 0.5}
          height={size * 0.5}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2C8.5 2 6 4 6 6.5C6 9 8 10.5 12 11.5C16 12.5 18 14 18 16.5C18 19 15.5 21 12 21C8.5 21 6 19 6 16.5"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <div
          style={{
            opacity: textOpacity,
            transform: `translateX(${textX}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: size * 0.45,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Soft Standards
          </div>
          <div
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: size * 0.18,
              fontWeight: 500,
              color: colors.slate[400],
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            The New Standard in Digital
          </div>
        </div>
      )}
    </div>
  );
};
