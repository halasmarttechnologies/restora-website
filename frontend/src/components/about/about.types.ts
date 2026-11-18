import type { DisclosureItem } from "@/components/disclosure-list";
import type { CallToAction } from "@/types/call-to-action";
import type { NavLink } from "@/types/navigation";
import type { FeaturedService } from "@/types/service";

export interface AboutHeroProps {
  /** The page's `<h1>`. */
  readonly heading: string;
  readonly action: CallToAction;
  readonly imageSrc: string;
}

export interface FounderNoteProps {
  /** Small uppercase label above the quote; labels the section. */
  readonly heading: string;
  readonly quote: string;
  readonly signOff: string;
}

export interface OfferingContent {
  readonly heading: string;
  readonly body: string;
  readonly action: CallToAction;
  /** Divided list of links at the bottom of the panel. */
  readonly links: readonly NavLink[];
  /** Photo beside the panel. */
  readonly imageSrc: string;
}

export interface OfferingPanelProps extends Omit<OfferingContent, "imageSrc"> {
  readonly headingId: string;
}

export interface StatementBannerProps {
  /** Short statement centred over the photo; labels the section. */
  readonly heading: string;
  readonly imageSrc: string;
}

export interface PhilosophyContent {
  readonly heading: string;
  readonly body: string;
  /** Expandable principles at the bottom of the panel. */
  readonly items: readonly DisclosureItem[];
  /** Photo beside the panel. */
  readonly imageSrc: string;
}

export interface PhilosophyPanelProps extends Omit<PhilosophyContent, "imageSrc"> {
  readonly headingId: string;
}

export interface Technique {
  readonly name: string;
  readonly description: string;
  readonly imageSrc: string;
}

export interface TechniquesProps {
  readonly heading: string;
  readonly body: string;
  readonly techniques: readonly Technique[];
}

export interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  /** Headshot. Until one is supplied, the member's initials are shown instead. */
  readonly portraitSrc?: string;
}

export interface TeamProps {
  readonly heading: string;
  readonly body: string;
  readonly members: readonly TeamMember[];
}

export interface PromiseBannerProps {
  /** Visually hidden; labels the section for assistive technology. */
  readonly heading: string;
  /** Short claims shown on one line, separated by dots. */
  readonly claims: readonly string[];
  readonly action: CallToAction;
  readonly imageSrc: string;
}

export interface AboutProps {
  readonly hero: AboutHeroProps;
  readonly founderNote: FounderNoteProps;
  readonly offering: OfferingContent;
  readonly services: readonly FeaturedService[];
  readonly statement: StatementBannerProps;
  readonly philosophy: PhilosophyContent;
  readonly techniques: TechniquesProps;
  readonly team: TeamProps;
  readonly promise: PromiseBannerProps;
}
