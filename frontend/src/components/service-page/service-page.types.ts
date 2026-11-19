import type { DisclosureItem } from "@/components/disclosure-list";
import type { SocialGalleryProps } from "@/components/social-gallery";
import type { CallToAction } from "@/types/call-to-action";
import type { Service } from "@/types/service";

/** One row of the specs table, e.g. { label: "Pressure", value: "Firm" }. */
export interface ServiceSpec {
  readonly label: string;
  readonly value: string;
}

/** A titled piece of copy: a session step or an aftercare tip. */
export interface TitledText {
  readonly title: string;
  readonly body: string;
}

/** A verified client review. Never add invented reviews. */
export interface ServiceReview {
  readonly author: string;
  readonly rating: 1 | 2 | 3 | 4 | 5;
  /** ISO date, e.g. "2026-10-01". */
  readonly date: string;
  readonly title: string;
  readonly body: string;
}

/** Photos for the split rows below the hero (the hero uses the service's own photo). */
export interface ServicePageImages {
  readonly specs: string;
  readonly outcomes: string;
  readonly steps: string;
  readonly details: string;
  readonly aftercare: string;
  readonly pairings: string;
}

// Content of each section: a heading plus what the section lists.

export interface OutcomesContent {
  readonly heading: string;
  /** Three short words, shown large and stacked. */
  readonly words: readonly string[];
}

/** Session steps and aftercare tips share this shape. */
export interface TitledListContent {
  readonly heading: string;
  readonly items: readonly TitledText[];
}

export interface DetailsContent {
  readonly heading: string;
  readonly items: readonly DisclosureItem[];
}

export interface PairingsContent {
  readonly heading: string;
  readonly services: readonly Service[];
}

export interface ReviewsContent {
  readonly heading: string;
  readonly items: readonly ServiceReview[];
}

/** Everything one service page shows, top to bottom. Built by `createServicePage()`. */
export interface ServicePageProps {
  /** URL segment, e.g. "deep-tissue"; sent to the booking page. */
  readonly slug: string;
  /** The menu entry: name, code, description, photo. */
  readonly service: Service;
  /** Bookable lengths in minutes; the first is preselected. */
  readonly durations: readonly number[];
  /** Headline of the specs row. */
  readonly tagline: string;
  readonly specs: readonly ServiceSpec[];
  readonly outcomes: OutcomesContent;
  readonly steps: TitledListContent;
  readonly details: DetailsContent;
  readonly aftercare: TitledListContent;
  readonly pairings: PairingsContent;
  readonly gallery: SocialGalleryProps;
  readonly gift: ServiceGiftProps;
  readonly reviews: ReviewsContent;
  readonly images: ServicePageImages;
}

// Props of the individual sections. Panels inside a `SplitRow` also receive the id of their
// heading, which labels the row's <section>.

export interface ServiceHeroProps {
  readonly slug: string;
  readonly service: Service;
  readonly durations: readonly number[];
}

export interface BookingFormProps {
  readonly slug: string;
  readonly serviceName: string;
  readonly durations: readonly number[];
}

export interface ServiceSpecsProps {
  readonly headingId: string;
  readonly tagline: string;
  readonly specs: readonly ServiceSpec[];
}

export interface ServiceOutcomesProps extends OutcomesContent {
  readonly headingId: string;
}

export interface ServiceStepsProps extends TitledListContent {
  readonly headingId: string;
}

export interface ServiceDetailsProps extends DetailsContent {
  readonly headingId: string;
}

export interface ServiceAftercareProps extends TitledListContent {
  readonly headingId: string;
}

export interface ServicePairingsProps extends PairingsContent {
  readonly headingId: string;
}

export interface ServiceGiftProps {
  readonly heading: string;
  readonly body: string;
  readonly action: CallToAction;
  readonly imageSrc: string;
}

export type ServiceReviewsProps = ReviewsContent;
