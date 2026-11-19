"use client";

import Image from "next/image";
import { useRef, useState, type UIEvent } from "react";

import { ArrowButton } from "@/components/arrow-button";
import { AutoplayVideo } from "@/components/autoplay-video";
import { PillLink } from "@/components/pill-link";

import type { SocialGalleryProps } from "./social-gallery.types";

const HEADING_ID = "social-gallery-heading";
/** Each arrow click scrolls this share of the visible strip width. */
const SCROLL_STEP = 0.8;
/** Width of the progress thumb, as a share of the track. */
const THUMB_SIZE = 0.25;

/**
 * Horizontally scrolling photo strip with arrow controls and a scroll-progress line. Shared by
 * the home page ("you + restora") and the service pages ("felt by you").
 */
export function SocialGallery({ heading, action, items }: SocialGalleryProps) {
  const stripRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = (event: UIEvent<HTMLUListElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = event.currentTarget;
    const max = scrollWidth - clientWidth;
    setProgress(max > 0 ? scrollLeft / max : 0);
  };

  // Smoothness comes from CSS (`scroll-smooth`), so reduced-motion users get instant jumps.
  const scrollStrip = (direction: 1 | -1) => {
    const strip = stripRef.current;
    strip?.scrollBy({ left: direction * strip.clientWidth * SCROLL_STEP });
  };

  return (
    <section
      aria-labelledby={HEADING_ID}
      className="rounded-xl bg-brand-background p-5 text-brand-black sm:p-[30px]"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 id={HEADING_ID} className="text-2xl tracking-[-0.02em] lowercase sm:text-[32px]">
          {heading}
        </h2>
        <PillLink {...action} tone="dark" />
      </div>

      <ul
        ref={stripRef}
        onScroll={onScroll}
        className="mt-5 flex snap-x snap-mandatory scroll-smooth gap-3 overflow-x-auto [scrollbar-width:none] motion-reduce:scroll-auto sm:mt-[30px] lg:gap-6"
      >
        {items.map(({ type, src, alt }) => (
          <li
            key={src}
            className="relative aspect-[4/5] w-[70%] shrink-0 snap-start overflow-hidden rounded-lg sm:w-[40%] lg:w-[28%]"
          >
            {type === "video" ? (
              <AutoplayVideo
                src={src}
                label={alt}
                className="absolute inset-0 size-full object-cover"
                controlClassName="absolute right-3 bottom-3"
              />
            ) : (
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 28vw, 70vw"
                className="object-cover"
              />
            )}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-5 sm:mt-[30px]">
        <div aria-hidden="true" className="relative h-px flex-1 bg-brand-black/15">
          <div
            className="absolute -top-px h-[3px] rounded-full bg-brand-black/70"
            style={{ width: `${THUMB_SIZE * 100}%`, left: `${progress * (1 - THUMB_SIZE) * 100}%` }}
          />
        </div>
        <div className="flex gap-2">
          <ArrowButton
            label="Scroll photos left"
            direction="left"
            disabled={progress <= 0}
            onClick={() => scrollStrip(-1)}
          />
          <ArrowButton
            label="Scroll photos right"
            direction="right"
            disabled={progress >= 0.99}
            onClick={() => scrollStrip(1)}
          />
        </div>
      </div>
    </section>
  );
}
