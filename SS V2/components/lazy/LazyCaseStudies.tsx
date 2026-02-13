'use client';
import dynamic from 'next/dynamic';
const CaseStudies = dynamic(() => import('@/components/case-studies'), { ssr: false });
export default function LazyCaseStudies() { return <CaseStudies />; }
