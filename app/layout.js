import { Geist, Geist_Mono } from "next/font/google";
import { GSAPProvider } from "@/providers/gsap-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "3D Animated Website",
  description: "Next.js website with Three.js and GSAP animations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GSAPProvider>{children}</GSAPProvider>
      </body>
    </html>
  );
}
