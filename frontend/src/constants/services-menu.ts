import type { ServicesMenuContent } from "@/components/services-menu";
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
