"use client";

import { useEffect, useRef } from "react";

import type { BackgroundVideoProps } from "./hero.types";

/**
 * Muted, looping background video. `autoPlay` alone is not reliable: browsers pause muted
 * autoplay video while the page is hidden or the video is off screen, and do not always
 * resume it. So playback is also started explicitly on mount and whenever the page becomes
 * visible again. A rejected `play()` (e.g. power-saving mode) is ignored; the poster stays.
 */
export function BackgroundVideo({ video }: BackgroundVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const play = () => {
      element.play().catch(() => {});
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") play();
    };

    play();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return (
    <video
      ref={ref}
      className="size-full object-cover"
      src={video.src}
      poster={video.posterSrc}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  );
}
