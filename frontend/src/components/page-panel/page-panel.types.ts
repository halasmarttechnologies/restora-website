import type { ReactNode } from "react";

export interface PagePanelProps {
  /** The page's `<h1>`. */
  readonly heading: string;
  /** Short paragraphs under the heading. */
  readonly intro?: readonly string[];
  readonly children?: ReactNode;
}
