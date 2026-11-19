import Link from "next/link";

import type { TextLinkProps } from "./text-link.types";

/** Underlined link inside running text (e.g. "agree to our Privacy Policy"). */
export function TextLink({ href, children }: TextLinkProps) {
  return (
    <Link href={href} className="underline underline-offset-2 hover:text-brand-black">
      {children}
    </Link>
  );
}
