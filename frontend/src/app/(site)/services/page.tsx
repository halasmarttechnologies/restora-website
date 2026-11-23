import type { Metadata } from "next";

import { ServicesOverview } from "@/components/services-overview";
import { SERVICES_OVERVIEW } from "@/constants/services-menu";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Every ${SITE_NAME} treatment: deep tissue, relaxation, recovery, prenatal and more.`,
};

/** /services: every service, filterable by category. Each card links to its own page. */
export default function ServicesPage() {
  return <ServicesOverview {...SERVICES_OVERVIEW} />;
}
