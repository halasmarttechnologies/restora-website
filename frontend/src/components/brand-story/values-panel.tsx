import { PillLink } from "@/components/pill-link";

import type { ValuesPanelProps } from "./brand-story.types";

/**
 * Opening statement and call to action at the top; an expandable list of values at the
 * bottom, built on native `<details>` so it needs no JavaScript.
 */
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

      <ul className="mt-auto pt-10">
        {items.map(({ title, body }) => (
          <li key={title} className="border-t border-brand-black/15">
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-base lowercase sm:text-lg [&::-webkit-details-marker]:hidden">
                {title}
                <span
                  aria-hidden="true"
                  className="text-xl leading-none transition-transform group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-brand-black/70">{body}</p>
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}
