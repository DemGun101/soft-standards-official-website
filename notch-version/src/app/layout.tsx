import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SmoothScroll, PageTransition } from "@/components/animations";
import VoiceAgentLazy from "@/components/voice-agent/VoiceAgentLazy";
import CookieConsent from "@/components/CookieConsent";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://softstandards.net"),
  title: {
    default: "Soft Standards Inc. — AI-Powered Digital Marketing Agency",
    template: "%s | Soft Standards Inc.",
  },
  description: "AI-powered digital marketing agency specializing in web development, brand strategy, UI/UX design, app development, and marketing automation. 40+ projects delivered with 97% client retention.",
  keywords: ["digital marketing agency", "AI marketing", "web development agency", "brand strategy", "UI/UX design", "app development", "marketing automation", "SaaS marketing"],
  authors: [{ name: "Soft Standards Inc." }],
  creator: "Soft Standards Inc.",
  publisher: "Soft Standards Inc.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/logo-icon.svg", type: "image/svg+xml" },
    ],
    apple: "/images/logo-icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://softstandards.net",
    siteName: "Soft Standards Inc.",
    title: "Soft Standards Inc. — AI-Powered Digital Marketing Agency",
    description: "AI-powered digital marketing agency specializing in web development, brand strategy, UI/UX design, app development, and marketing automation.",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "Soft Standards Inc." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soft Standards Inc. — AI-Powered Digital Marketing Agency",
    description: "AI-powered digital marketing agency. Web development, brand strategy, UI/UX design, app development & marketing automation.",
    images: ["/images/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://softstandards.net",
    types: {
      "application/rss+xml": "/blog/rss.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased">
        {/* Skip to content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Soft Standards Inc.",
              url: "https://softstandards.net",
              logo: "https://softstandards.net/images/logo-icon.svg",
              description: "AI-powered digital marketing agency specializing in web development, brand strategy, UI/UX design, app development, and marketing automation.",
              email: "contact@softstandards.net",
              foundingDate: "2022",
              numberOfEmployees: { "@type": "QuantitativeValue", minValue: 6 },
              areaServed: "Worldwide",
              knowsAbout: ["AI Automation", "Brand Strategy", "Web Development", "UI/UX Design", "Digital Marketing", "App Development"],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Digital Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development", description: "High-performance websites built with modern tech stacks" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "App Development", description: "Native and cross-platform mobile applications" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "UI/UX Design", description: "User-centered design backed by research and testing" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Strategy", description: "Brand identities that cut through the noise" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing", description: "Data-driven campaigns that amplify reach and convert" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation", description: "Custom AI agents and workflow automation" } },
                ],
              },
              sameAs: [
                "https://www.linkedin.com/company/soft-standards-inc/",
                "https://instagram.com/softstandardsinc",
              ],
            }),
          }}
        />

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Soft Standards Inc.",
              url: "https://softstandards.net",
              publisher: {
                "@type": "Organization",
                name: "Soft Standards Inc.",
              },
            }),
          }}
        />

        <SmoothScroll>
          <PageTransition>
            <Navbar />
            <div id="main-content">
              {children}
            </div>
            <Footer />
          </PageTransition>
        </SmoothScroll>
        <VoiceAgentLazy />
        <CookieConsent />
      </body>
    </html>
  );
}
