import type { Metadata } from "next";

import { ServicePage } from "@/components/service-page";
import { SWEDISH_RELAXATION_PAGE } from "@/constants/services/swedish-relaxation";

const { service } = SWEDISH_RELAXATION_PAGE;

export const metadata: Metadata = {
  title: service.name,
  description: service.description,
};

/** /services/swedish-relaxation: content in `constants/services/swedish-relaxation.ts`, layout in `ServicePage`. */
export default function SwedishRelaxationPage() {
  return <ServicePage {...SWEDISH_RELAXATION_PAGE} />;
}
