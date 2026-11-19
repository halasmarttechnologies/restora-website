import type { NavLink } from "@/types/navigation";

export interface ContentSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  /** Bulleted list after the paragraphs. */
  readonly list?: readonly string[];
  /** Link after the section's text, e.g. to the contact page. */
  readonly link?: NavLink;
}

export interface ContentSectionsProps {
  readonly sections: readonly ContentSection[];
}

/** Content of a long-form page (privacy, terms, accessibility). */
export interface ContentPage {
  /** The page's `<h1>`. */
  readonly heading: string;
  readonly intro: readonly string[];
  readonly sections: readonly ContentSection[];
}
