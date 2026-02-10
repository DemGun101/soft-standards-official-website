import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';

export const metadata: Metadata = {
  title: 'Book a Free Growth Audit',
  description: "Free 15-min growth audit. We analyze your marketing and give you a plan. Limited to 4 clients/month.",
  keywords: ['free marketing consultation', 'growth audit', 'book marketing call', 'digital marketing consultation'],
  openGraph: {
    title: 'Book a Free Growth Audit | Soft Standards Inc.',
    description: "Free 15-min growth audit. We analyze your marketing and give you a plan. Limited to 4 clients/month.",
    type: 'website',
    url: 'https://www.softstandardsinc.com/book',
  },
  alternates: { canonical: '/book' },
};

export default function BookPage() {
  return (
    <>
      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Free Growth Audit',
            description: "Free 15-minute strategy call. We'll tell you what's broken, how we'd fix it, and what it would cost.",
            provider: { '@type': 'Organization', name: 'Soft Standards' },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              description: 'Free 15-minute growth audit consultation',
            },
            url: 'https://www.softstandardsinc.com/book',
          }),
        }}
      />

      <HeroSection
        title={<>Book a Free Marketing Growth Audit — <span className="text-gradient">15 Minutes, No Pitch</span></>}
        subtitle="We'll tell you what's broken, how we'd fix it, and what it would cost. Even if we're not the right fit."
        breadcrumbs={[{ href: '/', label: 'Home' }]}
        breadcrumbCurrent="Book a Call"
        background="light"
        showScrollIndicator={false}
      />

      {/* What You'll Get */}
      <section className="px-[clamp(20px,5vw,80px)] -mt-6 pb-[clamp(40px,6vw,80px)]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[clamp(1.4rem,3vw,1.8rem)] font-extrabold text-gray-900 tracking-[-0.02em] mb-6 text-center">
            What You&apos;ll Get in 15 Minutes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
              <h3 className="text-base font-bold text-gray-900 mb-2">A Diagnosis of What&apos;s Broken in Your Marketing</h3>
              <p className="text-sm text-gray-500 leading-relaxed">We&apos;ll review your current setup and identify the gaps holding you back.</p>
            </div>
            <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
              <h3 className="text-base font-bold text-gray-900 mb-2">A Clear Recommendation on How to Fix It</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Actionable next steps you can take — whether you work with us or not.</p>
            </div>
            <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
              <h3 className="text-base font-bold text-gray-900 mb-2">An Honest Estimate of Cost and Timeline</h3>
              <p className="text-sm text-gray-500 leading-relaxed">No hidden fees, no surprises. Just a straight answer on what it would take.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="pb-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[clamp(1.4rem,3vw,1.8rem)] font-extrabold text-gray-900 tracking-[-0.02em] mb-6 text-center">
            Schedule Your Free Growth Audit
          </h2>
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

      {/* Contact Form CTA */}
      <section className="pb-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-[clamp(1.4rem,3vw,1.8rem)] font-extrabold text-gray-900 tracking-[-0.02em] mb-3">
            Not Ready for a Call? Send Us a Message.
          </h2>
          <p className="text-[0.95rem] text-gray-500 mb-6">
            Email us at{' '}
            <a href="mailto:contact@softstandardsinc.com" className="text-purple-500 font-semibold hover:underline">
              contact@softstandardsinc.com
            </a>{' '}
            and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>
    </>
  );
}
