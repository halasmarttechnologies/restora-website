import Link from "next/link";

import {
  ServicesMenuPanel,
  ServicesMenuProvider,
  ServicesMenuTrigger,
} from "@/components/services-menu";
import { PRIMARY_NAV_LINKS, SECONDARY_NAV_LINKS, SERVICES_NAV_LINK } from "@/constants/navigation";
import { SERVICES_MENU } from "@/constants/services-menu";
import { SITE_NAME } from "@/constants/site";

import { MobileMenu } from "./mobile-menu";
import { NavbarLinks } from "./navbar-links";
import { ScrollAwareHeader } from "./scroll-aware-header";

/** Every page link except Services, for the small-screen menu. */
const PAGE_LINKS = [...PRIMARY_NAV_LINKS, ...SECONDARY_NAV_LINKS];

/**
 * Navbar that hides while scrolling down and slides back in as a solid off-white bar while
 * scrolling up. At the top of the page it is transparent over the hero. The zero-height
 * sticky header lets the bar overlap the hero without affecting layout. On pages that open
 * with a light panel (`data-light-page`, see `PagePanel`) its text is dark instead of white.
 * On large screens, Services opens a drop-down panel of service cards inside the bar; on small
 * screens, Menu opens a panel with the same services and every other link (`MobileMenu`).
 */
export function Navbar() {
  return (
    <ServicesMenuProvider>
      <ScrollAwareHeader className="group sticky top-3 z-20 h-0 lg:top-[11px]">
        <nav
          aria-label="Primary"
          className="relative rounded-t-xl px-5 py-5 text-brand-white transition has-[[data-mobile-menu=open]]:bg-brand-background has-[[data-mobile-menu=open]]:text-brand-black/80 [body:has([data-light-page])_&]:text-brand-black/80 duration-300 ease-out group-data-[menu=open]:rounded-b-xl group-data-[menu=open]:bg-brand-background group-data-[menu=open]:text-brand-black/80 group-data-[scroll=down]:pointer-events-none group-data-[scroll=down]:-translate-y-full group-data-[scroll=down]:opacity-0 group-data-[scroll=up]:bg-brand-background group-data-[scroll=up]:text-brand-black/80 motion-reduce:transition-none sm:px-[30px] sm:py-[22px]"
        >
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            <div className="flex items-center">
              <NavbarLinks links={PRIMARY_NAV_LINKS}>
                <li>
                  <ServicesMenuTrigger label={SERVICES_NAV_LINK.label} />
                </li>
              </NavbarLinks>
              <MobileMenu
                services={SERVICES_MENU.services}
                allServices={SERVICES_MENU.action}
                links={PAGE_LINKS}
              />
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
          </div>

          <ServicesMenuPanel {...SERVICES_MENU} />
        </nav>
      </ScrollAwareHeader>
    </ServicesMenuProvider>
  );
}
