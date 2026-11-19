import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy without nonces, so pages stay statically prerendered
 * (see node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md).
 * `'unsafe-inline'` is required by Next.js inline bootstrap scripts and React `style` props;
 * `'unsafe-eval'` is only allowed in development (React debugging, Fast Refresh).
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Other sites' windows cannot script this one (opened via links or popups)...
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // ...nor embed its images, videos and scripts on their own pages.
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  // HTTPS only: browsers ignore HSTS over plain HTTP, and it must never pin localhost.
  ...(isDev
    ? []
    : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]),
];

const nextConfig: NextConfig = {
  // Extra development-only checks (double-invoked renders/effects); no effect in production.
  reactStrictMode: true,
  // Do not advertise the framework in an `X-Powered-By` header.
  poweredByHeader: false,
  // Never publish source maps to browsers in production (explicit; this is the default).
  productionBrowserSourceMaps: false,
  experimental: {
    serverActions: {
      // Room for contact-form images (4 MB, see ATTACHMENT_LIMITS) plus multipart overhead,
      // without exceeding Vercel's 4.5 MB request limit. The default is 1 MB.
      bodySizeLimit: "4.5mb",
    },
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
