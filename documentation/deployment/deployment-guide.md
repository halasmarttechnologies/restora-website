# Deployment Guide

## Frontend

```bash
npm ci
npm run build --workspace=frontend
npm run start --workspace=frontend
```

`next start` serves the production build on port 3000.

Environment variables (see `frontend/.env.example`):

| Variable               | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used for metadata URLs |

Any Node.js host that supports Next.js 16 works (Vercel, a container, a VM). The hosting
target has not been chosen yet.

### Security configuration

Set in `frontend/next.config.ts` and covered by `frontend/tests/config/next-config.test.ts`:

- **No debug output in production.** `next build` produces production React (no dev
  warnings or tooling) and `productionBrowserSourceMaps: false` keeps source maps off the
  client. `poweredByHeader: false` removes the `X-Powered-By: Next.js` header.
- **React Strict Mode** (`reactStrictMode: true`): extra development-only checks; no effect on
  production output.
- **Headers on every route:**
  - `Content-Security-Policy`: everything same-origin only; no plugins (`object-src 'none'`);
    forms post only to this site; the site cannot be framed (`frame-ancestors 'none'`); HTTP
    sub-resources upgraded to HTTPS. Nonces are not used because they force every page to
    render dynamically; `'unsafe-inline'` is therefore allowed for scripts and styles
    (Next.js bootstrap scripts and React `style` props). `'unsafe-eval'` is development-only.
  - `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
    `Referrer-Policy: strict-origin-when-cross-origin`, and a `Permissions-Policy` that turns
    off camera, microphone, geolocation, payment, USB and Topics.
  - `Strict-Transport-Security` (2 years, subdomains) in production only.
- **When adding third-party services** (analytics, booking widgets, fonts, embeds), add their
  origins to the matching CSP directive, or the browser will block them.
- **Secrets:** never commit `.env` files; only `.env.example` files with placeholder values are
  tracked. Use `NEXT_PUBLIC_` only for values that are safe to expose to every visitor.

## Backend

Not deployable in Phase 01, because it has no transport layer. `npm run build --workspace=backend`
compiles to `backend/dist/` to keep the build pipeline verified.

## Pre-deployment checklist

- `npm run verify` passes.
- Environment variables are set for the target environment.
- The site is served over HTTPS (required by the HSTS and `upgrade-insecure-requests` headers).
- The newsletter Server Action is connected to an email provider (`TODO(newsletter)` in
  `frontend/src/actions/newsletter.ts`).
- Licensed brand font files are present (see
  [frontend-architecture.md](../architecture/frontend-architecture.md)).
