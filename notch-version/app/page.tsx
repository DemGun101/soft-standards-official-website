import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Logos from "@/components/logos";
import ReviewSchema from "@/components/schemas/ReviewSchema";
import LocalBusinessSchema from "@/components/schemas/LocalBusinessSchema";
import FAQSchema from "@/components/schemas/FAQSchema";

// Below-the-fold components — code-split for faster initial load
const ProblemSolution = dynamic(() => import("@/components/problem-solution"));
const HowItWorks = dynamic(() => import("@/components/how-it-works"));
const Services = dynamic(() => import("@/components/services"));
const Results = dynamic(() => import("@/components/results"));
const CaseStudies = dynamic(() => import("@/components/case-studies"));
const Pricing = dynamic(() => import("@/components/pricing"));
const FAQ = dynamic(() => import("@/components/faq"));
const Booking = dynamic(() => import("@/components/booking"));
const Footer = dynamic(() => import("@/components/footer"));

export const metadata: Metadata = {
  title:
    "Soft Standards | AI-Powered Marketing Agency | New York & Lahore",
  description:
    "We build complete marketing systems in 30 days — brand strategy, web development, UI/UX, AI automation, and growth marketing. 150+ systems built. $47M+ in client revenue. Pay only when it works.",
  keywords: [
    "AI marketing agency",
    "marketing automation agency",
    "web development agency NYC",
    "growth marketing",
    "brand strategy",
    "digital marketing agency",
    "AI automation",
  ],
  openGraph: {
    title:
      "Soft Standards | AI-Powered Marketing Agency | New York & Lahore",
    description:
      "We build complete marketing systems in 30 days — brand strategy, web development, UI/UX, AI automation, and growth marketing. 150+ systems built. $47M+ in client revenue.",
    type: "website",
    url: "https://www.softstandardsinc.com/",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Soft Standards | AI-Powered Marketing Agency | New York & Lahore",
    description:
      "We build complete marketing systems in 30 days — 150+ systems built, $47M+ in client revenue. Pay only when it works.",
  },
  alternates: { canonical: "https://www.softstandardsinc.com/" },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <ReviewSchema />
      <LocalBusinessSchema />
      <FAQSchema />
      <Nav />
      <main>
        <Hero />
        <Logos />
        <ProblemSolution />
        <HowItWorks />
        <Services />
        <Results />
        <CaseStudies />
        <Pricing />
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
