import type { Metadata } from "next";

import { ServicePage } from "@/components/service-page";
import { SIGNATURE_RESTORA_PAGE } from "@/constants/services/signature-restora";

const { service } = SIGNATURE_RESTORA_PAGE;

export const metadata: Metadata = {
  title: service.name,
  description: service.description,
};

/** /services/signature-restora: content in `constants/services/signature-restora.ts`, layout in `ServicePage`. */
export default function SignatureRestoraPage() {
  return <ServicePage {...SIGNATURE_RESTORA_PAGE} />;
}
