import type { Metadata } from "next";

import { ContactForm } from "@/components/contact";
import { PagePanel } from "@/components/page-panel";
import { CONTACT_CONTENT, CONTACT_REASONS } from "@/constants/contact";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Questions about bookings, treatments or gift cards? Send ${SITE_NAME} a message.`,
};

export default function ContactPage() {
  return (
    <PagePanel heading={CONTACT_CONTENT.heading} intro={CONTACT_CONTENT.intro}>
      <ContactForm reasons={CONTACT_REASONS} />
    </PagePanel>
  );
}
