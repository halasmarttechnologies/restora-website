"use client";

import { ServiceFilters, ServiceMenuCard, useServiceFilter } from "@/components/services-menu";

import type { ServicesOverviewProps } from "./services-overview.types";

const HEADING_ID = "services-heading";

/**
 * The /services page: every service as a card, with the same category filters and cards as
 * the desktop services menu. One column on phones, up to four on wide screens. Starts on a
 * light panel under the navbar (`data-light-page` switches the navbar to dark text).
 */
export function ServicesOverview({ heading, intro, filters, services }: ServicesOverviewProps) {
  const { activeIndex, setActiveIndex, visibleServices } = useServiceFilter(filters, services);

  return (
    <section
      aria-labelledby={HEADING_ID}
      data-light-page
      className="rounded-xl bg-brand-background px-3 pt-28 pb-12 text-brand-black sm:px-5 sm:pt-32 lg:px-[30px] lg:pt-40 lg:pb-20"
    >
      <div className="mx-auto max-w-xl px-2 text-center">
        <h1
          id={HEADING_ID}
          className="text-[32px] leading-tight tracking-[-0.02em] lowercase sm:text-[40px]"
        >
          {heading}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-brand-black/80">{intro}</p>
      </div>

      <div className="mt-8 lg:mt-10">
        <ServiceFilters filters={filters} activeIndex={activeIndex} onSelect={setActiveIndex} />
      </div>

      <ul
        aria-label="All services"
        className="mx-auto mt-8 grid max-w-[1500px] gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-10 lg:grid-cols-3 xl:grid-cols-4"
      >
        {visibleServices.map((service) => (
          <li key={service.href}>
            <ServiceMenuCard {...service} />
          </li>
        ))}
      </ul>
    </section>
  );
}
