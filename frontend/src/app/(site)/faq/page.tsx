import type { Metadata } from "next";

import { FaqGroups } from "@/components/faq";
import { PagePanel } from "@/components/page-panel";
import { FAQ_CONTENT } from "@/constants/faq";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Answers to common questions about booking, treatments and gift cards at ${SITE_NAME}.`,
};

export default function FaqPage() {
  const { heading, intro, groups } = FAQ_CONTENT;
  return (
    <PagePanel heading={heading} intro={intro}>
      <FaqGroups groups={groups} />
    </PagePanel>
  );
}
