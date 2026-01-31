import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'purple' | 'light';
  narrow?: boolean;
  noPadding?: boolean;
}

const variants = {
  default: '',
  dark: 'bg-[#0F172A] text-white',
  purple: 'bg-purple-500 text-white',
  light: 'bg-[#F8FAFC]',
};

export default function Section({ children, className = '', variant = 'default', narrow = false, noPadding = false }: SectionProps) {
  return (
    <section
      className={`
        ${noPadding ? '' : 'py-[clamp(60px,10vw,120px)] px-[clamp(20px,5vw,80px)]'}
        ${narrow ? 'max-w-[1200px]' : 'max-w-[1400px]'}
        mx-auto
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  badge?: string;
  title: ReactNode;
  subtitle?: string;
  className?: string;
  dark?: boolean;
}

export function SectionHeader({ badge, title, subtitle, className = '', dark = false }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-[clamp(40px,6vw,72px)] ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-[0.85rem] font-semibold mb-5
          ${dark
            ? 'bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.25)] text-purple-400'
            : 'bg-purple-50 border border-purple-100 text-purple-700'
          }`}
        >
          {badge}
        </div>
      )}
      <h2 className={`text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold tracking-tight leading-[1.1] mb-4 ${dark ? 'text-white' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-[clamp(1rem,1.8vw,1.2rem)] max-w-[600px] mx-auto leading-[1.7]
          ${dark ? 'text-gray-300' : 'text-gray-500'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
