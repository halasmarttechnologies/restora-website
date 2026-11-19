import type { ServiceReview } from "./service-page.types";
import { StarRating } from "./star-rating";

/** Fixed locale and time zone, so the server and every visitor show the same date. */
const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" });

/** One review: author and date on the left; stars, title and text on the right. */
export function ReviewCard({ author, rating, date, title, body }: ServiceReview) {
  return (
    <article className="grid gap-3 border-t border-brand-black/15 py-6 sm:grid-cols-[160px_1fr] sm:gap-8">
      <div className="text-sm">
        <p>{author}</p>
        <p className="mt-0.5 text-xs text-brand-black/60">
          <time dateTime={date}>{DATE_FORMAT.format(new Date(date))}</time>
        </p>
      </div>
      <div>
        <StarRating rating={rating} />
        <h3 className="mt-2 text-base">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-brand-black/80">{body}</p>
      </div>
    </article>
  );
}
