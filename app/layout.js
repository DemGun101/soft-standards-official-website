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
  title: "Soft Standards Inc. — AI-Powered Marketing Excellence",
  description: "Where AI meets marketing excellence. We bridge cutting-edge technology with authentic brand storytelling.",
  icons: {
    icon: "/icon.svg",
  },
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
