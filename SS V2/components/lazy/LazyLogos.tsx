'use client';
import dynamic from 'next/dynamic';
const Logos = dynamic(() => import('@/components/logos'), { ssr: false });
export default function LazyLogos() { return <Logos />; }
