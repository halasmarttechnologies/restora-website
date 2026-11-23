import Image from "next/image";
import Link from "next/link";

import { PillLink } from "@/components/pill-link";

import type { MobileMenuProps } from "./navbar.types";

/**
 * "Services" in the small-screen menu: a native `<details>` that expands to every service as a
 * row (photo, code, name) and a "View all services" link. Photos inside a closed `<details>`
 * are not loaded until it is opened.
 */
export function MobileServiceList({
  services,
  allServices,
}: Pick<MobileMenuProps, "services" | "allServices">) {
  return (
    <details className="group/services border-b border-brand-black/15">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-base uppercase [&::-webkit-details-marker]:hidden">
        Services
        <span
          aria-hidden="true"
          className="text-xl leading-none transition-transform group-open/services:rotate-45 motion-reduce:transition-none"
        >
          +
        </span>
      </summary>

      <ul className="flex flex-col gap-2">
        {services.map(({ code, name, href, imageSrc }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex items-center gap-3 rounded-lg bg-brand-white p-2 pr-4 transition-opacity hover:opacity-80"
            >
              <span className="relative size-14 shrink-0 overflow-hidden rounded-md">
                <Image src={imageSrc} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-[11px] text-brand-black/60">{code}</span>
                <span className="text-sm uppercase">{name}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <PillLink {...allServices} tone="dark" className="my-4" />
    </details>
  );
}
