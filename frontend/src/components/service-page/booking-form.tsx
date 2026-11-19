import type { BookingFormProps } from "./service-page.types";

/**
 * Duration choice and "Book now". A plain GET form, so it needs no JavaScript: submitting
 * opens `/book?service=<slug>&duration=<minutes>`. The radios are visually hidden; each pill
 * is its label, and `has-[:checked]` styles the chosen one.
 */
export function BookingForm({ slug, serviceName, durations }: BookingFormProps) {
  return (
    <form
      action="/book"
      method="get"
      aria-label={`Book ${serviceName}`}
      className="mt-auto flex flex-col gap-6 pt-8"
    >
      <input type="hidden" name="service" value={slug} />

      <fieldset>
        <legend className="text-xs tracking-[0.04em] text-brand-black/70 uppercase">
          Duration
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {durations.map((minutes, index) => (
            <label
              key={minutes}
              className="cursor-pointer rounded-full border-[1.5px] border-brand-black/25 px-5 py-2 text-sm transition-colors hover:border-brand-black has-[:checked]:border-brand-black has-[:checked]:bg-brand-black has-[:checked]:text-brand-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-black/40"
            >
              <input
                type="radio"
                name="duration"
                value={minutes}
                defaultChecked={index === 0}
                className="sr-only"
              />
              {minutes} min
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="h-12 w-full cursor-pointer rounded-full bg-brand-black text-sm tracking-[0.04em] text-brand-white uppercase transition-opacity hover:opacity-85"
      >
        Book now
      </button>
    </form>
  );
}
