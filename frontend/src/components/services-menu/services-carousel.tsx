"use client";

import { useCallback, useRef, useState } from "react";

import { ArrowButton } from "@/components/arrow-button";

import { ServiceMenuCard } from "./service-menu-card";
import type { ServicesCarouselProps } from "./services-menu.types";

/** Sub-pixel rounding allowance when checking whether the row is at either end. */
const EDGE_TOLERANCE = 1;

/**
 * Snap-scrolling row of service cards (three visible on large screens, four on extra-large).
 * Arrows appear only when there is more to see in that direction; each click moves one page.
 */
export function ServicesCarousel({ services }: ServicesCarouselProps) {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [canScroll, setCanScroll] = useState({ back: false, forward: false });

  const measure = useCallback((list: HTMLElement) => {
    const { scrollLeft, scrollWidth, clientWidth } = list;
    setCanScroll({
      back: scrollLeft > EDGE_TOLERANCE,
      forward: scrollLeft + clientWidth < scrollWidth - EDGE_TOLERANCE,
    });
  }, []);

  // Measure on mount and whenever the window resizes (React 19 ref callback with cleanup).
  const attachList = useCallback(
    (list: HTMLUListElement) => {
      listRef.current = list;
      const update = () => measure(list);
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    },
    [measure],
  );

  // Smoothness comes from CSS (`scroll-smooth`), so reduced-motion users get instant jumps.
  const scrollPage = (direction: 1 | -1) => {
    const list = listRef.current;
    list?.scrollBy({ left: direction * list.clientWidth });
  };

  return (
    <div className="relative px-16">
      <ul
        ref={attachList}
        aria-label="Services"
        onScroll={(event) => measure(event.currentTarget)}
        className="flex snap-x snap-mandatory scroll-smooth gap-4 overflow-x-auto [scrollbar-width:none] motion-reduce:scroll-auto"
      >
        {services.map((service) => (
          <li
            key={service.href}
            className="w-[calc((100%-2rem)/3)] shrink-0 snap-start xl:w-[calc((100%-3rem)/4)]"
          >
            <ServiceMenuCard {...service} />
          </li>
        ))}
      </ul>

      {canScroll.back && (
        <ArrowButton
          label="Previous services"
          direction="left"
          variant="solid"
          onClick={() => scrollPage(-1)}
          className="absolute top-1/2 left-0 -translate-y-1/2"
        />
      )}
      {canScroll.forward && (
        <ArrowButton
          label="Next services"
          direction="right"
          variant="solid"
          onClick={() => scrollPage(1)}
          className="absolute top-1/2 right-0 -translate-y-1/2"
        />
      )}
    </div>
  );
}
