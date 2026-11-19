import type { ServiceFiltersProps } from "./services-menu.types";

/** Centred row of toggle buttons; the selected one is dark and underlined. */
export function ServiceFilters({ filters, activeIndex, onSelect }: ServiceFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filter services"
      className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-base xl:gap-x-12 xl:text-xl"
    >
      {filters.map(({ label }, index) => (
        <button
          key={label}
          type="button"
          aria-pressed={index === activeIndex}
          onClick={() => onSelect(index)}
          className="cursor-pointer border-b-[1.5px] uppercase border-transparent pb-1 text-brand-black/45 transition-colors hover:text-brand-black aria-pressed:border-brand-black aria-pressed:text-brand-black"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
