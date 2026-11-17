"use client";

import { useEffect, useState } from "react";

/** `top`: page not scrolled. `down` / `up`: direction of the latest scroll movement. */
export type ScrollDirection = "top" | "down" | "up";

/** Movements smaller than this (px) are ignored, so trackpad jitter does not flip the state. */
const THRESHOLD = 8;

export function useScrollDirection(): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>("top");

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;

      if (y <= 0) {
        setDirection("top");
      } else if (Math.abs(y - lastY) >= THRESHOLD) {
        setDirection(y > lastY ? "down" : "up");
      } else {
        return;
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return direction;
}
