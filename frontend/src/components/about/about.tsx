import { FeaturedServices } from "@/components/featured-services";
import { SplitRow } from "@/components/split-row";

import { AboutHero } from "./about-hero";
import type { AboutProps } from "./about.types";
import { FounderNote } from "./founder-note";
import { OfferingPanel } from "./offering-panel";
import { PhilosophyPanel } from "./philosophy-panel";
import { PromiseBanner } from "./promise-banner";
import { StatementBanner } from "./statement-banner";
import { Team } from "./team";
import { Techniques } from "./techniques";

const OFFERING_HEADING_ID = "about-offering-heading";
const PHILOSOPHY_HEADING_ID = "about-philosophy-heading";

/**
 * About page sections, top to bottom: hero, founder note, offering (photo + panel), the shared
 * service cards, statement banner, philosophy (photo + panel), techniques, team and a closing
 * promise banner. Rendered inside the site layout's `<main>`.
 */
export function About({
  hero,
  founderNote,
  offering,
  services,
  statement,
  philosophy,
  techniques,
  team,
  promise,
}: AboutProps) {
  const { imageSrc: offeringImageSrc, ...offeringPanel } = offering;
  const { imageSrc: philosophyImageSrc, ...philosophyPanel } = philosophy;

  return (
    <>
      <AboutHero {...hero} />
      <FounderNote {...founderNote} />
      <SplitRow headingId={OFFERING_HEADING_ID} imageSrc={offeringImageSrc} mediaPosition="start">
        <OfferingPanel headingId={OFFERING_HEADING_ID} {...offeringPanel} />
      </SplitRow>
      <FeaturedServices services={services} />
      <StatementBanner {...statement} />
      <SplitRow
        headingId={PHILOSOPHY_HEADING_ID}
        imageSrc={philosophyImageSrc}
        mediaPosition="start"
      >
        <PhilosophyPanel headingId={PHILOSOPHY_HEADING_ID} {...philosophyPanel} />
      </SplitRow>
      <Techniques {...techniques} />
      <Team {...team} />
      <PromiseBanner {...promise} />
    </>
  );
}
