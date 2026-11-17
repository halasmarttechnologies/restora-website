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
