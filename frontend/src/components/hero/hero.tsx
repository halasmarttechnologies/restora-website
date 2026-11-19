import { PillLink } from "@/components/pill-link";

import { HeroMedia } from "./hero-media";
import type { HeroProps } from "./hero.types";

const HERO_HEADING_ID = "hero-heading";

export function Hero({ eyebrow, heading, action, video }: HeroProps) {
  return (
    <section
      aria-labelledby={HERO_HEADING_ID}
      className="relative isolate flex min-h-[560px] short:min-h-[300px] flex-1 flex-col justify-end overflow-hidden rounded-xl text-brand-white"
    >
      <HeroMedia video={video} />

      <div className="px-5 pt-32 pb-6 short:pt-20 sm:px-[30px] sm:pb-[30px]">
        <p className="text-sm uppercase sm:text-lg">{eyebrow}</p>
        <h1
          id={HERO_HEADING_ID}
          className="mt-2 max-w-[52rem] text-[28px] leading-[1.2] tracking-[-0.02em] sm:text-4xl lg:text-[46px] lg:leading-[1.27]"
        >
          {heading}
        </h1>
        <PillLink {...action} className="mt-4 sm:mt-5" />
      </div>
    </section>
  );
}
