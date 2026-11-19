import { DisclosureList } from "@/components/disclosure-list";
import { SectionLabel } from "@/components/section-heading";

import type { ServiceDetailsProps } from "./service-page.types";

/** Label at the top; practical questions that expand to their answers at the bottom. */
export function ServiceDetails({ headingId, heading, items }: ServiceDetailsProps) {
  return (
    <>
      <SectionLabel id={headingId}>{heading}</SectionLabel>
      <DisclosureList items={items} className="mt-auto pt-10" />
    </>
  );
}
