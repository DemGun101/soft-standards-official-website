'use client';

import dynamic from 'next/dynamic';

const VoiceAgentWrapper = dynamic(
  () => import('./VoiceAgentWrapper'),
  { ssr: false }
);

export default function VoiceAgentLazy() {
  return <VoiceAgentWrapper />;
}
