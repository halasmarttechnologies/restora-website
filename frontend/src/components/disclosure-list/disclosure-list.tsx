import type { DisclosureListProps } from "./disclosure-list.types";

/**
 * Divided list of expandable items. Built on native `<details>`, so it is keyboard and
 * screen-reader friendly and needs no JavaScript.
 */
export function DisclosureList({ items, className = "" }: DisclosureListProps) {
  return (
    <ul className={className}>
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
  );
}
