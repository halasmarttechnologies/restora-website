/** Groups used to filter the services menu. */
export type ServiceCategory = "relax" | "recover" | "specialty";

/** One treatment on the menu. */
export interface Service {
  /** Short menu code shown as a badge, e.g. "T—01". */
  readonly code: string;
  readonly name: string;
  readonly description: string;
  readonly category: ServiceCategory;
  readonly href: string;
  /** Photo in `public/images/services/photos/<slug>.webp`. */
  readonly imageSrc: string;
}

/** A service highlighted on the home page. */
export interface FeaturedService {
  /** Large lowercase display word at the top of the card. */
  readonly title: string;
  readonly name: string;
  readonly description: string;
  readonly duration: string;
  readonly href: string;
  /** Icon shown at rest. */
  readonly iconSrc: string;
  /** Photo revealed on hover or focus. */
  readonly imageSrc: string;
}
