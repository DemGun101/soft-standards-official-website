import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Logos from "@/components/logos";
import ReviewSchema from "@/components/schemas/ReviewSchema";
import LocalBusinessSchema from "@/components/schemas/LocalBusinessSchema";
import FAQSchema from "@/components/schemas/FAQSchema";

// Below-the-fold components — code-split for faster initial load
const Certifications = dynamic(() => import("@/components/certifications"));
const ProblemSolution = dynamic(() => import("@/components/problem-solution"));
const HowItWorks = dynamic(() => import("@/components/how-it-works"));
const Services = dynamic(() => import("@/components/services"));
const Results = dynamic(() => import("@/components/results"));
const Portfolio = dynamic(() => import("@/components/portfolio"));
const Testimonials = dynamic(() => import("@/components/testimonials"));
const FAQ = dynamic(() => import("@/components/faq"));
const Booking = dynamic(() => import("@/components/booking"));
const Footer = dynamic(() => import("@/components/footer"));

export const metadata: Metadata = {
  title:
    "Soft Standards | AI-Powered Marketing Agency | New York & Lahore",
  description:
    "We don't just build your marketing — we run it. Brand strategy, web development, ads, and AI automation managed by one team, every month.",
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
      "We don't just build your marketing — we run it. Brand strategy, web development, ads, and AI automation managed by one team, every month.",
    type: "website",
    url: "https://www.softstandardsinc.com/",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Soft Standards | AI-Powered Marketing Agency | New York & Lahore",
    description:
      "We don't just build your marketing — we run it. Brand, website, ads, and automation managed by one team, every month.",
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
        <Certifications />
        <Services />
        <HowItWorks />
        <Results />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
