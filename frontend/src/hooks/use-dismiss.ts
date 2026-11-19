"use client";

import { useEffect, type RefObject } from "react";

export type DismissReason = "escape" | "outside";

/**
 * While `active`, calls `onDismiss` when Escape is pressed or the pointer goes down outside
 * `ref`. Used for pop-overs such as the services menu.
 */
export function useDismiss(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onDismiss: (reason: DismissReason) => void,
) {
  useEffect(() => {
    if (!active) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss("escape");
    };
    const onPointerDown = (event: Event) => {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        onDismiss("outside");
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [ref, active, onDismiss]);
}
