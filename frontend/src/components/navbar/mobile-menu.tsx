"use client";

import Link from "next/link";
import { useCallback, useRef, useState, type MouseEvent } from "react";

import { useDismiss, type DismissReason } from "@/hooks/use-dismiss";

import { MobileServiceList } from "./mobile-service-list";
import type { MobileMenuProps } from "./navbar.types";

const BUTTON_ID = "mobile-menu-button";
const PANEL_ID = "mobile-menu-panel";

/**
 * Small-screen menu (below `lg`), with the same content as the desktop navbar: every service
 * (photo, code, name) under "Services", a link to all services, then the other pages.
 *
 * The panel slides down under the bar with the same animation as the desktop services menu
 * (grid row `0fr` → `1fr`) and is `inert` while closed. It closes on Escape (focus returns to
 * the button), a tap outside, or when a link is followed. `data-mobile-menu` lets the navbar
 * switch to its solid off-white style while the menu is open.
 */
export function MobileMenu({ services, allServices, links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const dismiss = useCallback((reason: DismissReason) => {
    setOpen(false);
    if (reason === "escape") document.getElementById(BUTTON_ID)?.focus();
  }, []);
  useDismiss(rootRef, open, dismiss);

  // Close once any link inside is followed (event delegation keeps the links simple).
  const closeOnLinkClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("a")) setOpen(false);
  };

  return (
    <div ref={rootRef} data-mobile-menu={open ? "open" : "closed"} className="lg:hidden">
      <button
        id={BUTTON_ID}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => setOpen(!open)}
        className="-my-2 cursor-pointer py-2 text-sm uppercase sm:text-base"
      >
        Menu
      </button>

      <div
        id={PANEL_ID}
        data-open={open}
        inert={!open}
        onClick={closeOnLinkClick}
        className="group/mobile absolute inset-x-0 top-full grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-[open=true]:grid-rows-[1fr] motion-reduce:transition-none"
      >
        <div className="min-h-0 overflow-hidden rounded-b-xl bg-brand-background text-brand-black">
          {/* Scrolls inside itself if the menu is taller than the screen. */}
          <div className="max-h-[calc(100svh-9.5rem)] -translate-y-2 overflow-y-auto px-5 pb-6 opacity-0 transition duration-500 group-data-[open=true]/mobile:translate-y-0 group-data-[open=true]/mobile:opacity-100 motion-reduce:transition-none sm:px-[30px]">
            <MobileServiceList services={services} allServices={allServices} />

            <ul className="text-base uppercase">
              {links.map(({ label, href }) => (
                <li key={href} className="border-b border-brand-black/15">
                  <Link href={href} className="block py-4 transition-opacity hover:opacity-60">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
