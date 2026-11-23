"use client";

import { useState } from "react";

import type { Service } from "@/types/service";

import type { ServiceFilter } from "./services-menu.types";

/**
 * Category filtering shared by the desktop services menu and the /services page. The first
 * filter is selected to start with; a filter without a category shows every service.
 */
export function useServiceFilter(filters: readonly ServiceFilter[], services: readonly Service[]) {
  const [activeIndex, setActiveIndex] = useState(0);
  const category = filters[activeIndex]?.category;
  const visibleServices = category
    ? services.filter((service) => service.category === category)
    : services;

  return { activeIndex, setActiveIndex, visibleServices };
}
