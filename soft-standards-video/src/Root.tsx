import { Composition, Folder } from "remotion";
import { SoftStandardsPromo } from "./SoftStandardsPromo";

// Total duration: ~20 seconds (quick, punchy modern style)
// Scene durations: 3 + 3.5 + 3 + 3.5 + 2.5 + 3 + 3 = 21.5 seconds
// Minus transitions: 6 * 0.3s = 1.8 seconds overlap
// Final: ~600 frames at 30fps

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Soft-Standards">
        <Composition
          id="SoftStandardsPromo"
          component={SoftStandardsPromo}
          durationInFrames={600}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{}}
        />
        <Composition
          id="SoftStandardsPromo-Square"
          component={SoftStandardsPromo}
          durationInFrames={600}
          fps={30}
          width={1080}
          height={1080}
          defaultProps={{}}
        />
        <Composition
          id="SoftStandardsPromo-Vertical"
          component={SoftStandardsPromo}
          durationInFrames={600}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{}}
        />
      </Folder>
    </>
  );
};
