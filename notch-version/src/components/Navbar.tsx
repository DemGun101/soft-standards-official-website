'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import SoftStandardsLogoIcon from './SoftStandardsLogoIcon';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-2 pr-2 flex items-center justify-between gap-2
        backdrop-blur-xl bg-[rgba(15,23,42,0.85)] border border-white/10 rounded-full
        shadow-[0_4px_30px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.05)_inset]
        transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] max-w-[90vw]
        hover:bg-[rgba(15,23,42,0.95)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.08)_inset]
        ${isScrolled ? 'bg-[rgba(15,23,42,0.95)] shadow-[0_8px_40px_rgba(0,0,0,0.25)]' : ''}`}
    >
      <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
        <SoftStandardsLogoIcon className="h-[26px] w-auto" autoPlay={false} hoverEffect />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex items-center gap-1">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`text-white/70 text-[0.85rem] font-medium px-3.5 py-2 rounded-full transition-all whitespace-nowrap
                hover:text-white hover:bg-white/10
                ${pathname === link.href ? 'text-white bg-[rgba(124,58,237,0.3)]' : ''}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Toggle */}
      <button
        className="flex lg:hidden flex-col gap-[5px] p-2 mr-1"
        aria-label="Menu"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span className={`w-5 h-0.5 bg-white rounded transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
        <span className={`w-5 h-0.5 bg-white rounded transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-5 h-0.5 bg-white rounded transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[rgba(15,23,42,0.95)] backdrop-blur-xl rounded-2xl p-3 lg:hidden border border-white/10 w-full min-w-[200px]">
          <ul className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-white/70 text-[0.85rem] font-medium px-3 py-2.5 rounded-xl transition-all whitespace-nowrap
                    hover:text-white hover:bg-white/10
                    ${pathname === link.href ? 'text-white bg-[rgba(124,58,237,0.3)]' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
