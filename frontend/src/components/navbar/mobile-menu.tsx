import Link from "next/link";

import type { NavbarLinksProps } from "./navbar.types";

/**
 * Small-screen menu built on native <details>, so it needs no client-side JavaScript.
 */
export function MobileMenu({ links }: NavbarLinksProps) {
  return (
    <details className="relative lg:hidden">
      <summary className="cursor-pointer list-none text-sm uppercase sm:text-base [&::-webkit-details-marker]:hidden">
        Menu
      </summary>
      <ul className="absolute top-full left-0 mt-4 flex w-56 flex-col gap-3 rounded-lg bg-brand-white p-5 text-sm text-brand-black uppercase">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link href={href} className="block transition-opacity hover:opacity-70">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
