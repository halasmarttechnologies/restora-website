"use client";

import type { MouseEvent } from "react";

import { PillLink } from "@/components/pill-link";

import { ServiceFilters } from "./service-filters";
import { SERVICES_MENU_IDS, useServicesMenu } from "./services-menu-context";
import type { ServicesMenuContent } from "./services-menu.types";
import { ServicesCarousel } from "./services-carousel";
import { useServiceFilter } from "./use-service-filter";

/**
 * Drop-down panel under the navbar (large screens). It slides open by animating its grid row
 * from `0fr` to `1fr`, so it needs no measured heights. While closed it is `inert`: hidden from
 * assistive technology and the keyboard.
 */
export function ServicesMenuPanel({ filters, services, action }: ServicesMenuContent) {
  const { open, hasOpened, close } = useServicesMenu();
  const { activeIndex, setActiveIndex, visibleServices } = useServiceFilter(filters, services);

  // Close once any link inside is followed (event delegation keeps the cards simple).
  const closeOnLinkClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("a")) close();
  };

  return (
    <div
      id={SERVICES_MENU_IDS.panel}
      data-open={open}
      inert={!open}
      onClick={closeOnLinkClick}
      className="group/panel grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-[open=true]:grid-rows-[1fr] motion-reduce:transition-none max-lg:hidden"
    >
      <div className="min-h-0 overflow-hidden">
        <div className="-translate-y-3 pt-8 pb-6 opacity-0 transition duration-500 ease-out group-data-[open=true]/panel:translate-y-0 group-data-[open=true]/panel:opacity-100 motion-reduce:transition-none">
          <ServiceFilters filters={filters} activeIndex={activeIndex} onSelect={setActiveIndex} />

          <div className="mx-auto mt-10 max-w-[1500px]">
            {/* Keyed by filter so the row starts at the beginning after each change. */}
            {hasOpened && <ServicesCarousel key={activeIndex} services={visibleServices} />}
          </div>

          <div className="mt-8 flex justify-center">
            <PillLink {...action} tone="dark" />
          </div>
        </div>
      </div>
    </div>
  );
}
