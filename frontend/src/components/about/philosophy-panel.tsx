import { DisclosureList } from "@/components/disclosure-list";

import type { PhilosophyPanelProps } from "./about.types";
import { PanelIntro } from "./panel-intro";

/** Heading and short copy at the top; expandable principles pinned to the bottom. */
export function PhilosophyPanel({ headingId, heading, body, items }: PhilosophyPanelProps) {
  return (
    <>
      <PanelIntro headingId={headingId} heading={heading} body={body} />
      <DisclosureList items={items} className="mt-auto pt-10" />
    </>
  );
}
