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
    });
    expect(headers["Permissions-Policy"]).toContain("camera=()");
  });
});
