import Image from "next/image";

import { BookingForm } from "./booking-form";
import type { ServiceHeroProps } from "./service-page.types";

const HEADING_ID = "service-heading";

/**
 * Off-white card under the navbar: the service photo on the left, and on the right a white
 * panel with the name (the page's <h1>), code, lengths, description and the booking form.
 * `data-light-page` switches the navbar to dark text over this light card.
 */
export function ServiceHero({ slug, service, durations }: ServiceHeroProps) {
  return (
    <section
      aria-labelledby={HEADING_ID}
      data-light-page
      className="grid gap-3 rounded-xl bg-brand-background p-3 pt-24 text-brand-black sm:gap-5 sm:p-5 sm:pt-28 lg:grid-cols-[3fr_2fr] lg:pt-32"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg sm:aspect-[4/3]">
        {/* The page's largest image: fetch it first instead of lazy-loading. */}
        <Image
          src={service.imageSrc}
          alt=""
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col rounded-lg bg-brand-white p-5 sm:p-[30px]">
        <h1
          id={HEADING_ID}
          className="text-[40px] leading-none tracking-[-0.03em] lowercase sm:text-[56px]"
        >
          {service.name}
        </h1>
        <p className="mt-4 flex items-center gap-3 text-xs tracking-[0.04em] text-brand-black/70 uppercase">
          <span className="rounded-full bg-brand-black px-2.5 py-0.5 text-[11px] text-brand-white">
            {service.code}
          </span>
          {durations.join(" / ")} min
        </p>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-brand-black/80 sm:text-base">
          {service.description}
        </p>
        <BookingForm slug={slug} serviceName={service.name} durations={durations} />
      </div>
    </section>
  );
}
