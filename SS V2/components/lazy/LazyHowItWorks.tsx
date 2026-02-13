'use client';
import dynamic from 'next/dynamic';
const HowItWorks = dynamic(() => import('@/components/how-it-works'), { ssr: false });
export default function LazyHowItWorks() { return <HowItWorks />; }
