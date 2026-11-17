import { BackgroundVideo } from "./background-video";
import type { HeroMediaProps } from "./hero.types";

/** Decorative background layer: video when available, otherwise a neutral placeholder. */
export function HeroMedia({ video }: HeroMediaProps) {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      {video ? (
        <BackgroundVideo video={video} />
      ) : (
        <div data-hero-placeholder className="size-full bg-brand-black/55" />
      )}
      {/* Scrim keeps the overlaid white text legible over any footage. */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-brand-black/50 to-transparent" />
    </div>
  );
}
