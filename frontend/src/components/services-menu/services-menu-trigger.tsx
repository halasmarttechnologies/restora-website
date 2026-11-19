"use client";

import type { PointerEvent } from "react";

import { SERVICES_MENU_IDS, useServicesMenu } from "./services-menu-context";
import type { ServicesMenuTriggerProps } from "./services-menu.types";

/**
 * Navbar button for the services panel: a mouse opens it on hover; a click, tap or the
 * keyboard (Enter / Space) toggles it.
 */
export function ServicesMenuTrigger({ label }: ServicesMenuTriggerProps) {
  const { open, openOnHover, toggle } = useServicesMenu();

  // Touch screens also fire pointerenter on tap; only a real mouse hover should open the menu.
  const onPointerEnter = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse") openOnHover();
  };

  return (
    <button
      type="button"
      id={SERVICES_MENU_IDS.trigger}
      aria-expanded={open}
      aria-controls={SERVICES_MENU_IDS.panel}
      onPointerEnter={onPointerEnter}
      onClick={toggle}
      className="cursor-pointer uppercase transition-opacity hover:opacity-70"
    >
      {label}
    </button>
  );
}
