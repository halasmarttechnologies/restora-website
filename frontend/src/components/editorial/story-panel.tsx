import { PillLink } from "@/components/pill-link";

import type { StoryPanelProps } from "./editorial.types";

/** Headline, short copy and a call to action, anchored to the bottom of the panel. */
export function StoryPanel({ headingId, heading, body, action }: StoryPanelProps) {
  return (
    <div className="mt-auto max-w-md">
      <h2
        id={headingId}
        className="text-[28px] leading-tight tracking-[-0.02em] lowercase sm:text-4xl lg:text-[46px]"
      >
        {heading}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-brand-black/80 sm:text-base">{body}</p>
      <PillLink {...action} tone="dark" className="mt-5" />
    </div>
  );
}
