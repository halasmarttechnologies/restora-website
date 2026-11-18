import type { Metadata } from "next";

import { About } from "@/components/about";
import { ABOUT_CONTENT } from "@/constants/about";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: "About",
  description: `The philosophy behind ${SITE_NAME}: considered massage and wellness treatments, tailored to you.`,
};

export default function AboutPage() {
  return <About {...ABOUT_CONTENT} />;
}
