import { SplitRow } from "@/components/split-row";

import type { BrandStoryProps } from "./brand-story.types";
import { MilestoneBanner } from "./milestone-banner";
import { SocialGallery } from "./social-gallery";
import { ValuesPanel } from "./values-panel";

const VALUES_HEADING_ID = "brand-values-heading";

/** Social photo strip, values panel beside a photo, and a wide closing banner. */
export function BrandStory({ gallery, values, milestone }: BrandStoryProps) {
  const { imageSrc: valuesImageSrc, ...valuesPanel } = values;

  return (
    <div className="flex flex-col gap-3 sm:gap-5 lg:gap-9">
      <SocialGallery {...gallery} />
      <SplitRow headingId={VALUES_HEADING_ID} imageSrc={valuesImageSrc} mediaPosition="end">
        <ValuesPanel headingId={VALUES_HEADING_ID} {...valuesPanel} />
      </SplitRow>
      <MilestoneBanner {...milestone} />
    </div>
  );
}
