import Link from "next/link";

import { PillLink } from "@/components/pill-link";

import type { OfferingPanelProps } from "./about.types";
import { PanelIntro } from "./panel-intro";

/** Heading, copy and call to action at the top; a divided list of links at the bottom. */
export function OfferingPanel({ headingId, heading, body, action, links }: OfferingPanelProps) {
  return (
    <>
      <PanelIntro headingId={headingId} heading={heading} body={body} />
      <PillLink {...action} tone="dark" className="mt-5 self-start" />

      <ul className="mt-auto pt-10">
        {links.map(({ label, href }) => (
          <li key={href} className="border-t border-brand-black/15">
            <Link
              href={href}
              className="block py-4 text-base lowercase transition-opacity hover:opacity-60 sm:text-lg"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
