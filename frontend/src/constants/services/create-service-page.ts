import type { DisclosureItem } from "@/components/disclosure-list";
import type {
  ServicePageImages,
  ServicePageProps,
  ServiceReview,
  ServiceSpec,
} from "@/components/service-page";
import type { Service } from "@/types/service";

import { SERVICES } from "./catalogue";
import { SERVICE_PAGE_SHARED } from "./shared";

/** What each service writes in its own file. Everything else comes from `shared.ts`. */
export interface ServiceContent {
  /** Bookable lengths in minutes; the first is preselected. */
  readonly durations: readonly number[];
  /** Headline of the specs row. */
  readonly tagline: string;
  readonly specs: readonly ServiceSpec[];
  /** Three words for "how you'll feel". */
  readonly feelings: readonly [string, string, string];
  /** "Good to know" questions and answers. */
  readonly details: readonly DisclosureItem[];
  /** Slugs of related services, e.g. ["sports-recovery"]. */
  readonly pairings: readonly string[];
  /** Verified reviews only. Leave out until there are real ones. */
  readonly reviews?: readonly ServiceReview[];
}

/** Finds a service on the menu by its slug; fails the build if it is not there. */
function findService(slug: string): Service {
  const service = SERVICES.find(({ href }) => href === `/services/${slug}`);
  if (!service) {
    throw new Error(`No service "${slug}" in constants/services/catalogue.ts.`);
  }
  return service;
}

/** Split-row photos in page order: the shared photos, minus the hero photo, repeating if short. */
function rowImages(photos: readonly string[], heroSrc: string): ServicePageImages {
  const pool = photos.filter((src) => src !== heroSrc);
  const photo = (index: number) => pool[index % pool.length]!;

  return {
    specs: photo(0),
    outcomes: photo(1),
    steps: photo(2),
    details: photo(3),
    aftercare: photo(4),
    pairings: photo(5),
  };
}

/**
 * Builds the full props for one service page: the menu entry (name, code, photo) found by
 * `slug`, the service's own content, and the content shared by every service page.
 *
 * @example
 * export const DEEP_TISSUE_PAGE = createServicePage("deep-tissue", { durations: [60, 90], … });
 */
export function createServicePage(slug: string, content: ServiceContent): ServicePageProps {
  const { headings, photos, ...shared } = SERVICE_PAGE_SHARED;
  const service = findService(slug);

  return {
    ...shared,
    slug,
    service,
    images: rowImages(photos, service.imageSrc),
    durations: content.durations,
    tagline: content.tagline,
    specs: content.specs,
    outcomes: { heading: headings.outcomes, words: content.feelings },
    details: { heading: headings.details, items: content.details },
    pairings: { heading: headings.pairings, services: content.pairings.map(findService) },
    reviews: { heading: headings.reviews, items: content.reviews ?? [] },
  };
}
