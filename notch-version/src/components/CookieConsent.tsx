'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'ss-cookie-consent';

type ConsentStatus = 'accepted' | 'rejected' | null;

export default function CookieConsent() {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored === 'accepted' || stored === 'rejected') {
      setConsentStatus(stored);
    } else {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (status: 'accepted' | 'rejected') => {
    localStorage.setItem(COOKIE_CONSENT_KEY, status);
    setConsentStatus(status);
    setIsVisible(false);
  };

  if (consentStatus || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6 animate-slideUp">
      <div className="max-w-[640px] mx-auto bg-white border border-gray-200 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-5 sm:p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-[0.95rem] font-bold text-gray-900 mb-1">We value your privacy</h3>
            <p className="text-[0.85rem] text-gray-500 leading-[1.6]">
              We use cookies to enhance your browsing experience and analyze site traffic. By clicking &ldquo;Accept&rdquo;, you consent to our use of cookies.{' '}
              <Link href="/privacy" className="text-purple-500 hover:text-purple-600 underline underline-offset-2">
                Privacy Policy
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleConsent('accepted')}
              className="px-6 py-2.5 bg-purple-500 text-white rounded-full text-[0.85rem] font-semibold transition-colors hover:bg-purple-600"
            >
              Accept
            </button>
            <button
              onClick={() => handleConsent('rejected')}
              className="px-6 py-2.5 bg-gray-100 text-gray-600 rounded-full text-[0.85rem] font-semibold transition-colors hover:bg-gray-200"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
