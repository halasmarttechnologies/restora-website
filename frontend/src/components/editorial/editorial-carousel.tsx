"use client";

import Image from "next/image";
import { useState } from "react";

import { ArrowButton } from "@/components/arrow-button";
import { PillLink } from "@/components/pill-link";

import type { CarouselProps } from "./editorial.types";

/** One slide at a time with a looping "next" control and a large position counter. */
export function EditorialCarousel({ slides }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  if (!slide) return null;

  const position = `${index + 1} of ${slides.length}`;
  const showNext = () => setIndex((current) => (current + 1) % slides.length);

  return (
    <div aria-live="polite" className="flex flex-1 flex-col">
      {/* Keyed by index so each new slide remounts and replays the fade-in. */}
      <div
        key={index}
        role="group"
        aria-roledescription="slide"
        aria-label={position}
        className="flex flex-1 animate-fade-in flex-col motion-reduce:animate-none"
      >
        <div className="flex flex-1 items-center justify-center py-6">
          <div className="relative aspect-square w-1/2 max-w-[320px]">
            <Image src={slide.imageSrc} alt="" fill sizes="320px" className="object-contain" />
          </div>
        </div>
        <p className="text-sm uppercase sm:text-[15px]">{slide.name}</p>
        <p className="mt-0.5 text-[13px] text-brand-black/70 sm:text-sm">{slide.description}</p>
        <PillLink {...slide.action} tone="dark" className="mt-4 self-start" />
      </div>

      <p
        aria-hidden="true"
        className="absolute right-5 bottom-5 text-[32px] leading-none tracking-[-0.03em] sm:right-[30px] sm:bottom-[30px] lg:text-[46px]"
      >
        {index + 1}/{slides.length}
      </p>
      <ArrowButton
        label="Next slide"
        direction="right"
        onClick={showNext}
        className="absolute top-1/2 right-5 -translate-y-1/2 sm:right-[30px]"
      />
    </div>
  );
}
