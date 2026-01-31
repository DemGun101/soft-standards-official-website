import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'white' | 'dark';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const variants = {
  primary: `inline-flex items-center gap-2.5 px-9 py-4 bg-purple-500 text-white rounded-full
    text-base font-semibold transition-all shadow-[0_4px_20px_rgba(124,58,237,0.3)]
    hover:bg-purple-600 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,58,237,0.4)]`,
  secondary: `inline-flex items-center gap-2 px-9 py-4 bg-white text-gray-900
    border-[1.5px] border-gray-100 rounded-full text-base font-semibold transition-all
    hover:border-gray-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]`,
  ghost: `inline-flex items-center gap-2 py-3 bg-transparent text-purple-500
    text-base font-semibold transition-all hover:gap-3.5`,
  white: `inline-flex items-center gap-2.5 px-9 py-4 bg-white text-purple-700
    rounded-full text-base font-semibold transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)]
    hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]`,
  dark: `inline-flex items-center gap-2.5 px-9 py-4 bg-gray-900 text-white
    rounded-full text-base font-semibold transition-all
    hover:bg-purple-600 hover:-translate-y-0.5`,
};

export default function Button({ href, variant = 'primary', children, className = '', onClick }: ButtonProps) {
  const classes = `${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform group-hover:translate-x-0.5 ${className}`}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
