"use client";

import { ThemeProvider } from "./theme-provider";
import { GSAPProvider } from "./gsap-provider";

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <GSAPProvider>{children}</GSAPProvider>
    </ThemeProvider>
  );
}
