import { SITE_NAME } from "@/constants/site";

const DEFAULT_SITE_URL = "http://localhost:3000";

export const siteConfig = {
  name: SITE_NAME,
  description: `${SITE_NAME} — luxury massage and wellness services.`,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL,
} as const;
