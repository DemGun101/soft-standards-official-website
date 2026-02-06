import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SmoothScroll, PageTransition } from "@/components/animations";
import VoiceAgentWrapper from "@/components/voice-agent/VoiceAgentWrapper";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Soft Standards Inc. — AI-Powered Marketing Excellence",
  description: "Where AI meets marketing excellence. We bridge cutting-edge technology with authentic brand storytelling to create digital experiences that convert strangers into loyal advocates.",
  icons: {
    icon: "/images/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <SmoothScroll>
          <PageTransition>
            <Navbar />
            {children}
            <Footer />
          </PageTransition>
        </SmoothScroll>
        <VoiceAgentWrapper />
        <CookieConsent />
      </body>
    </html>
  );
}
