'use client';
import dynamic from 'next/dynamic';
const Booking = dynamic(() => import('@/components/booking'), { ssr: false });
export default function LazyBooking() { return <Booking />; }
