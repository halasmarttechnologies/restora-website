import Image from "next/image";

import { PillLink } from "@/components/pill-link";

import type { MilestoneBannerProps } from "./brand-story.types";

const HEADING_ID = "milestone-banner-heading";

/** Wide photo card with an uppercase headline and call to action in the top-left corner. */
export function MilestoneBanner({ heading, action, imageSrc }: MilestoneBannerProps) {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className="relative isolate flex aspect-[4/5] flex-col items-start overflow-hidden rounded-xl p-5 text-brand-white sm:aspect-video sm:p-[30px] lg:aspect-[9/5]"
    >
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-[center_40%]"
      />
      {/* Top scrim keeps the white headline legible over light parts of the photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-linear-to-b from-brand-black/45 to-transparent"
      />

      <h2 id={HEADING_ID} className="text-2xl tracking-[-0.01em] uppercase sm:text-[32px]">
        {heading}
      </h2>
      <PillLink {...action} className="mt-3 sm:mt-4" />
    </section>
  );
}
