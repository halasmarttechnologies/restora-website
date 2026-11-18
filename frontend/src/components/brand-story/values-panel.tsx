import { DisclosureList } from "@/components/disclosure-list";
import { PillLink } from "@/components/pill-link";

import type { ValuesPanelProps } from "./brand-story.types";

/** Opening statement and call to action at the top; an expandable list of values at the bottom. */
export function ValuesPanel({ headingId, heading, statement, action, items }: ValuesPanelProps) {
  return (
    <>
      <h2 id={headingId} className="sr-only">
        {heading}
      </h2>
      <p className="max-w-xl text-[26px] leading-[1.15] tracking-[-0.02em] sm:text-[32px] lg:text-[40px]">
        {statement}
      </p>
      <PillLink {...action} tone="dark" className="mt-5 self-start" />
      <DisclosureList items={items} className="mt-auto pt-10" />
    </>
  );
}
