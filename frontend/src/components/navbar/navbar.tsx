import Link from "next/link";

import { PRIMARY_NAV_LINKS, SECONDARY_NAV_LINKS } from "@/constants/navigation";
import { SITE_NAME } from "@/constants/site";

import { MobileMenu } from "./mobile-menu";
import { NavbarLinks } from "./navbar-links";
import { ScrollAwareHeader } from "./scroll-aware-header";

const ALL_NAV_LINKS = [...PRIMARY_NAV_LINKS, ...SECONDARY_NAV_LINKS];

/**
 * Navbar that hides while scrolling down and slides back in as a solid off-white bar while
 * scrolling up. At the top of the page it is transparent over the hero. The zero-height
 * sticky header lets the bar overlap the hero without affecting layout.
 */
export function Navbar() {
  return (
    <ScrollAwareHeader className="group sticky top-3 z-20 h-0 lg:top-[11px]">
      <nav
        aria-label="Primary"
        className="grid grid-cols-[1fr_auto_1fr] items-center rounded-t-xl px-5 py-5 font-medium text-brand-white transition duration-300 ease-out group-data-[scroll=down]:pointer-events-none group-data-[scroll=down]:-translate-y-full group-data-[scroll=down]:opacity-0 group-data-[scroll=up]:bg-brand-background group-data-[scroll=up]:text-brand-black/80 motion-reduce:transition-none sm:px-[30px] sm:py-[22px]"
      >
        <div className="flex items-center">
          <NavbarLinks links={PRIMARY_NAV_LINKS} />
          <MobileMenu links={ALL_NAV_LINKS} />
        </div>

        <Link
          href="/"
          className="text-[32px] leading-none tracking-[-0.04em] lowercase transition-opacity hover:opacity-80 sm:text-[40px] xl:text-5xl"
        >
          {SITE_NAME}
        </Link>

        <div className="flex justify-end">
          <NavbarLinks links={SECONDARY_NAV_LINKS} />
        </div>
      </nav>
    </ScrollAwareHeader>
  );
}
