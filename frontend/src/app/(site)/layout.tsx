import type { ReactNode } from "react";

import { AnnouncementBar } from "@/components/announcement-bar";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ANNOUNCEMENT_MESSAGE } from "@/constants/site";

/**
 * Shared frame for every public page: announcement bar, sticky navbar, page content in
 * `<main>`, footer. Pages render only their own sections.
 */
export default function SiteLayout({ children }: { readonly children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 p-3 sm:gap-5 sm:px-6 lg:gap-[30px] lg:px-[43px] lg:pt-[11px]">
      <AnnouncementBar message={ANNOUNCEMENT_MESSAGE} />
      {/* Navbar, content and footer share this frame, so the sticky navbar spans all of them. */}
      <div className="flex flex-col">
        <Navbar />
        <main className="flex flex-col gap-3 sm:gap-5 lg:gap-9">{children}</main>
        <Footer className="mt-3 sm:mt-5 lg:mt-9" />
      </div>
    </div>
  );
}
