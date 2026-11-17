import type { CallToAction } from "@/types/call-to-action";

export type HeroAction = CallToAction;

export interface HeroVideo {
  readonly src: string;
  readonly posterSrc?: string;
}

export interface HeroProps {
  readonly eyebrow: string;
  readonly heading: string;
  readonly action: HeroAction;
  /** Background video. When omitted, a neutral placeholder is shown. */
  readonly video?: HeroVideo;
}

export interface HeroMediaProps {
  readonly video?: HeroVideo | undefined;
}

export interface BackgroundVideoProps {
  readonly video: HeroVideo;
}
