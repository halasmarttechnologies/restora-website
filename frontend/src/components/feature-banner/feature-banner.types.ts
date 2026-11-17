import type { CallToAction } from "@/types/call-to-action";

export interface FeatureBannerProps {
  /** Short lowercase headline; also labels the section. */
  readonly heading: string;
  readonly body: string;
  readonly action: CallToAction;
  /** Full-bleed background photo (decorative). */
  readonly imageSrc: string;
}
