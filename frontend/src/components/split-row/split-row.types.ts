import type { ReactNode } from "react";

export interface SplitRowProps {
  /** Id of the panel's heading; labels the row's `<section>`. */
  readonly headingId: string;
  readonly imageSrc: string;
  /** Which side the photo sits on at desktop widths. On phones the photo is always first. */
  readonly mediaPosition: "start" | "end";
  readonly children: ReactNode;
}
