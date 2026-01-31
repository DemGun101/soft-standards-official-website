import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  withPurpleBar?: boolean;
  delay?: number;
}

export default function Card({ children, className = '', withPurpleBar = false, delay }: CardProps) {
  return (
    <div
      className={`bg-white rounded-[28px] border border-black/5 p-9 transition-all duration-350
        hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)]
        ${withPurpleBar ? 'card-purple-bar' : ''} ${className}`}
      data-delay={delay}
    >
      {children}
    </div>
  );
}

export function CardIcon({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`w-[52px] h-[52px] flex items-center justify-center bg-purple-50 rounded-[20px] mb-5 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={`text-[1.15rem] font-bold text-gray-900 mb-2.5 tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[0.9rem] text-gray-500 leading-[1.7] ${className}`}>
      {children}
    </p>
  );
}
