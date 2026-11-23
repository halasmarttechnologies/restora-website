import type { ServicesMenuContent } from "@/components/services-menu";

export interface ServicesOverviewProps extends Pick<ServicesMenuContent, "filters" | "services"> {
  /** The page's `<h1>`. */
  readonly heading: string;
  readonly intro: string;
}
