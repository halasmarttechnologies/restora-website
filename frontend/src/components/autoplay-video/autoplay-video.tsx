"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

import type { AutoplayVideoProps } from "./autoplay-video.types";
import { VideoToggle } from "./video-toggle";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Muted, looping, inline video that plays only when it makes sense:
 *
 * - while at least a quarter of it is on screen and the tab is visible (saves battery and data;
 *   browsers can also pause muted video in background tabs and not resume it on their own);
 * - not automatically for visitors who prefer reduced motion;
 * - never after the visitor pauses it with the button (WCAG 2.2.2 "Pause, Stop, Hide").
 *
 * Renders the <video> and its play / pause button as siblings, so the parent positions both.
 */
export function AutoplayVideo({
  src,
  posterSrc,
  label,
  eager = false,
  className = "",
  controlClassName = "",
}: AutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  // The visitor's own choice from the button; `null` until they use it.
  const choice = useRef<"play" | "pause" | null>(null);

  // Button state mirrors the element itself (its play / pause events), so it is always right.
  const subscribe = useCallback((onChange: () => void) => {
    const video = ref.current;
    video?.addEventListener("play", onChange);
    video?.addEventListener("pause", onChange);
    return () => {
      video?.removeEventListener("play", onChange);
      video?.removeEventListener("pause", onChange);
    };
  }, []);
  const playing = useSyncExternalStore(
    subscribe,
    () => ref.current?.paused === false,
    () => false,
  );

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduceMotion = window.matchMedia?.(REDUCED_MOTION).matches ?? false;
    // Without IntersectionObserver (very old browsers, tests), treat the video as on screen.
    let onScreen = typeof IntersectionObserver === "undefined";

    const sync = () => {
      const wanted = choice.current ? choice.current === "play" : !reduceMotion;
      if (wanted && onScreen && document.visibilityState !== "hidden") {
        video.play().catch(() => {}); // Blocked (e.g. power saving): the first frame stays.
      } else if (!video.paused) {
        video.pause();
      }
    };

    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              onScreen = entry?.isIntersecting ?? false;
              sync();
            },
            { threshold: 0.25 },
          );
    observer?.observe(video);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    choice.current = video.paused ? "play" : "pause";
    if (choice.current === "play") video.play().catch(() => {});
    else video.pause();
  };

  return (
    <>
      <video
        ref={ref}
        // Without a poster, `#t=0.1` makes the browser show the first frame instead of a blank box.
        src={posterSrc ? src : `${src}#t=0.1`}
        poster={posterSrc}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        autoPlay={eager}
        preload={eager ? "auto" : "metadata"}
        muted
        loop
        playsInline
        className={className}
      />
      <VideoToggle playing={playing} onToggle={toggle} className={controlClassName} />
    </>
  );
}
