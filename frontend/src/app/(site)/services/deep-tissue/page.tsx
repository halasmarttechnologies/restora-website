import type { Metadata } from "next";

import { ServicePage } from "@/components/service-page";
import { DEEP_TISSUE_PAGE } from "@/constants/services/deep-tissue";

const { service } = DEEP_TISSUE_PAGE;

export const metadata: Metadata = {
  title: service.name,
  description: service.description,
};

/** /services/deep-tissue: content in `constants/services/deep-tissue.ts`, layout in `ServicePage`. */
export default function DeepTissuePage() {
  return <ServicePage {...DEEP_TISSUE_PAGE} />;
}
