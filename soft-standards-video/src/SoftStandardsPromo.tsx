import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

import { HeroScene } from "./scenes/HeroScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { ProcessScene } from "./scenes/ProcessScene";
import { ServicesScene } from "./scenes/ServicesScene";
import { StatsScene } from "./scenes/StatsScene";
import { CTAScene } from "./scenes/CTAScene";

export const SoftStandardsPromo: React.FC = () => {
  const { fps } = useVideoConfig();

  // Quick, punchy scene durations (modern style)
  const sceneDurations = {
    hero: 3 * fps,         // 3 seconds
    problem: 3.5 * fps,    // 3.5 seconds
    solution: 3 * fps,     // 3 seconds
    process: 3.5 * fps,    // 3.5 seconds
    services: 2.5 * fps,   // 2.5 seconds
    stats: 3 * fps,        // 3 seconds
    cta: 3 * fps,          // 3 seconds
  };

  // Fast, snappy transitions
  const quickTransition = Math.round(0.3 * fps); // 0.3 second

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Scene 1: Hero */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.hero}>
          <HeroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: quickTransition })}
        />

        {/* Scene 2: Problem */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.problem}>
          <ProblemScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: quickTransition })}
        />

        {/* Scene 3: Solution */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.solution}>
          <SolutionScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: quickTransition })}
        />

        {/* Scene 4: Process */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.process}>
          <ProcessScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: quickTransition })}
        />

        {/* Scene 5: Services */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.services}>
          <ServicesScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: quickTransition })}
        />

        {/* Scene 6: Stats */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.stats}>
          <StatsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: quickTransition })}
        />

        {/* Scene 7: CTA */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.cta}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
