import Image from "next/image";

import { PillLink } from "@/components/pill-link";

import type { AboutHeroProps } from "./about.types";

const HEADING_ID = "about-hero-heading";

/** Wide photo card with the page heading and call to action in white, bottom-left. */
export function AboutHero({ heading, action, imageSrc }: AboutHeroProps) {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className="relative isolate flex aspect-[4/5] flex-col items-start justify-end overflow-hidden rounded-xl p-5 text-brand-white sm:aspect-video sm:p-[30px] lg:aspect-[21/9]"
    >
      {/* The page's largest image: fetch it first instead of lazy-loading. */}
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="-z-10 object-cover object-[center_30%]"
      />
      {/* Scrims keep the white navbar (top) and the white heading (bottom) legible. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-brand-black/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-brand-black/55 to-transparent"
      />

      <h1
        id={HEADING_ID}
        className="max-w-[14ch] text-[28px] leading-[1.1] tracking-[-0.02em] sm:text-4xl lg:text-[46px]"
      >
        {heading}
      </h1>
      <PillLink {...action} className="mt-4" />
    </section>
  );
}
