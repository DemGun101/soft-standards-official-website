import type { Metadata } from "next";
import Booking from "@/components/booking";

export const metadata: Metadata = {
  title: "Book a Call — Soft Standards",
  description: "15 minutes. No pitch. Just clarity. Book a free strategy call with Soft Standards.",
  alternates: {
    canonical: "https://www.softstandardsinc.com/book",
  },
};

export default function BookPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <Booking />
    </main>
  );
}
