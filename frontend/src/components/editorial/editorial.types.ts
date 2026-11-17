import type { CallToAction } from "@/types/call-to-action";

export interface CarouselSlide {
  readonly name: string;
  readonly description: string;
  /** Artwork shown centred in the panel (transparent background works best). */
  readonly imageSrc: string;
  readonly action: CallToAction;
}

export interface EditorialCarouselContent {
  /** Visually hidden; labels the row for assistive technology. */
  readonly heading: string;
  /** Photo beside the carousel. */
  readonly imageSrc: string;
  readonly slides: readonly CarouselSlide[];
}

export interface EditorialStory {
  readonly heading: string;
  readonly body: string;
  readonly imageSrc: string;
  readonly action: CallToAction;
}

export interface EditorialProps {
  readonly carousel: EditorialCarouselContent;
  readonly stories: readonly EditorialStory[];
}

export interface StoryPanelProps extends Omit<EditorialStory, "imageSrc"> {
  readonly headingId: string;
}

export interface CarouselProps {
  readonly slides: readonly CarouselSlide[];
}
