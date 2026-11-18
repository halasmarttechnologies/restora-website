import { DisclosureList } from "@/components/disclosure-list";

import type { PhilosophyPanelProps } from "./about.types";

/** Heading and short copy at the top; expandable principles pinned to the bottom. */
export function PhilosophyPanel({ headingId, heading, body, items }: PhilosophyPanelProps) {
  return (
    <>
      <h2
        id={headingId}
        className="text-[28px] leading-tight tracking-[-0.02em] lowercase sm:text-4xl"
      >
        {heading}
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-black/70 sm:text-base">
        {body}
      </p>
      <DisclosureList items={items} className="mt-auto pt-10" />
    </>
  );
}
