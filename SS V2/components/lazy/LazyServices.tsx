'use client';
import dynamic from 'next/dynamic';
const Services = dynamic(() => import('@/components/services'), { ssr: false });
export default function LazyServices() { return <Services />; }
