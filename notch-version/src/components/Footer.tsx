'use client';

import Link from 'next/link';
import SoftStandardsLogoIcon from './SoftStandardsLogoIcon';
import { LinkedInIcon, InstagramIcon, MailIcon } from './Icons';

const quickLinks = [
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
];

const serviceLinks = [
  { href: '/services', label: 'Brand Strategy' },
  { href: '/services', label: 'Web Development' },
  { href: '/services', label: 'UI/UX Design' },
  { href: '/services', label: 'Digital Marketing' },
];

const socialLinks = [
  { href: 'https://www.linkedin.com/company/soft-standards-inc/', label: 'LinkedIn', icon: LinkedInIcon },
  { href: 'https://instagram.com/softstandards', label: 'Instagram', icon: InstagramIcon },
  { href: 'mailto:contact@softstandards.net', label: 'Email', icon: MailIcon },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0F172A] text-white pt-[clamp(60px,8vw,100px)] px-[clamp(20px,5vw,80px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-8 lg:gap-12 max-w-[1400px] mx-auto pb-[60px] border-b border-white/[0.08]">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-block">
            <SoftStandardsLogoIcon className="h-8 w-auto" autoPlay={false} hoverEffect />
          </Link>
          <p className="text-gray-500 text-[0.9rem] leading-[1.7] mt-4 max-w-[300px]">
            The New Standard in Digital. AI automation, brand strategy, web development, and digital marketing — crafted with care from New York.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <div className="text-[0.85rem] font-bold uppercase tracking-[0.08em] text-gray-500 mb-5">
            Quick Links
          </div>
          {quickLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="block text-gray-300 text-[0.9rem] py-1.5 transition-colors hover:text-purple-400"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Services */}
        <div>
          <div className="text-[0.85rem] font-bold uppercase tracking-[0.08em] text-gray-500 mb-5">
            Services
          </div>
          {serviceLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-gray-300 text-[0.9rem] py-1.5 transition-colors hover:text-purple-400"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div>
          <div className="text-[0.85rem] font-bold uppercase tracking-[0.08em] text-gray-500 mb-5">
            Stay Updated
          </div>
          <p className="text-gray-500 text-[0.85rem] mb-4">
            Subscribe to our newsletter for insights and updates.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-5 py-3 bg-white/[0.06] border border-white/10 rounded-full text-white text-[0.9rem]
                placeholder:text-gray-500 outline-none transition-colors focus:border-purple-500"
            />
            <button className="px-5 py-3 bg-purple-500 text-white rounded-full font-semibold text-[0.85rem] whitespace-nowrap transition-colors hover:bg-purple-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-[1400px] mx-auto py-6 text-[0.85rem] text-gray-500 gap-4">
        <span>&copy; 2026 Soft Standards Inc. All rights reserved.</span>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  link.label === 'LinkedIn'
                    ? 'bg-[#0A66C2] text-white hover:bg-[#004182]'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                aria-label={link.label}
              >
                <Icon className="w-5 h-5" />
                {link.label === 'LinkedIn' && <span className="text-sm font-medium">Follow us</span>}
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
