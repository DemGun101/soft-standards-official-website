'use client';

import Link from 'next/link';
import { useState } from 'react';
import RevealOnScroll from '@/components/RevealOnScroll';
import { SectionHeader } from '@/components/Section';
import MagneticButton from '@/components/animations/MagneticButton';
import {
  MonitorIcon, SmartphoneIcon, LogInIcon, GlobeIcon, ActivityIcon,
  ArrowRightIcon, CheckCircleIcon
} from '@/components/Icons';
import HeroSection from '@/components/HeroSection';

const BOOKING_URL = '/book';

// Service pricing data
const services = [
  {
    id: 'web',
    name: 'Web Development',
    icon: MonitorIcon,
    description: 'High-performance websites built with modern tech stacks.',
    tiers: [
      {
        name: 'Starter',
        price: '$2,500',
        priceNote: 'Starting at',
        features: ['Full website (10+ pages)', 'Responsive design', 'CMS integration', 'SEO setup', 'Contact forms', '2 revision rounds', '10 days support'],
      },
      {
        name: 'Professional',
        price: '$3,500 - $8,000',
        priceNote: 'Range',
        features: ['Everything in Starter', 'Custom animations', 'E-commerce ready', 'Advanced integrations', 'Performance optimization', '3 revision rounds', '30 days support'],
        popular: true,
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        priceNote: 'Contact us',
        features: ['Everything in Professional', 'Dedicated team', 'Priority support', 'Custom solutions', 'SLA guarantee', 'Unlimited revisions', 'Ongoing maintenance'],
      },
    ],
  },
  {
    id: 'app',
    name: 'App Development',
    icon: SmartphoneIcon,
    description: 'Native and cross-platform mobile applications.',
    tiers: [
      {
        name: 'Starter',
        price: '$5,000',
        priceNote: 'Starting at',
        features: ['Cross-platform (React Native/Flutter)', 'MVP features', 'Basic UI/UX', 'App store submission', '2 revision rounds', '10 days support'],
      },
      {
        name: 'Professional',
        price: '$8,000 - $20,000',
        priceNote: 'Range',
        features: ['Everything in Starter', 'Native iOS + Android', 'Advanced features', 'Push notifications', 'Analytics integration', '3 revision rounds', '30 days support'],
        popular: true,
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        priceNote: 'Contact us',
        features: ['Everything in Professional', 'Custom backend', 'Scalable architecture', 'Security audit', 'Dedicated team', 'Unlimited revisions', 'Ongoing maintenance'],
      },
    ],
  },
  {
    id: 'design',
    name: 'UI/UX Design',
    icon: LogInIcon,
    description: 'User-centered design backed by research and testing.',
    tiers: [
      {
        name: 'Starter',
        price: '$800',
        priceNote: 'Starting at',
        features: ['User research', 'Wireframes', 'High-fidelity mockups', 'Prototype', 'Design system basics', '2 revision rounds'],
      },
      {
        name: 'Professional',
        price: '$1,500 - $4,000',
        priceNote: 'Range',
        features: ['Everything in Starter', 'User testing', 'Interaction design', 'Full design system', 'Developer handoff', '3 revision rounds'],
        popular: true,
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        priceNote: 'Contact us',
        features: ['Everything in Professional', 'Design workshops', 'Brand integration', 'Accessibility audit', 'Ongoing design support', 'Unlimited revisions'],
      },
    ],
  },
  {
    id: 'social',
    name: 'Social Media Marketing',
    icon: GlobeIcon,
    description: 'Content strategy, campaigns, and community management.',
    tiers: [
      {
        name: 'Starter',
        price: '$500',
        priceNote: 'per month',
        features: ['Content calendar', '12-15 posts/month', '2 platforms', 'Basic analytics report', 'Community management', 'Monthly strategy call'],
      },
      {
        name: 'Professional',
        price: '$800 - $2,000',
        priceNote: 'per month',
        features: ['Everything in Starter', '20-30 posts/month', '4 platforms', 'Ad management', 'Influencer outreach', 'Weekly reporting'],
        popular: true,
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        priceNote: 'Contact us',
        features: ['Everything in Professional', 'Dedicated manager', 'Custom campaigns', 'Video content', 'Crisis management', '24/7 monitoring'],
      },
    ],
  },
  {
    id: 'ai',
    name: 'AI Automation & Agents',
    icon: ActivityIcon,
    description: 'Chatbots, workflow automation, and custom AI solutions.',
    tiers: [
      {
        name: 'Starter',
        price: '$10,000',
        priceNote: 'Starting at',
        features: ['AI chatbot/assistant', 'Basic automation', 'Integration setup', 'Training & docs', '2 revision rounds', '10 days support'],
      },
      {
        name: 'Professional',
        price: '$15,000 - $35,000',
        priceNote: 'Range',
        features: ['Everything in Starter', 'Custom AI agents', 'Advanced workflows', 'Multi-platform integration', 'Performance tuning', '30 days support'],
        popular: true,
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        priceNote: 'Contact us',
        features: ['Everything in Professional', 'Custom ML models', 'Predictive analytics', 'Dedicated AI team', 'SLA guarantee', 'Ongoing optimization'],
      },
    ],
  },
];

// Bundle packages
const bundles = [
  {
    id: 'launch',
    name: 'Digital Launch',
    description: 'Perfect for startups ready to make their mark online.',
    includes: ['Web Development', 'UI/UX Design', 'Social Media (3 months)'],
    price: 'From $4,800',
    savings: '~$850',
    color: 'purple',
  },
  {
    id: 'product',
    name: 'Full Stack Product',
    description: 'Complete product development from design to deployment.',
    includes: ['App Development', 'UI/UX Design', 'Web Development'],
    price: 'From $7,500',
    savings: '~$1,300',
    color: 'cyan',
  },
  {
    id: 'ai-transform',
    name: 'AI Transformation',
    description: 'Modernize your business with AI-powered solutions.',
    includes: ['AI Automation & Agents', 'Web Development'],
    price: 'From $10,600',
    savings: '~$1,900',
    color: 'purple',
  },
  {
    id: 'complete',
    name: 'Complete Digital',
    description: 'The ultimate package for total digital transformation.',
    includes: ['All 5 Services'],
    price: 'Custom Quote',
    savings: '20% off',
    color: 'gradient',
  },
];

// FAQ items
const faqs = [
  {
    question: 'What payment options do you offer?',
    answer: 'We offer flexible monthly installments. No large upfront payment required. We work with you to find a payment schedule that fits your budget.',
  },
  {
    question: "What's included in the 10-day support?",
    answer: 'Bug fixes, minor adjustments, and technical assistance after launch. This ensures your project runs smoothly after going live.',
  },
  {
    question: 'How many revisions are included?',
    answer: '2 revision rounds are included in Starter packages, 3 in Professional. Additional rounds are available for $150 each.',
  },
  {
    question: 'Do you offer rush delivery?',
    answer: 'Yes! 50% faster delivery is available for an additional 25% of the project cost. Contact us to discuss your timeline.',
  },
  {
    question: 'Can I combine services for a discount?',
    answer: 'Absolutely! Our bundled packages save 15-20% compared to individual services. Check out our bundles section above.',
  },
  {
    question: 'What if my project is larger than Starter tier?',
    answer: "Contact us for a custom quote. We'll assess your requirements and tailor a solution that fits your specific needs.",
  },
];

export default function PricingContent() {
  const [activeTab, setActiveTab] = useState<'services' | 'bundles'>('services');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <>
      <HeroSection
        title={<>Transparent <span className="text-gradient">Pricing</span></>}
        subtitle="Budget-friendly packages designed for every stage of growth. No hidden fees, just honest pricing."
        breadcrumbs={[{ href: '/', label: 'Home' }]}
        breadcrumbCurrent="Pricing"
        background="dark"
        showScrollIndicator={false}
      />

      {/* Tab Toggle */}
      <section className="bg-[#0F172A] pb-[clamp(40px,5vw,60px)] -mt-[clamp(40px,5vw,60px)] text-center relative z-10">
        <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1.5 border border-white/10">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-6 py-2.5 rounded-full text-[0.9rem] font-semibold transition-all ${
              activeTab === 'services'
                ? 'bg-purple-500 text-white shadow-lg'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Individual Services
          </button>
          <button
            onClick={() => setActiveTab('bundles')}
            className={`px-6 py-2.5 rounded-full text-[0.9rem] font-semibold transition-all ${
              activeTab === 'bundles'
                ? 'bg-purple-500 text-white shadow-lg'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Bundles (Save 15%+)
          </button>
        </div>
      </section>

      {/* Services Section */}
      {activeTab === 'services' && (
        <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
          <div className="max-w-[1400px] mx-auto">
            {services.map((service, serviceIndex) => (
              <RevealOnScroll key={service.id} delay={serviceIndex * 0.5}>
                <div className="mb-16 last:mb-0">
                  {/* Service Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-[52px] h-[52px] flex items-center justify-center bg-purple-50 rounded-[20px]">
                      <service.icon />
                    </div>
                    <div>
                      <h2 className="text-[1.5rem] font-bold text-gray-900">{service.name}</h2>
                      <p className="text-gray-500 text-[0.95rem]">{service.description}</p>
                    </div>
                  </div>

                  {/* Pricing Tiers */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {service.tiers.map((tier) => (
                      <div
                        key={tier.name}
                        className={`relative bg-white rounded-[28px] border p-8 transition-all duration-350 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)] ${
                          tier.popular
                            ? 'border-purple-300 shadow-[0_4px_20px_rgba(124,58,237,0.15)]'
                            : 'border-black/5'
                        }`}
                      >
                        {tier.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-500 text-white text-[0.75rem] font-semibold rounded-full">
                            Most Popular
                          </div>
                        )}

                        <div className="text-center mb-6">
                          <h3 className="text-[1.1rem] font-bold text-gray-900 mb-2">{tier.name}</h3>
                          <p className="text-[0.8rem] text-gray-400 mb-2">{tier.priceNote}</p>
                          <p className="text-[2rem] font-extrabold text-gray-900">{tier.price}</p>
                        </div>

                        <ul className="space-y-3 mb-8">
                          {tier.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-[0.9rem] text-gray-600">
                              <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <MagneticButton strength={0.2}>
                          <Link
                            href={BOOKING_URL}
                            className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[0.9rem] font-semibold transition-all ${
                              tier.popular
                                ? 'bg-purple-500 text-white hover:bg-purple-600'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {tier.price === 'Custom' ? 'Contact Us' : 'Get Started'}
                            <ArrowRightIcon />
                          </Link>
                        </MagneticButton>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      )}

      {/* Bundles Section */}
      {activeTab === 'bundles' && (
        <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
          <RevealOnScroll>
            <SectionHeader
              badge="Save More"
              title={<>Bundled <span className="text-gradient">Packages</span></>}
              subtitle="Combine services and save 15-20% compared to individual pricing."
            />
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1000px] mx-auto">
            {bundles.map((bundle, index) => (
              <RevealOnScroll key={bundle.id} delay={index * 0.5}>
                <div className={`relative bg-white rounded-[28px] border border-black/5 p-8 transition-all duration-350 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)] ${
                  bundle.color === 'gradient' ? 'bg-gradient-to-br from-purple-50 to-cyan-50' : ''
                }`}>
                  {/* Savings Badge */}
                  <div className={`absolute -top-3 right-6 px-4 py-1 text-white text-[0.75rem] font-semibold rounded-full ${
                    bundle.color === 'cyan' ? 'bg-cyan-500' : 'bg-purple-500'
                  }`}>
                    Save {bundle.savings}
                  </div>

                  <h3 className="text-[1.3rem] font-bold text-gray-900 mb-2">{bundle.name}</h3>
                  <p className="text-gray-500 text-[0.9rem] mb-4">{bundle.description}</p>

                  <div className="mb-6">
                    <p className="text-[0.8rem] text-gray-400 mb-1">Includes:</p>
                    <div className="flex flex-wrap gap-2">
                      {bundle.includes.map((item) => (
                        <span key={item} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-[0.8rem] font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <p className="text-[1.8rem] font-extrabold text-gray-900">{bundle.price}</p>
                    <MagneticButton strength={0.2}>
                      <Link
                        href={BOOKING_URL}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-full text-[0.9rem] font-semibold transition-all hover:bg-purple-600"
                      >
                        Get Bundle
                        <ArrowRightIcon />
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      )}

      {/* What's Included */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)] bg-[#F8FAFC]">
        <RevealOnScroll>
          <SectionHeader
            badge="All Plans Include"
            title={<>Standard <span className="text-gradient">Benefits</span></>}
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1000px] mx-auto">
            {[
              { title: 'Monthly Payments', desc: 'Flexible installment options' },
              { title: '10 Days Support', desc: 'Post-launch assistance included' },
              { title: '2 Revision Rounds', desc: 'Fine-tune your project' },
              { title: 'Project Manager', desc: 'Dedicated point of contact' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-4">
                  <CheckCircleIcon className="w-6 h-6" />
                </div>
                <h4 className="text-[1rem] font-bold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-[0.85rem] text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* Add-ons */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SectionHeader
            badge="Optional"
            title={<>Add-On <span className="text-gradient">Services</span></>}
            subtitle="Enhance your package with these optional extras."
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="max-w-[800px] mx-auto bg-white rounded-[28px] border border-black/5 overflow-hidden">
            {[
              { name: 'Extra revision round', price: '$150' },
              { name: 'Extended support (30 days)', price: '$300' },
              { name: 'Rush delivery (50% faster)', price: '+25%' },
              { name: 'Source files & assets', price: '$200' },
              { name: 'Training session (1hr)', price: '$100' },
            ].map((addon, i) => (
              <div key={i} className={`flex items-center justify-between px-8 py-5 ${i !== 4 ? 'border-b border-black/5' : ''}`}>
                <span className="text-[0.95rem] text-gray-700 font-medium">{addon.name}</span>
                <span className="text-[1rem] font-bold text-purple-600">{addon.price}</span>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* FAQ */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)] bg-[#F8FAFC]">
        <RevealOnScroll>
          <SectionHeader
            badge="FAQ"
            title={<>Common <span className="text-gradient">Questions</span></>}
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="max-w-[800px] mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-[20px] border border-black/5 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-[0.95rem] font-semibold text-gray-900">{faq.question}</span>
                  <span className={`text-purple-500 text-xl font-bold transition-transform ${expandedFaq === i ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {expandedFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-[0.9rem] text-gray-500 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* CTA Banner */}
      <section className="py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <div className="bg-purple-500 rounded-[36px] py-[clamp(48px,6vw,80px)] px-[clamp(24px,4vw,64px)] text-center relative overflow-hidden max-w-[1200px] mx-auto">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white tracking-[-0.03em] mb-3 relative">
              Not sure which plan fits?
            </h2>
            <p className="text-[1.05rem] text-white/80 mb-8 relative">
              Let&apos;s chat and find the perfect solution for your needs.
            </p>
            <MagneticButton strength={0.2}>
              <Link
                href={BOOKING_URL}
                className="inline-flex items-center gap-2.5 px-9 py-4 bg-white text-purple-700 rounded-full text-base font-semibold transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] relative"
              >
                Book a Free Consultation
                <ArrowRightIcon />
              </Link>
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
