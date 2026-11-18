import Image from "next/image";

import { PillLink } from "@/components/pill-link";

import type { PromiseBannerProps } from "./about.types";

const HEADING_ID = "about-promise-heading";

/** Off-white card: a dotted line of claims and a call to action above a wide photo. */
export function PromiseBanner({ heading, claims, action, imageSrc }: PromiseBannerProps) {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className="flex flex-col rounded-xl bg-brand-background p-5 text-brand-black sm:p-[30px]"
    >
      <h2 id={HEADING_ID} className="sr-only">
        {heading}
      </h2>
      {/* Dot separators come from CSS so they are not read out as list content. */}
      <ul className="flex flex-wrap gap-x-2 gap-y-1 text-sm lowercase sm:text-base">
        {claims.map((claim) => (
          <li key={claim} className="after:ml-2 after:content-['•'] last:after:content-none">
            {claim}
          </li>
        ))}
      </ul>
      <PillLink {...action} tone="dark" className="mt-4 self-start" />

      <div className="relative mt-6 aspect-[4/5] overflow-hidden rounded-lg sm:aspect-video lg:aspect-[21/9]">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_85%]"
        />
      </div>
    </section>
  );
}
