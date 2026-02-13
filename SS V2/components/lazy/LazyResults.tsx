'use client';
import dynamic from 'next/dynamic';
const Results = dynamic(() => import('@/components/results'), { ssr: false });
export default function LazyResults() { return <Results />; }
