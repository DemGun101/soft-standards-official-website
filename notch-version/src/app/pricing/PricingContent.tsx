'use client';

import Link from 'next/link';
import { useState } from 'react';
import RevealOnScroll from '@/components/RevealOnScroll';
import { SectionHeader } from '@/components/Section';
import MagneticButton from '@/components/animations/MagneticButton';
import { ArrowRightIcon, CheckCircleIcon } from '@/components/Icons';
import HeroSection from '@/components/HeroSection';

const BOOKING_URL = '/book';

// 3-Phase model data
const phases = [
  {
    num: '01',
    label: 'Build',
    title: 'Reduced Upfront Build Cost',
    body: 'You pay a reduced project fee to cover the build. We design and develop your entire marketing system \u2014 brand, website, funnels, automations, campaigns \u2014 in 30 days. You own everything from day one.',
    color: 'purple',
  },
  {
    num: '02',
    label: 'Prove',
    title: '30-Day Proof Period at No Cost',
    body: 'Your system goes live. For 30 days, we run it, optimize it, and track the KPIs we agreed on together \u2014 leads, revenue, traffic, or whatever matters to your business. You pay nothing during this period.',
    color: 'cyan',
  },
  {
    num: '03',
    label: 'Grow',
    title: 'Monthly Retainer Only When KPIs Are Hit',
    body: 'Once your system is delivering results, the retainer kicks in. We continuously optimize, manage, and scale your system. Month-to-month. Cancel anytime. No lock-in.',
    color: 'purple',
  },
];

// Pricing tiers
const tiers = [
  {
    name: 'Launch System',
    subtitle: 'Starting at $3,500',
    audience: 'Founders and early-stage businesses',
    buildFee: 'Starting at $3,500',
    proofPeriod: '30 days \u2014 $0',
    retainer: '$2,000/month (when KPIs hit)',
    features: [
      'Brand strategy & positioning',
      'Conversion-optimized website',
      'Email sequences & automations',
      'Ad creative + campaign setup',
      '30 days post-launch optimization',
    ],
    kpis: [
      'Lead volume targets',
      'Website traffic benchmarks',
      'Conversion rate thresholds',
      'Cost-per-lead targets',
    ],
    cta: 'See If You Qualify',
    featured: false,
  },
  {
    name: 'Scale System',
    subtitle: 'Starting at $5,500',
    audience: 'Businesses already making money who need a system to multiply it',
    buildFee: 'Starting at $5,500',
    proofPeriod: '30 days \u2014 $0',
    retainer: '$2,500/month (when KPIs hit)',
    features: [
      'Everything in Launch, plus:',
      'Advanced funnel architecture',
      'AI automation & chatbots',
      'Multi-channel ad management',
      'Custom integrations',
      '60 days post-launch optimization',
    ],
    kpis: [
      'Revenue attribution',
      'Pipeline value targets',
      'CAC targets',
      'Retention & LTV metrics',
    ],
    cta: 'See If You Qualify',
    featured: true,
  },
  {
    name: 'Enterprise System',
    subtitle: 'Custom Pricing',
    audience: 'Companies needing a dedicated team',
    buildFee: 'Custom',
    proofPeriod: '30 days \u2014 $0',
    retainer: 'Starting at $3,000/month',
    features: [
      'Dedicated team',
      'Priority support & SLA',
      'Unlimited revisions',
      'Weekly strategy calls',
      'Custom AI solutions',
      'Multi-market campaigns',
    ],
    kpis: [],
    cta: "Let\u2019s Talk",
    featured: false,
  },
];

// What's always included
const included = [
  {
    title: 'Full Asset Ownership From Day One',
    desc: 'Everything we build is yours \u2014 website, brand, code, funnels, automations, ad accounts. No hostage situations. Ever.',
  },
  {
    title: 'Post-Launch Optimization Included',
    desc: 'Every system comes with 30\u201360 days of post-launch optimization at no extra charge. We don\u2019t launch and leave.',
  },
  {
    title: 'Cancel-Anytime Monthly Retainer',
    desc: 'Month-to-month. No contracts, no penalties, no lock-in. Stay because it works, not because you\u2019re stuck.',
  },
];

// FAQ items
const faqs = [
  {
    question: 'How does the pricing model work?',
    answer: 'Three phases. First, you pay a reduced build fee and we construct your entire marketing system in 30 days. Second, we launch it and run a 30-day proof period where we track agreed KPIs \u2014 you pay nothing. Third, once the system is delivering results, a monthly retainer kicks in for ongoing optimization. You can cancel the retainer anytime.',
  },
  {
    question: 'What happens during the 30-day proof period?',
    answer: 'Everything runs live. We manage your campaigns, track your metrics, and optimize in real-time. At the end of 30 days, we compare results against the KPIs we agreed on. If they\u2019re hit, the retainer starts. If they\u2019re not, we keep working \u2014 no extra charge.',
  },
  {
    question: 'What if I want to cancel the retainer?',
    answer: 'Cancel anytime. No penalties, no notice period, no drama. You own everything we built \u2014 the website, the brand, the funnels, the automations, the ad accounts. It all stays yours.',
  },
  {
    question: 'How much does the upfront build cost?',
    answer: 'It depends on the system. Launch starts at $3,500, Scale at $5,500, Enterprise is custom. Book a free 15-minute call \u2014 we\u2019ll scope it and give you an honest number.',
  },
  {
    question: 'What KPIs do you typically guarantee?',
    answer: 'It depends on your business goals. Common ones include: lead volume per month, cost per lead, website traffic, conversion rates, revenue attribution, and pipeline value. We agree on specific, measurable targets before we start building.',
  },
  {
    question: 'Do I own the assets if I cancel?',
    answer: 'Yes. 100%. Website, brand, code, ad accounts, automations, content \u2014 everything is yours from day one. We don\u2019t hold anything hostage. Ever.',
  },
];

export default function PricingContent() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <HeroSection
        title={<>Performance-Based Marketing <span className="text-gradient">Pricing</span></>}
        subtitle="Most agencies charge you monthly and hope something works. We build your entire marketing system, prove it delivers, and only then do you pay for ongoing growth. If it doesn't work, you don't pay. Period."
        badge="How It Works"
        breadcrumbs={[{ href: '/', label: 'Home' }]}
        breadcrumbCurrent="Pricing"
        background="dark"
        showScrollIndicator={false}
      />

      {/* How The Model Works — 3-Phase Visual */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SectionHeader
            badge="The Model"
            title={<>How Our Build + Prove + Grow <span className="text-gradient">Model Works</span></>}
          />
        </RevealOnScroll>

        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start justify-center gap-0 relative px-[clamp(20px,5vw,40px)]">
            {phases.map((phase, index) => (
              <div key={phase.num} className="flex-1 text-center relative px-4 pb-10 lg:pb-0">
                {index < 2 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] right-[calc(-50%+28px)] h-0.5 bg-gray-100" />
                )}
                <div className={`w-14 h-14 flex items-center justify-center rounded-full text-[1.1rem] font-bold mx-auto mb-4 relative z-10 transition-all hover:scale-110 ${
                  phase.color === 'cyan'
                    ? 'bg-cyan-500 text-white hover:shadow-[0_4px_20px_rgba(6,182,212,0.3)]'
                    : 'bg-purple-500 text-white hover:shadow-[0_4px_20px_rgba(124,58,237,0.3)]'
                }`}>
                  {phase.num}
                </div>
                <span className={`inline-flex px-3.5 py-1 rounded-full text-[0.8rem] font-bold mb-3 ${
                  phase.color === 'cyan'
                    ? 'bg-cyan-50 text-cyan-700'
                    : 'bg-purple-50 text-purple-700'
                }`}>
                  {phase.label}
                </span>
                <h3 className="text-[1.1rem] font-bold text-gray-900 mb-2">{phase.title}</h3>
                <p className="text-[0.85rem] text-gray-500 leading-[1.7]">{phase.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)] bg-[#F8FAFC]">
        <RevealOnScroll>
          <SectionHeader
            badge="Pricing Tiers"
            title={<>Marketing System <span className="text-gradient">Pricing</span></>}
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {tiers.map((tier, index) => (
            <RevealOnScroll key={tier.name} delay={index + 1}>
              <div
                className={`relative bg-white rounded-[28px] border p-8 h-full flex flex-col transition-all duration-350 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)] ${
                  tier.featured
                    ? 'border-purple-300 shadow-[0_4px_20px_rgba(124,58,237,0.15)] lg:scale-[1.03]'
                    : 'border-black/5'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-500 text-white text-[0.75rem] font-semibold rounded-full">
                    Most Popular
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-[1.3rem] font-bold text-gray-900 mb-1">{tier.name}</h3>
                  <p className="text-[1.6rem] font-extrabold text-gray-900">{tier.subtitle}</p>
                  <p className="text-[0.85rem] text-gray-500 mt-2">{tier.audience}</p>
                </div>

                {/* Pricing details */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-[0.85rem] text-gray-500">Build Fee</span>
                    <span className="text-[0.9rem] font-semibold text-gray-900">{tier.buildFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[0.85rem] text-gray-500">Proof Period</span>
                    <span className="text-[0.9rem] font-semibold text-green-600">{tier.proofPeriod}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[0.85rem] text-gray-500">Retainer</span>
                    <span className="text-[0.9rem] font-semibold text-gray-900">{tier.retainer}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <p className="text-[0.8rem] font-semibold text-gray-400 uppercase tracking-wider mb-3">Includes</p>
                  <ul className="space-y-2.5">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[0.9rem] text-gray-600">
                        <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* KPIs */}
                {tier.kpis.length > 0 && (
                  <div className="mb-6">
                    <p className="text-[0.8rem] font-semibold text-gray-400 uppercase tracking-wider mb-3">KPIs We Track</p>
                    <ul className="space-y-2">
                      {tier.kpis.map((kpi, i) => (
                        <li key={i} className="flex items-center gap-2 text-[0.85rem] text-gray-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                          {kpi}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-auto">
                  <MagneticButton strength={0.2}>
                    <Link
                      href={BOOKING_URL}
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[0.9rem] font-semibold transition-all ${
                        tier.featured
                          ? 'bg-purple-500 text-white hover:bg-purple-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tier.cta}
                      <ArrowRightIcon />
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* What's Always Included */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SectionHeader
            badge="Every System"
            title={<>What Every Marketing System <span className="text-gradient">Includes</span></>}
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {included.map((item, index) => (
            <RevealOnScroll key={item.title} delay={index + 1}>
              <div className="bg-white/50 backdrop-blur-xl border border-black/[0.04] rounded-[28px] p-8 h-full transition-all duration-350 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
                <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full mb-4">
                  <CheckCircleIcon className="w-6 h-6" />
                </div>
                <h3 className="text-[1.05rem] font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-[0.9rem] text-gray-500 leading-[1.7]">{item.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* The Guarantee */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)] bg-[#F8FAFC]">
        <RevealOnScroll>
          <div className="max-w-[800px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-purple-50 border border-purple-100 rounded-full text-[0.85rem] font-semibold text-purple-700 mb-5">
              Our Promise
            </div>
            <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold tracking-tight leading-[1.1] mb-6">
              Our Performance <span className="text-gradient">Guarantee</span>
            </h2>
            <p className="text-[clamp(1rem,1.8vw,1.15rem)] text-gray-500 leading-[1.8] max-w-[640px] mx-auto">
              We agree on KPIs before we start. If your system doesn&apos;t hit those numbers during the proof period, the retainer doesn&apos;t start. We keep optimizing until it does &mdash; at no extra cost. If we genuinely can&apos;t deliver what we promised, we&apos;ll tell you. We&apos;d rather lose a deal than lose your trust.
            </p>
          </div>
        </RevealOnScroll>
      </section>

      {/* FAQ */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SectionHeader
            badge="FAQ"
            title={<>Frequently Asked <span className="text-gradient">Questions</span></>}
          />
        </RevealOnScroll>

        <div className="max-w-[800px] mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <RevealOnScroll key={i} delay={(i % 3) + 1}>
              <div className="bg-white rounded-[20px] border border-black/5 overflow-hidden transition-all">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-[0.95rem] font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <span className={`flex-shrink-0 w-6 h-6 text-purple-500 transition-transform duration-200 ${expandedFaq === i ? 'rotate-45' : ''}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                {expandedFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-[0.9rem] text-gray-500 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <div className="bg-purple-500 rounded-[36px] py-[clamp(48px,6vw,80px)] px-[clamp(24px,4vw,64px)] text-center relative overflow-hidden max-w-[1200px] mx-auto">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />
            <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-extrabold text-white tracking-[-0.03em] mb-4 relative max-w-[700px] mx-auto leading-[1.2]">
              Book a Free Growth Audit &mdash; Get an Honest Quote in 15 Minutes
            </h2>
            <p className="text-[clamp(0.9rem,1.5vw,1.05rem)] text-white/80 mb-8 relative max-w-[600px] mx-auto leading-[1.7]">
              The worst agencies are the cheapest ones. The second worst charge a lot and deliver nothing. We&apos;re neither &mdash; and we&apos;ll prove it before you ever pay a retainer.
            </p>
            <MagneticButton strength={0.2}>
              <Link
                href={BOOKING_URL}
                className="inline-flex items-center gap-2.5 px-9 py-4 bg-white text-purple-700 rounded-full text-base font-semibold transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] relative"
              >
                Book Your Free Growth Audit
                <ArrowRightIcon />
              </Link>
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
