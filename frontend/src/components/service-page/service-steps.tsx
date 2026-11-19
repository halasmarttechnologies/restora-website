"use client";

import { useState } from "react";

import { ArrowButton } from "@/components/arrow-button";
import { SectionLabel } from "@/components/section-heading";

import type { ServiceStepsProps } from "./service-page.types";

/** The session one step at a time: a large step number, its text, and previous/next arrows. */
export function ServiceSteps({ headingId, heading, items }: ServiceStepsProps) {
  const [index, setIndex] = useState(0);
  const step = items[index];
  if (!step) return null;

  return (
    <>
      <SectionLabel id={headingId}>{heading}</SectionLabel>

      {/* Announces the new step to screen readers when the arrows change it. */}
      <div aria-live="polite" className="mt-auto pt-10">
        <p aria-hidden="true" className="text-[56px] leading-none tracking-[-0.04em] sm:text-7xl">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-6 text-lg tracking-[-0.01em] lowercase sm:text-xl">{step.title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-brand-black/80 sm:text-base">
          {step.body}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-brand-black/15 pt-4">
        <p className="text-xs tracking-[0.04em] text-brand-black/70 uppercase">
          {index + 1} of {items.length}
        </p>
        <div className="flex gap-2">
          <ArrowButton
            label="Previous step"
            direction="left"
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
          />
          <ArrowButton
            label="Next step"
            direction="right"
            disabled={index === items.length - 1}
            onClick={() => setIndex(index + 1)}
          />
        </div>
      </div>
    </>
  );
}
