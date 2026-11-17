import type { FeaturedServicesProps } from "./featured-services.types";
import { ServiceCard } from "./service-card";

/**
 * Row of service cards. Scrolls horizontally with snap points on small screens and becomes a
 * three-column grid on desktop.
 */
export function FeaturedServices({ services }: FeaturedServicesProps) {
  return (
    <section aria-labelledby="featured-services-heading">
      <h2 id="featured-services-heading" className="sr-only">
        Featured services
      </h2>
      <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] sm:gap-5 lg:grid lg:grid-cols-3 lg:gap-9">
        {services.map((service) => (
          <li key={service.href} className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-auto">
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>
    </section>
  );
}
