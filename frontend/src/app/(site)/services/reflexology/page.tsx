import type { Metadata } from "next";

import { ServicePage } from "@/components/service-page";
import { REFLEXOLOGY_PAGE } from "@/constants/services/reflexology";

const { service } = REFLEXOLOGY_PAGE;

export const metadata: Metadata = {
  title: service.name,
  description: service.description,
};

/** /services/reflexology: content in `constants/services/reflexology.ts`, layout in `ServicePage`. */
export default function ReflexologyPage() {
  return <ServicePage {...REFLEXOLOGY_PAGE} />;
}
