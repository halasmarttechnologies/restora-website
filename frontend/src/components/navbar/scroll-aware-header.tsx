"use client";

import { useScrollDirection } from "@/hooks/use-scroll-direction";

import type { ScrollAwareHeaderProps } from "./navbar.types";

/**
 * The navbar's only client-side code: exposes the scroll direction as `data-scroll`
 * (`top` | `down` | `up`) so styling stays in CSS and the rest of the navbar remains a
 * Server Component.
 */
export function ScrollAwareHeader({ className, children }: ScrollAwareHeaderProps) {
  const direction = useScrollDirection();

  return (
    <header data-scroll={direction} className={className}>
      {children}
    </header>
  );
}
