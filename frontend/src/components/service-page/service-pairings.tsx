import { PillLink } from "@/components/pill-link";
import { SectionLabel } from "@/components/section-heading";

import type { ServicePairingsProps } from "./service-page.types";

/** Label at the top; pill links to complementary services at the bottom. */
export function ServicePairings({ headingId, heading, services }: ServicePairingsProps) {
  return (
    <>
      <SectionLabel id={headingId}>{heading}</SectionLabel>
      <ul className="mt-auto flex flex-wrap gap-2 pt-10">
        {services.map(({ name, href }) => (
          <li key={href}>
            <PillLink label={name} href={href} tone="dark" />
          </li>
        ))}
      </ul>
    </>
  );
}
