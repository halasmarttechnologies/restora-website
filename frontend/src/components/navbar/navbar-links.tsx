import Link from "next/link";

import type { NavbarLinksProps } from "./navbar.types";

/** Inline link list shown on large screens. `children` are extra `<li>` items placed first. */
export function NavbarLinks({ links, children }: NavbarLinksProps) {
  return (
    <ul className="hidden items-center gap-6 text-base uppercase lg:flex xl:gap-11 xl:text-xl">
      {children}
      {links.map(({ label, href }) => (
        <li key={href}>
          <Link href={href} className="transition-opacity hover:opacity-70">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
