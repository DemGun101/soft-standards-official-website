import React from "react";
import { colors } from "../design";

type ServiceIconProps = {
  icon: string;
  size?: number;
};

export const ServiceIcon: React.FC<ServiceIconProps> = ({
  icon,
  size = 48,
}) => {
  const iconPaths: Record<string, React.ReactNode> = {
    strategy: (
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z M2 17L12 22L22 17 M2 12L12 17L22 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
    web: (
      <>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M2 12H22 M12 2C14.5 4.5 16 8 16 12C16 16 14.5 19.5 12 22C9.5 19.5 8 16 8 12C8 8 9.5 4.5 12 2" stroke="currentColor" strokeWidth="2" fill="none" />
      </>
    ),
    design: (
      <>
        <path d="M12 19L19 12L22 15L15 22L12 19Z" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M18 13L16.5 5.5L2 2L5.5 16.5L13 18L18 13Z" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
      </>
    ),
    marketing: (
      <>
        <path d="M4 15S4 17 4 19C4 21 6 21 6 21H8C8 21 10 21 10 19V9" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M18 8C18.7956 8 19.5587 8.31607 20.1213 8.87868C20.6839 9.44129 21 10.2044 21 11C21 11.7956 20.6839 12.5587 20.1213 13.1213C19.5587 13.6839 18.7956 14 18 14" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M10 9V4L18 8L10 12V9Z" stroke="currentColor" strokeWidth="2" fill="none" />
      </>
    ),
    mobile: (
      <>
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="12" y1="18" x2="12" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    ai: (
      <>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M12 2V4 M12 20V22 M4.93 4.93L6.34 6.34 M17.66 17.66L19.07 19.07 M2 12H4 M20 12H22 M4.93 19.07L6.34 17.66 M17.66 6.34L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 4" />
      </>
    ),
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: colors.purple[500],
      }}
    >
      <svg
        width={size * 0.8}
        height={size * 0.8}
        viewBox="0 0 24 24"
        fill="none"
      >
        {iconPaths[icon] || iconPaths.web}
      </svg>
    </div>
  );
};
