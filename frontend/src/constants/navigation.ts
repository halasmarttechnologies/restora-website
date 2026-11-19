import type { NavLink } from "@/types/navigation";

/** Opens the services panel on large screens; a plain link in the small-screen menu. */
export const SERVICES_NAV_LINK: NavLink = { label: "Services", href: "/services" };

/** Links shown to the left of the wordmark on large screens, after Services. */
export const PRIMARY_NAV_LINKS: readonly NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
];

/** Links shown to the right of the wordmark on large screens. */
export const SECONDARY_NAV_LINKS: readonly NavLink[] = [
  { label: "Search", href: "/search" },
  { label: "Account", href: "/account" },
  { label: "Book", href: "/book" },
];

/** Every link, in order, for the small-screen menu. */
export const MOBILE_NAV_LINKS: readonly NavLink[] = [
  SERVICES_NAV_LINK,
  ...PRIMARY_NAV_LINKS,
  ...SECONDARY_NAV_LINKS,
];
