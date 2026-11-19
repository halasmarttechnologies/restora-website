import type { ReactNode } from "react";

export interface SectionHeadingProps {
  /** Lets the surrounding <section> point at this heading with `aria-labelledby`. */
  readonly id?: string;
  readonly children: ReactNode;
}
