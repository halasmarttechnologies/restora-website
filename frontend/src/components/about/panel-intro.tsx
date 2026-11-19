import { SectionHeading } from "@/components/section-heading";

import type { PanelIntroProps } from "./about.types";

/** Section heading followed by a short line of intro copy. */
export function PanelIntro({ headingId, heading, body }: PanelIntroProps) {
  return (
    <>
      <SectionHeading id={headingId}>{heading}</SectionHeading>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-black/70 sm:text-base">
        {body}
      </p>
    </>
  );
}
