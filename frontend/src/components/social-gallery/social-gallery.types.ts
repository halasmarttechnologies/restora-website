import type { CallToAction } from "@/types/call-to-action";

/** One tile of the strip: a photo or a short looping video. */
export interface GalleryItem {
  readonly type: "image" | "video";
  readonly src: string;
  /** Describes the photo or video for screen readers. */
  readonly alt: string;
}

export interface SocialGalleryProps {
  readonly heading: string;
  readonly action: CallToAction;
  /** Shown left to right, in this order. */
  readonly items: readonly GalleryItem[];
}
