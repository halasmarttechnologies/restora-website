import type { Metadata } from "next";

import { ContentSections } from "@/components/content-sections";
import { PagePanel } from "@/components/page-panel";
import { ACCESSIBILITY_STATEMENT } from "@/constants/accessibility";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: `${SITE_NAME}'s accessibility statement: our standard, what we have done and how to get help.`,
};

export default function AccessibilityPage() {
  const { heading, intro, sections } = ACCESSIBILITY_STATEMENT;
  return (
    <PagePanel heading={heading} intro={intro}>
      <ContentSections sections={sections} />
    </PagePanel>
  );
}
