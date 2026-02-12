import type { Metadata } from "next";
import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Logos from "@/components/logos";
import ProblemSolution from "@/components/problem-solution";
import HowItWorks from "@/components/how-it-works";
import Services from "@/components/services";
import Results from "@/components/results";
import CaseStudies from "@/components/case-studies";
import Pricing from "@/components/pricing";
import FAQ from "@/components/faq";
import Booking from "@/components/booking";
import Footer from "@/components/footer";
import ReviewSchema from "@/components/schemas/ReviewSchema";
import LocalBusinessSchema from "@/components/schemas/LocalBusinessSchema";
import FAQSchema from "@/components/schemas/FAQSchema";

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
