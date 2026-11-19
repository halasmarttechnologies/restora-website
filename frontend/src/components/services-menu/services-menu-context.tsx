"use client";

import { createContext, use, useCallback, useMemo, useRef, useState, type ReactNode } from "react";

/** Element ids linking the trigger and the panel (`aria-controls`, focus return). */
export const SERVICES_MENU_IDS = {
  trigger: "services-menu-trigger",
  panel: "services-menu-panel",
} as const;

interface ServicesMenuState {
  readonly open: boolean;
  /** Whether the menu has been opened at least once on this page. */
  readonly hasOpened: boolean;
  /** Mouse hover: opens the menu. */
  readonly openOnHover: () => void;
  /** Click, tap or keyboard. A click right after a hover-open keeps the menu open. */
  readonly toggle: () => void;
  readonly close: () => void;
}

const ServicesMenuContext = createContext<ServicesMenuState | null>(null);

/** Holds the open / closed state shared by the trigger, the panel and the navbar shell. */
export function ServicesMenuProvider({ children }: { readonly children: ReactNode }) {
  const [open, setOpen] = useState(false);
  // Becomes true the first time the menu opens; the panel only renders its cards (and loads
  // their photos) from then on, so pages where nobody opens the menu don't download them.
  const [hasOpened, setHasOpened] = useState(false);
  // True between a hover-open and the next click, so that click does not close the menu again.
  const openedByHover = useRef(false);

  const openOnHover = useCallback(() => {
    if (open) return;
    openedByHover.current = true;
    setOpen(true);
    setHasOpened(true);
  }, [open]);

  const toggle = useCallback(() => {
    if (openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    setOpen((isOpen) => !isOpen);
    setHasOpened(true);
  }, []);

  const close = useCallback(() => {
    openedByHover.current = false;
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({ open, hasOpened, openOnHover, toggle, close }),
    [open, hasOpened, openOnHover, toggle, close],
  );

  return <ServicesMenuContext value={value}>{children}</ServicesMenuContext>;
}

export function useServicesMenu(): ServicesMenuState {
  const state = use(ServicesMenuContext);
  if (!state) {
    throw new Error("useServicesMenu must be used inside <ServicesMenuProvider>.");
  }
  return state;
}
