import type { ServicesMenuContent } from "@/components/services-menu";
import type { ServicesOverviewProps } from "@/components/services-overview";
import { SERVICES } from "@/constants/services";

/** Content of the navbar's Services panel. The first filter (no category) shows everything. */
export const SERVICES_MENU: ServicesMenuContent = {
  filters: [
    { label: "Featured" },
    { label: "Relax", category: "relax" },
    { label: "Recover", category: "recover" },
    { label: "Specialty", category: "specialty" },
  ],
  services: SERVICES,
  action: { label: "View all services", href: "/services" },
};

/** Content of the /services page: same filters and services as the menu. Placeholder copy. */
export const SERVICES_OVERVIEW: ServicesOverviewProps = {
  heading: "our services",
  intro:
    "A short menu of treatments, each one shaped around how your body feels on the day. Choose a category, or browse them all.",
  filters: SERVICES_MENU.filters,
  services: SERVICES,
};
