import { PillLink } from "@/components/pill-link";
import { SectionHeading } from "@/components/section-heading";

import { ReviewCard } from "./review-card";
import type { ServiceReviewsProps } from "./service-page.types";
import { StarRating } from "./star-rating";

const HEADING_ID = "service-reviews-heading";

/** Average rating and the list of reviews; an invitation to share one while there are none. */
export function ServiceReviews({ heading, items }: ServiceReviewsProps) {
  const average = items.reduce((sum, { rating }) => sum + rating, 0) / (items.length || 1);
  const count = `${items.length} ${items.length === 1 ? "review" : "reviews"}`;

  return (
    <section
      aria-labelledby={HEADING_ID}
      className="rounded-xl bg-brand-background px-5 py-12 text-brand-black sm:px-[30px] lg:py-16"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeading id={HEADING_ID}>{heading}</SectionHeading>

        {items.length === 0 ? (
          <>
            <p className="mt-4 text-sm leading-relaxed text-brand-black/80">
              No reviews yet. Had this treatment with us? We would love to hear how it felt.
            </p>
            <PillLink label="Share your experience" href="/contact" tone="dark" className="mt-5" />
          </>
        ) : (
          <>
            <p className="mt-3 flex items-center gap-3 text-sm">
              <StarRating rating={average} decorative />
              <span>
                {Number(average.toFixed(1))} out of 5 · {count}
              </span>
            </p>
            <ul className="mt-8">
              {items.map((review) => (
                <li key={`${review.author}-${review.date}`}>
                  <ReviewCard {...review} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
