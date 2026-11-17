import Link from "next/link";

import type { PillLinkProps } from "./pill-link.types";

const TONES = {
  light: "border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black",
  dark: "border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white",
} as const;

/** Outlined pill button used for calls to action. */
export function PillLink({ label, href, tone = "light", className = "" }: PillLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex h-[34px] items-center rounded-full border-[1.5px] px-6 text-sm font-medium uppercase transition-colors sm:text-[17px] ${TONES[tone]} ${className}`}
    >
      {label}
    </Link>
  );
}
