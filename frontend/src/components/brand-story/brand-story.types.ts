import type { DisclosureItem } from "@/components/disclosure-list";
import type { SocialGalleryProps } from "@/components/social-gallery";
import type { CallToAction } from "@/types/call-to-action";

export interface ValuesContent {
  /** Visually hidden; labels the row for assistive technology. */
  readonly heading: string;
  /** Large opening statement at the top of the panel. */
  readonly statement: string;
  readonly action: CallToAction;
  /** Expandable list at the bottom of the panel. */
  readonly items: readonly DisclosureItem[];
  readonly imageSrc: string;
}

export interface ValuesPanelProps extends Omit<ValuesContent, "imageSrc"> {
  readonly headingId: string;
}

export interface MilestoneBannerProps {
  readonly heading: string;
  readonly action: CallToAction;
  readonly imageSrc: string;
}

export interface BrandStoryProps {
  readonly gallery: SocialGalleryProps;
  readonly values: ValuesContent;
  readonly milestone: MilestoneBannerProps;
}
