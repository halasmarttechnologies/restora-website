import { SocialGallery } from "@/components/social-gallery";
import { SplitRow } from "@/components/split-row";

import { ServiceAftercare } from "./service-aftercare";
import { ServiceDetails } from "./service-details";
import { ServiceGift } from "./service-gift";
import { ServiceHero } from "./service-hero";
import { ServiceOutcomes } from "./service-outcomes";
import type { ServicePageProps } from "./service-page.types";
import { ServicePairings } from "./service-pairings";
import { ServiceReviews } from "./service-reviews";
import { ServiceSpecs } from "./service-specs";
import { ServiceSteps } from "./service-steps";

/** Ids of the split-row headings; each one labels its row's <section>. */
const ROW = {
  specs: "service-specs-heading",
  outcomes: "service-outcomes-heading",
  steps: "service-steps-heading",
  details: "service-details-heading",
  aftercare: "service-aftercare-heading",
  pairings: "service-pairings-heading",
} as const;

/**
 * The page for one service, top to bottom:
 *
 * 1. Hero: photo + name, description, duration choice and "Book now"
 * 2. Photo strip ("felt by you")
 * 3. Split rows, alternating the text and photo sides:
 *    specs · how you'll feel · your session (steps) · good to know · aftercare · pairs well with
 * 4. Gift card row
 * 5. Reviews
 *
 * Every service uses this one layout; only the content differs (see `constants/services/`).
 */
export function ServicePage({
  slug,
  service,
  durations,
  tagline,
  specs,
  outcomes,
  steps,
  details,
  aftercare,
  pairings,
  gallery,
  gift,
  reviews,
  images,
}: ServicePageProps) {
  return (
    <>
      <ServiceHero slug={slug} service={service} durations={durations} />
      <SocialGallery {...gallery} />

      <SplitRow headingId={ROW.specs} imageSrc={images.specs} mediaPosition="end">
        <ServiceSpecs headingId={ROW.specs} tagline={tagline} specs={specs} />
      </SplitRow>
      <SplitRow headingId={ROW.outcomes} imageSrc={images.outcomes} mediaPosition="start">
        <ServiceOutcomes headingId={ROW.outcomes} {...outcomes} />
      </SplitRow>
      <SplitRow headingId={ROW.steps} imageSrc={images.steps} mediaPosition="end">
        <ServiceSteps headingId={ROW.steps} {...steps} />
      </SplitRow>
      <SplitRow headingId={ROW.details} imageSrc={images.details} mediaPosition="start">
        <ServiceDetails headingId={ROW.details} {...details} />
      </SplitRow>
      <SplitRow headingId={ROW.aftercare} imageSrc={images.aftercare} mediaPosition="end">
        <ServiceAftercare headingId={ROW.aftercare} {...aftercare} />
      </SplitRow>
      <SplitRow headingId={ROW.pairings} imageSrc={images.pairings} mediaPosition="start">
        <ServicePairings headingId={ROW.pairings} {...pairings} />
      </SplitRow>

      <ServiceGift {...gift} />
      <ServiceReviews {...reviews} />
    </>
  );
}
