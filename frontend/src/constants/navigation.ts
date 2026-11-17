import type { NavLink } from "@/types/navigation";

/** Links shown to the left of the wordmark on large screens. */
export const PRIMARY_NAV_LINKS: readonly NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
];

/** Links shown to the right of the wordmark on large screens. */
export const SECONDARY_NAV_LINKS: readonly NavLink[] = [
  { label: "Search", href: "/search" },
  { label: "Account", href: "/account" },
  { label: "Book", href: "/book" },
];
