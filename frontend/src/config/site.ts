import { SITE_NAME } from "@/constants/site";

const LOCAL_SITE_URL = "http://localhost:3000";

type SiteUrlEnv = Partial<
  Record<"NEXT_PUBLIC_SITE_URL" | "VERCEL_PROJECT_PRODUCTION_URL", string | undefined>
>;

/**
 * Absolute site URL used for metadata (canonical links, social previews).
 * 1. `NEXT_PUBLIC_SITE_URL`: set this once a custom domain is live.
 * 2. `VERCEL_PROJECT_PRODUCTION_URL`: provided by Vercel (host only, e.g. `x.vercel.app`).
 * 3. Localhost during local development.
 */
export function resolveSiteUrl(env: SiteUrlEnv): string {
  if (env.NEXT_PUBLIC_SITE_URL) return env.NEXT_PUBLIC_SITE_URL;
  if (env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return LOCAL_SITE_URL;
}

export const siteConfig = {
  name: SITE_NAME,
  description: `${SITE_NAME} — luxury massage and wellness services.`,
  url: resolveSiteUrl({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  }),
} as const;
