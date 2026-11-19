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

Any Node.js host that supports Next.js 16 works. The chosen host is **Vercel**.

### Vercel

The repository is an npm-workspaces monorepo, so the Vercel project must point at the
frontend workspace:

| Setting          | Value                                                      |
| ---------------- | ---------------------------------------------------------- |
| Framework preset | Next.js (auto-detected)                                    |
| Root Directory   | `frontend`                                                 |
| Install command  | default (`npm install`; runs at the repo root, workspaces) |
| Build command    | default (`next build`)                                     |
| Output directory | default (`.next`)                                          |
| Node.js version  | 24.x (from `engines.node` in `frontend/package.json`)      |

Environment variables: none are required. `NEXT_PUBLIC_SITE_URL` is optional; without it the
site URL falls back to Vercel's `VERCEL_PROJECT_PRODUCTION_URL` (see `src/config/site.ts`).
Set it to the custom domain once one is connected.

Deploy either by importing the GitHub repository in the Vercel dashboard (pushes to `main`
then deploy to production, other branches get preview URLs), or with the CLI from the repo
root: `npx vercel link` (choose Root Directory `frontend`), then `npx vercel --prod`.

Notes:

- The Content-Security-Policy only allows this site's own origin, so the Vercel Toolbar
  (comments on preview deployments) is blocked. Add `https://vercel.live` to the relevant
  directives in `next.config.ts` if the team wants it.
- `npm audit` reports a ReDoS advisory in `picomatch`, pulled in only by development tools
  (Vitest, Vite, ESLint). Production dependencies have no known vulnerabilities
  (`npm audit --omit=dev`).

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
  - `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Resource-Policy: same-origin`:
    other sites cannot script this site's windows or embed its images, videos and scripts.
  - `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
    `Referrer-Policy: strict-origin-when-cross-origin`, and a `Permissions-Policy` that turns
    off camera, microphone, geolocation, payment, USB and Topics.
  - `Strict-Transport-Security` (2 years, subdomains) in production only.
- **Server Action uploads:** `experimental.serverActions.bodySizeLimit: "4.5mb"` allows the
  contact form's images (4 MB) while staying within Vercel's 4.5 MB request limit. Form
  validation and file checks are described in
  [frontend-architecture.md](../architecture/frontend-architecture.md#contact-form-componentscontact).
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
- The contact Server Action is connected to an email provider, with rate limiting
  (`TODO(contact)` in `frontend/src/actions/contact.ts`).
- The Privacy Policy and Terms have been reviewed by a lawyer.
