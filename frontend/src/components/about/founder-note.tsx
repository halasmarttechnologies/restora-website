import { SectionLabel } from "@/components/section-heading";

import type { FounderNoteProps } from "./about.types";

const HEADING_ID = "founder-note-heading";

/** Centred quotation on an off-white panel, with a small label above and a sign-off below. */
export function FounderNote({ heading, quote, signOff }: FounderNoteProps) {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className="rounded-xl bg-brand-background px-5 py-16 text-center text-brand-black sm:px-[30px] lg:py-24"
    >
      <SectionLabel id={HEADING_ID}>{heading}</SectionLabel>
      <figure className="mx-auto mt-6 max-w-3xl">
        <blockquote>
          {/* Quotation marks come from CSS so the copy stays plain text. */}
          <p className="text-lg leading-relaxed text-brand-black/80 before:content-[open-quote] after:content-[close-quote] sm:text-2xl sm:leading-relaxed">
            {quote}
          </p>
        </blockquote>
        <figcaption className="mt-8 text-xl tracking-[-0.02em]">{signOff}</figcaption>
      </figure>
    </section>
  );
}
