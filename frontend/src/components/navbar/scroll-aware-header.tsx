"use client";

import { useCallback, useEffect, useRef, type PointerEvent } from "react";

import { SERVICES_MENU_IDS, useServicesMenu } from "@/components/services-menu";
import { useDismiss, type DismissReason } from "@/hooks/use-dismiss";
import { useScrollDirection } from "@/hooks/use-scroll-direction";

import type { ScrollAwareHeaderProps } from "./navbar.types";

/**
 * The navbar's client-side shell. Exposes state as data attributes so styling stays in CSS:
 * `data-scroll` (`top` | `down` | `up`) and `data-menu` (`open` | `closed`). It also closes the
 * services menu on Escape, on a click outside the navbar, when the mouse leaves the navbar,
 * and when the navbar hides on scroll.
 */
export function ScrollAwareHeader({ className, children }: ScrollAwareHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const direction = useScrollDirection();
  const { open, close } = useServicesMenu();

  const dismiss = useCallback(
    (reason: DismissReason) => {
      close();
      // Keyboard users go back to where they were.
      if (reason === "escape") document.getElementById(SERVICES_MENU_IDS.trigger)?.focus();
    },
    [close],
  );
  useDismiss(headerRef, open, dismiss);

  useEffect(() => {
    if (direction === "down") close();
  }, [direction, close]);

  // A hover-opened menu closes once the mouse leaves the navbar (bar and panel together).
  const onPointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") close();
  };

  return (
    <header
      ref={headerRef}
      onPointerLeave={onPointerLeave}
      data-scroll={direction}
      data-menu={open ? "open" : "closed"}
      className={className}
    >
      {children}
    </header>
  );
}
