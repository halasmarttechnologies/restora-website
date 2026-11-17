import { describe, expect, it } from "vitest";

import { resolveSiteUrl } from "@/config/site";

describe("resolveSiteUrl", () => {
  it("prefers an explicitly configured site URL", () => {
    expect(
      resolveSiteUrl({
        NEXT_PUBLIC_SITE_URL: "https://www.restora.example",
        VERCEL_PROJECT_PRODUCTION_URL: "restora.vercel.app",
      }),
    ).toBe("https://www.restora.example");
  });

  it("falls back to the Vercel production domain over HTTPS", () => {
    expect(resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "restora.vercel.app" })).toBe(
      "https://restora.vercel.app",
    );
  });

  it("uses localhost during local development", () => {
    expect(resolveSiteUrl({})).toBe("http://localhost:3000");
  });

  it("ignores empty values", () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "", VERCEL_PROJECT_PRODUCTION_URL: "" })).toBe(
      "http://localhost:3000",
    );
  });
});
