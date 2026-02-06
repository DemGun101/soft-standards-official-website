import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';

export const metadata: Metadata = {
  title: 'Book a Call — Soft Standards Inc.',
  description: 'Schedule a free growth audit with our team. Let\'s discuss how we can help build your marketing machine.',
};

export default function BookPage() {
  return (
    <>
      <HeroSection
        title={<>Book Your Free <span className="text-gradient">Growth Audit</span></>}
        subtitle="15 minutes. No pitch. Just clarity on what's possible."
        breadcrumbs={[{ href: '/', label: 'Home' }]}
        breadcrumbCurrent="Book a Call"
        background="light"
        showScrollIndicator={false}
      />

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
