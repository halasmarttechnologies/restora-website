import { DisclosureList } from "@/components/disclosure-list";

import type { FaqGroupsProps } from "./faq.types";

/** One labelled section per topic, each a list of questions that expand to their answers. */
export function FaqGroups({ groups }: FaqGroupsProps) {
  return (
    <div className="mt-12 flex flex-col gap-10">
      {groups.map(({ heading, items }, index) => {
        const headingId = `faq-group-${index}`;
        return (
          <section key={heading} aria-labelledby={headingId}>
            <h2 id={headingId} className="text-lg tracking-[-0.01em] lowercase sm:text-xl">
              {heading}
            </h2>
            <DisclosureList items={items} className="mt-3 border-b border-brand-black/15" />
          </section>
        );
      })}
    </div>
  );
}
