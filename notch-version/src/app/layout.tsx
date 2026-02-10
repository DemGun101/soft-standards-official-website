import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A2E" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.softstandardsinc.com"),
  title: {
    default: "Soft Standards Inc. | AI-Powered Marketing Agency",
    template: "%s | Soft Standards Inc.",
  },
  description: "AI-powered marketing systems. Brand strategy, web dev, digital marketing & automation. 150+ systems. $47M+ client revenue.",
  keywords: ["AI marketing agency", "marketing automation agency", "web development agency NYC", "growth marketing", "brand strategy", "digital marketing agency", "AI automation"],
  authors: [{ name: "Soft Standards Inc." }],
  creator: "Soft Standards Inc.",
  publisher: "Soft Standards Inc.",
  verification: {
    google: "YOUR_VERIFICATION_CODE",
  },
  icons: {
    icon: [
      { url: "/images/logo-icon.svg", type: "image/svg+xml" },
    ],
    apple: "/images/logo-icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.softstandardsinc.com",
    siteName: "Soft Standards Inc.",
    title: "Soft Standards Inc. | AI-Powered Marketing Agency",
    description: "AI-powered marketing systems. Brand strategy, web dev, digital marketing & automation. 150+ systems. $47M+ client revenue.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soft Standards Inc. | AI-Powered Marketing Agency",
    description: "AI-powered marketing systems. Brand strategy, web dev, digital marketing & automation. 150+ systems. $47M+ client revenue.",
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
    canonical: "https://www.softstandardsinc.com",
    types: {
      "application/rss+xml": "/blog/rss.xml",
    },
  },
  category: "Marketing Agency",
  classification: "Business",
  other: {
    "geo.region": "US-NY",
    "geo.placename": "New York",
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
              name: "Soft Standards",
              legalName: "Soft Standards Inc.",
              url: "https://www.softstandardsinc.com",
              logo: "https://www.softstandardsinc.com/images/logo-icon.svg",
              description: "AI-powered marketing agency building complete marketing systems in 30 days. Brand strategy, web development, UI/UX, digital marketing, and AI automation.",
              email: "contact@softstandardsinc.com",
              foundingDate: "2022",
              numberOfEmployees: { "@type": "QuantitativeValue", value: 6 },
              address: [
                {
                  "@type": "PostalAddress",
                  streetAddress: "18820B 69th Ave Apt 1B",
                  addressLocality: "Fresh Meadows",
                  addressRegion: "NY",
                  postalCode: "11365",
                  addressCountry: "US",
                },
                {
                  "@type": "PostalAddress",
                  addressLocality: "Lahore",
                  addressRegion: "Punjab",
                  addressCountry: "PK",
                },
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                url: "https://www.softstandardsinc.com/book",
              },
              areaServed: "Worldwide",
              knowsAbout: ["AI Automation", "Brand Strategy", "Web Development", "UI/UX Design", "Digital Marketing", "App Development"],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Marketing Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Strategy", description: "Strategic brand foundation — positioning, messaging, and identity" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development", description: "Fast, conversion-optimized websites built with Next.js and React" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "UI/UX Design", description: "Research-backed, tested user interfaces" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing", description: "SEO, PPC, email, and social media as one integrated system" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development", description: "iOS, Android, and cross-platform apps using React Native" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation", description: "Custom AI agents, chatbots, and workflow automation" } },
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
              name: "Soft Standards",
              url: "https://www.softstandardsinc.com",
              publisher: {
                "@type": "Organization",
                name: "Soft Standards",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.softstandardsinc.com/blog?q={search_term_string}",
                "query-input": "required name=search_term_string",
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
