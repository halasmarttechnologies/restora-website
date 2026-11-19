import { SectionLabel } from "@/components/section-heading";

import type { ServiceOutcomesProps } from "./service-page.types";

/** Centred label and three large stacked words describing how the session feels. */
export function ServiceOutcomes({ headingId, heading, words }: ServiceOutcomesProps) {
  return (
    <div className="m-auto text-center">
      <SectionLabel id={headingId}>{heading}</SectionLabel>
      <p className="mt-5 flex flex-col text-[44px] leading-[1.05] tracking-[-0.03em] lowercase sm:text-6xl">
        {/* The first word is full strength; the others step back a little. */}
        {words.map((word) => (
          <span key={word} className="text-brand-black/60 first:text-brand-black">
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}
