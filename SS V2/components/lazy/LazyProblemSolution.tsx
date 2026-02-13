'use client';
import dynamic from 'next/dynamic';
const ProblemSolution = dynamic(() => import('@/components/problem-solution'), { ssr: false });
export default function LazyProblemSolution() { return <ProblemSolution />; }
