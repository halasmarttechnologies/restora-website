import Image from "next/image";

import { PillLink } from "@/components/pill-link";

import type { FeatureBannerProps } from "./feature-banner.types";

const HEADING_ID = "feature-banner-heading";

/** Full-width photo card with a centred headline, short copy and a call to action. */
export function FeatureBanner({ heading, body, action, imageSrc }: FeatureBannerProps) {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className="relative isolate flex min-h-[520px] items-center justify-center overflow-hidden rounded-xl px-6 py-16 text-center text-brand-white sm:aspect-video sm:min-h-0 lg:aspect-[21/10]"
    >
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-[30%_center]"
      />
      {/* Even tint keeps the centred white text legible over any part of the photo. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-black/30" />

      <div className="flex max-w-3xl flex-col items-center">
        <h2
          id={HEADING_ID}
          className="text-[28px] leading-tight tracking-[-0.02em] lowercase sm:text-[34px]"
        >
          {heading}
        </h2>
        <p className="mt-5 text-base leading-relaxed sm:mt-7 sm:text-xl">{body}</p>
        <PillLink {...action} className="mt-8 sm:mt-10" />
      </div>
    </section>
  );
}
