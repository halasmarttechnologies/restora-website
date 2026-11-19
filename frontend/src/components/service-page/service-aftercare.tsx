import { SectionLabel } from "@/components/section-heading";

import type { ServiceAftercareProps } from "./service-page.types";

/** Numbered aftercare tips. The <ol> carries the order; the large numbers are decorative. */
export function ServiceAftercare({ headingId, heading, items }: ServiceAftercareProps) {
  return (
    <>
      <SectionLabel id={headingId}>{heading}</SectionLabel>
      <ol className="mt-auto flex flex-col gap-5 pt-10">
        {items.map(({ title, body }, index) => (
          <li key={title} className="flex gap-5 border-t border-brand-black/15 pt-5">
            <span
              aria-hidden="true"
              className="w-10 shrink-0 text-4xl leading-none tracking-[-0.03em]"
            >
              {index + 1}
            </span>
            <div>
              <p className="text-sm tracking-[0.04em] uppercase">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-brand-black/70">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
