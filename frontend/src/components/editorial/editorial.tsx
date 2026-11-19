import { SplitRow } from "@/components/split-row";

import { EditorialCarousel } from "./editorial-carousel";
import type { EditorialProps } from "./editorial.types";
import { StoryPanel } from "./story-panel";

const CAROUSEL_HEADING_ID = "editorial-carousel-heading";

/**
 * Stack of photo + panel rows: a carousel row first, then one row per story. The photo side
 * alternates (start, end, start, …) to give the stack a zig-zag rhythm.
 */
export function Editorial({ carousel, stories }: EditorialProps) {
  return (
    <>
      <SplitRow headingId={CAROUSEL_HEADING_ID} imageSrc={carousel.imageSrc} mediaPosition="start">
        <h2 id={CAROUSEL_HEADING_ID} className="sr-only">
          {carousel.heading}
        </h2>
        <EditorialCarousel slides={carousel.slides} />
      </SplitRow>

      {stories.map(({ imageSrc, ...story }, index) => {
        const headingId = `editorial-story-${index}`;
        return (
          <SplitRow
            key={story.heading}
            headingId={headingId}
            imageSrc={imageSrc}
            mediaPosition={index % 2 === 0 ? "end" : "start"}
          >
            <StoryPanel headingId={headingId} {...story} />
          </SplitRow>
        );
      })}
    </>
  );
}
