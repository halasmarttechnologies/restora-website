import type { Metadata } from "next";

import { ContentSections } from "@/components/content-sections";
import { PagePanel } from "@/components/page-panel";
import { PRIVACY_POLICY } from "@/constants/legal";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${SITE_NAME} collects, uses and protects your personal information.`,
};

export default function PrivacyPage() {
  const { heading, intro, sections } = PRIVACY_POLICY;
  return (
    <PagePanel heading={heading} intro={intro}>
      <ContentSections sections={sections} />
    </PagePanel>
  );
}
