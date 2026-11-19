import type { Metadata } from "next";

import { ServicePage } from "@/components/service-page";
import { PRENATAL_PAGE } from "@/constants/services/prenatal";

const { service } = PRENATAL_PAGE;

export const metadata: Metadata = {
  title: service.name,
  description: service.description,
};

/** /services/prenatal: content in `constants/services/prenatal.ts`, layout in `ServicePage`. */
export default function PrenatalPage() {
  return <ServicePage {...PRENATAL_PAGE} />;
}
