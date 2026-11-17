import type { FeaturedService } from "@/types/service";

export interface FeaturedServicesProps {
  readonly services: readonly FeaturedService[];
}

export interface ServiceCardProps {
  readonly service: FeaturedService;
}
