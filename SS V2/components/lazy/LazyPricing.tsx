'use client';
import dynamic from 'next/dynamic';
const Pricing = dynamic(() => import('@/components/pricing'), { ssr: false });
export default function LazyPricing() { return <Pricing />; }
