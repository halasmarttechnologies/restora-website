import type { Metadata } from "next";

import { ContentSections } from "@/components/content-sections";
import { PagePanel } from "@/components/page-panel";
import { TERMS_OF_SERVICE } from "@/constants/legal";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `The terms for using the ${SITE_NAME} website and booking treatments.`,
};

export default function TermsPage() {
  const { heading, intro, sections } = TERMS_OF_SERVICE;
  return (
    <PagePanel heading={heading} intro={intro}>
      <ContentSections sections={sections} />
    </PagePanel>
  );
}
