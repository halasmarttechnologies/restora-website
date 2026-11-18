import Image from "next/image";

import type { StatementBannerProps } from "./about.types";

const HEADING_ID = "statement-banner-heading";

/** Wide black-and-white photo with one short statement centred over it. */
export function StatementBanner({ heading, imageSrc }: StatementBannerProps) {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className="relative isolate flex aspect-[4/5] items-center justify-center overflow-hidden rounded-xl p-6 text-center text-brand-white sm:aspect-video lg:aspect-[21/10]"
    >
      {/* Rendered in greyscale so any photo fits the black-and-white brand palette. */}
      <Image src={imageSrc} alt="" fill sizes="100vw" className="-z-10 object-cover grayscale" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-black/25" />

      <h2
        id={HEADING_ID}
        className="text-[28px] leading-tight tracking-[-0.02em] sm:text-4xl lg:text-[46px]"
      >
        {heading}
      </h2>
    </section>
  );
}
