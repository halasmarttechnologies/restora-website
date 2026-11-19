const STARS = [1, 2, 3, 4, 5] as const;

interface StarRatingProps {
  readonly rating: number;
  /** Hide from screen readers when the rating is already written out next to the stars. */
  readonly decorative?: boolean;
}

/** Five stars with `rating` of them filled, announced as one image ("Rated 4 out of 5"). */
export function StarRating({ rating, decorative = false }: StarRatingProps) {
  const a11y = decorative
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": `Rated ${rating} out of 5` } as const);

  return (
    <span {...a11y} className="inline-flex gap-0.5 text-sm leading-none">
      {STARS.map((star) => (
        <span key={star} className={star <= Math.round(rating) ? "" : "text-brand-black/20"}>
          ★
        </span>
      ))}
    </span>
  );
}
