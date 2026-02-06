import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';

export const metadata: Metadata = {
  title: 'Book a Free Growth Audit — 15 Min Call',
  description: 'Schedule a free 15-minute growth audit with Soft Standards. No pitch, just clarity on how AI-powered marketing can scale your business. Book your slot today.',
  keywords: ['free marketing consultation', 'growth audit', 'book marketing call', 'digital marketing consultation'],
  openGraph: {
    title: 'Book a Free Growth Audit — Soft Standards Inc.',
    description: 'Schedule a free 15-minute growth audit. No pitch, just clarity on what\'s possible for your business.',
    type: 'website',
    url: 'https://softstandards.net/book',
  },
  alternates: { canonical: 'https://softstandards.net/book' },
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
