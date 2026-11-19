import { AutoplayVideo } from "@/components/autoplay-video";

import type { HeroMediaProps } from "./hero.types";

/**
 * Background layer: a decorative video (or a neutral placeholder) with a bottom scrim that keeps
 * the white text legible. The video's pause button sits in the bottom-right corner.
 */
export function HeroMedia({ video }: HeroMediaProps) {
  return (
    <>
      {video ? (
        <AutoplayVideo
          src={video.src}
          posterSrc={video.posterSrc}
          eager
          className="absolute inset-0 -z-10 size-full object-cover"
          controlClassName="absolute right-5 bottom-6 sm:right-[30px] sm:bottom-[30px]"
        />
      ) : (
        <div
          data-hero-placeholder
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-brand-black/55"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-brand-black/50 to-transparent"
      />
    </>
  );
}
