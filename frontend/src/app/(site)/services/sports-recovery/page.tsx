import type { Metadata } from "next";

import { ServicePage } from "@/components/service-page";
import { SPORTS_RECOVERY_PAGE } from "@/constants/services/sports-recovery";

const { service } = SPORTS_RECOVERY_PAGE;

export const metadata: Metadata = {
  title: service.name,
  description: service.description,
};

/** /services/sports-recovery: content in `constants/services/sports-recovery.ts`, layout in `ServicePage`. */
export default function SportsRecoveryPage() {
  return <ServicePage {...SPORTS_RECOVERY_PAGE} />;
}
