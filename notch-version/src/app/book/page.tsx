import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRightIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Book a Call — Soft Standards Inc.',
  description: 'Schedule a free growth audit with our team. Let\'s discuss how we can help build your marketing machine.',
};

export default function BookPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-[clamp(140px,18vw,180px)] pb-8 px-[clamp(20px,5vw,80px)] text-center relative overflow-hidden">
        <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(124,58,237,0.08)_0%,transparent_70%)] rounded-full pointer-events-none" />

        <div className="text-[0.85rem] text-gray-500 mb-6 flex items-center justify-center gap-2">
          <Link href="/" className="text-purple-500 transition-colors hover:text-purple-400">Home</Link>
          <ChevronRightIcon />
          Book a Call
        </div>

        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-[-0.04em] leading-[1.05] max-w-[700px] mx-auto mb-4">
          Book Your Free <span className="text-gradient">Growth Audit</span>
        </h1>

        <p className="text-[clamp(1rem,2vw,1.15rem)] text-gray-500 max-w-[500px] mx-auto leading-[1.7] mb-2">
          15 minutes. No pitch. Just clarity on what&apos;s possible.
        </p>
      </section>

      {/* Calendar Section */}
      <section className="pb-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <div className="max-w-[900px] mx-auto">
          <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-gray-100 overflow-hidden">
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2rBf0ZGEkwVY-lSyRZWzdCWvzu3pyy9ZOBP8mvJbCzclGhX6yPvbKiO9UKV2VkawDnBISBuetY?gv=true"
              style={{ border: 0 }}
              width="100%"
              height="700"
              frameBorder="0"
              title="Book a Call - Soft Standards"
            />
          </div>

          {/* Trust Elements */}
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-400 mb-4">What to expect:</p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Quick 15-min call
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                No sales pressure
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Actionable insights
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
