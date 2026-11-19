import { describe, expect, it } from "vitest";

import nextConfig from "../../next.config";

async function headersFor(path: string) {
  const rules = (await nextConfig.headers?.()) ?? [];
  const rule = rules.find(({ source }) => source === "/:path*");
  expect(rule, `no header rule covers ${path}`).toBeDefined();
  return Object.fromEntries((rule?.headers ?? []).map(({ key, value }) => [key, value]));
}

describe("next.config security", () => {
  it("enables React Strict Mode", () => {
    expect(nextConfig.reactStrictMode).toBe(true);
  });

  it("caps Server Action uploads below Vercel's 4.5 MB request limit", () => {
    expect(nextConfig.experimental?.serverActions?.bodySizeLimit).toBe("4.5mb");
  });

  it("hides the framework and ships no browser source maps", () => {
    expect(nextConfig.poweredByHeader).toBe(false);
    expect(nextConfig.productionBrowserSourceMaps).toBe(false);
  });

  it("sends a restrictive Content-Security-Policy on every route", async () => {
    const csp = (await headersFor("/"))["Content-Security-Policy"];

    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("form-action 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
  });

  it("sends the standard hardening headers", async () => {
    const headers = await headersFor("/");

    expect(headers).toMatchObject({
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Resource-Policy": "same-origin",
    });
    expect(headers["Permissions-Policy"]).toContain("camera=()");
  });
});
