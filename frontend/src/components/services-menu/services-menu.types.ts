import type { CallToAction } from "@/types/call-to-action";
import type { Service, ServiceCategory } from "@/types/service";

export interface ServiceFilter {
  readonly label: string;
  /** Services shown for this filter. Leave out to show every service. */
  readonly category?: ServiceCategory;
}

export interface ServicesMenuContent {
  /** Row of filters above the cards; the first one is selected when the panel opens. */
  readonly filters: readonly ServiceFilter[];
  readonly services: readonly Service[];
  /** Pill link centred below the cards. */
  readonly action: CallToAction;
}

export interface ServiceFiltersProps {
  readonly filters: readonly ServiceFilter[];
  readonly activeIndex: number;
  readonly onSelect: (index: number) => void;
}

export interface ServicesCarouselProps {
  readonly services: readonly Service[];
}

export interface ServicesMenuTriggerProps {
  readonly label: string;
}
