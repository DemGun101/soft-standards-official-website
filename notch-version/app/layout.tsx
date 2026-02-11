import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import ThemeProvider from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: "italic",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.softstandardsinc.com"),
  title: {
    default: "Soft Standards Inc. | AI-Powered Marketing Agency",
    template: "%s | Soft Standards Inc.",
  },
  description:
    "AI-powered marketing systems. Brand strategy, web dev, digital marketing & automation. 150+ systems. $47M+ client revenue.",
  keywords: [
    "AI marketing agency",
    "marketing automation agency",
    "web development agency NYC",
    "growth marketing",
    "brand strategy",
    "digital marketing agency",
    "AI automation",
  ],
  authors: [{ name: "Soft Standards Inc." }],
  creator: "Soft Standards Inc.",
  publisher: "Soft Standards Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.softstandardsinc.com",
    siteName: "Soft Standards Inc.",
    title: "Soft Standards Inc. | AI-Powered Marketing Agency",
    description:
      "AI-powered marketing systems. Brand strategy, web dev, digital marketing & automation. 150+ systems. $47M+ client revenue.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soft Standards Inc. | AI-Powered Marketing Agency",
    description:
      "AI-powered marketing systems. Brand strategy, web dev, digital marketing & automation. 150+ systems. $47M+ client revenue.",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} antialiased bg-background text-foreground transition-colors duration-300`}
      >
        {/* Skip to content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
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
              logo: "https://www.softstandardsinc.com/favicon.ico",
              description:
                "AI-powered marketing agency building complete marketing systems in 30 days. Brand strategy, web development, UI/UX, digital marketing, and AI automation.",
              email: "contact@softstandardsinc.com",
              foundingDate: "2022",
              numberOfEmployees: {
                "@type": "QuantitativeValue",
                value: 6,
              },
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
                url: "https://www.softstandardsinc.com",
              },
              areaServed: "Worldwide",
              knowsAbout: [
                "AI Automation",
                "Brand Strategy",
                "Web Development",
                "UI/UX Design",
                "Digital Marketing",
                "App Development",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Marketing Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Brand Strategy",
                      description:
                        "Strategic brand foundation — positioning, messaging, and identity",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Web Development",
                      description:
                        "Fast, conversion-optimized websites built with Next.js and React",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "UI/UX Design",
                      description:
                        "Research-backed, tested user interfaces",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Digital Marketing",
                      description:
                        "SEO, PPC, email, and social media as one integrated system",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Mobile App Development",
                      description:
                        "iOS, Android, and cross-platform apps using React Native",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Automation",
                      description:
                        "Custom AI agents, chatbots, and workflow automation",
                    },
                  },
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
                target:
                  "https://www.softstandardsinc.com/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        <ThemeProvider>
          <div id="main-content">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
