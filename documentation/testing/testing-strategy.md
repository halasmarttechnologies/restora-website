# Testing Strategy

## Approach: TDD

1. Define the expected behaviour.
2. Write a test and watch it fail.
3. Implement the minimum code to pass.
4. Refactor with the test green.

Phase 01 followed this loop: the navbar, hero, page, config and error tests were written and
confirmed failing before the implementations existed.

## Tooling

| Workspace | Runner | Environment | Libraries                                |
| --------- | ------ | ----------- | ---------------------------------------- |
| frontend  | Vitest | jsdom       | React Testing Library, jest-dom matchers |
| backend   | Vitest | node        | none                                     |

Tests live in each workspace's `tests/` directory, mirroring `src/`.

## Guidelines

- Query by role and accessible name (`getByRole("heading", { name })`) so tests double as
  accessibility checks.
- Test behaviour and output, not implementation details or class names.
- Keep business logic in plain functions or services so it can be tested without rendering UI.
- Vitest does not support async Server Components; cover them with end-to-end tests
  (Playwright, to be introduced when such components exist).

## Current suite (Phase 01)

- `frontend/tests/components/announcement-bar.test.tsx`: message inside a labelled landmark.
- `frontend/tests/components/navbar.test.tsx`: landmarks, home link, scroll direction (top / hide on down / reveal on up / jitter ignored), every configured link
  and its href, mobile menu toggle.
- `frontend/tests/components/autoplay-video.test.tsx`: muted / looping / inline; decorative
  vs labelled; lazy (`preload="metadata"`, first-frame `#t=0.1`) vs eager (autoplay); plays
  only once on screen; no autoplay with reduced motion; play / pause button.
- `frontend/tests/components/hero.test.tsx`: eyebrow, h1, call-to-action link, labelled
  region, placeholder without a video, muted/looping/inline video when one is supplied,
  `play()` on mount and when the page becomes visible again, blocked playback ignored.
- `frontend/tests/components/featured-services.test.tsx`: labelled region, one card per
  service, heading link and href, display word / description / duration,
  decorative icon and hover photo per card.
- `frontend/tests/components/feature-banner.test.tsx`: region labelled by its heading, body
  copy, call-to-action link, decorative background photo.
- `frontend/tests/components/editorial.test.tsx`: each story as a labelled region with body,
  link and decorative photo; carousel shows the first slide and its position, advances with
  "Next slide" and wraps around.
- `frontend/tests/components/brand-story.test.tsx`: gallery photos and videos with their descriptions, in order, social link,
  arrow buttons scroll right / left and disable at each end; values statement, link and
  `<details>` items; milestone heading, link and decorative photo.
- `frontend/tests/components/footer.test.tsx`: contentinfo landmark and copyright, every
  column heading and link, external links open safely in a new tab, labelled email field,
  Subscribe button, privacy link, success and invalid-email messages.
- `frontend/tests/lib/email.test.ts`: email normalisation, rejection cases and length limit.
- `frontend/tests/lib/contact.test.ts`: contact field validation (required, trimming, email,
  allowed reasons, length limits) and attachment rules (count, type, total size, real image
  contents for PNG/JPEG/WebP, disguised files rejected).
- `frontend/tests/actions/contact.test.ts`: the contact action accepts valid messages (with and
  without a real image), returns field errors with the typed values, rejects a disguised
  image, and silently drops honeypot submissions.
- `frontend/tests/components/contact-form.test.tsx`: labelled, required fields; reason
  options; hidden honeypot; images added by picker, drop and paste, listed and removable;
  too many images refused; images sent with the message; field errors shown and values kept
  (including the select); confirmation replaces the form.
- `frontend/tests/app/content-pages.test.tsx`: contact, privacy, terms, accessibility and FAQ
  pages render their `<h1>` in `<main>`, have metadata, and switch the navbar to dark text;
  the accessibility statement's standard, sections and contact link; FAQ groups with
  expandable answers.
- `frontend/tests/actions/newsletter.test.ts`: the sign-up action accepts valid and rejects
  invalid addresses.
- `frontend/tests/config/next-config.test.ts`: Strict Mode on, no `X-Powered-By`, no browser
  source maps, CSP and hardening headers on every route.
- `frontend/tests/components/about.test.tsx`: hero `<h1>`, link and decorative photo; founder
  note as a `<blockquote>` with sign-off; offering panel links and photo; reused service
  cards; statement banner; philosophy principles as `<details>`; technique cards (name,
  description, decorative photo); team members (role, bio, portrait or decorative initials);
  promise claims, link and photo; section order.
- `frontend/tests/components/services-menu.test.tsx`: closed and `inert` by default; no cards
  or photos until first opened; opens
  and closes from the Services button; opens on mouse hover and closes when the mouse leaves
  the navbar; a click after hover keeps it open; touch hover is ignored; one card per service (code, description, link,
  decorative photo); category filters; link to all services; closes on Escape (focus
  returns), outside click, followed link and scroll down; stays open on inside clicks;
  carousel arrows shown only when useful, one page per click.
- `frontend/tests/components/service-page.test.tsx`: hero (`<h1>`, code, description, photo,
  light-page marker), booking form (GET `/book`, hidden service, duration radios, first
  preselected), photo strip, specs `<dl>`, outcomes, step carousel (counter, arrows disabled
  at each end), expandable details, numbered aftercare, pairing links, gift link, reviews
  (empty-state invitation; average, stars and cards when present).
- `frontend/tests/app/service-pages.test.tsx`: each of the six service pages renders its name
  as the `<h1>` in `<main>` with a matching title; every menu entry and home-page card links
  to an existing page folder; no page repeats its hero photo; `createServicePage` throws for
  unknown slugs and pairings.
- `frontend/tests/components/disclosure-list.test.tsx`: one list item per entry, each body
  inside a closed `<details>`.
- `frontend/tests/config/site.test.ts`: site URL resolution (explicit URL, Vercel domain,
  localhost).
- `frontend/tests/app/site-layout.test.tsx`: announcement bar rendered, page content inside
  `<main>`, navbar and footer outside it.
- `frontend/tests/app/page.test.tsx`: home hero and every home section inside `<main>`; the
  gallery opens with the men's video, then photos, then the women's video.
- `frontend/tests/app/about-page.test.tsx`: About content inside `<main>`; page `title` and
  `description` metadata.
- `frontend/tests/app/render-page.tsx` (helper): renders a page inside the site layout.
- `backend/tests/config.test.ts`: defaults, valid values, invalid `NODE_ENV` and `PORT`,
  error shape.
- `backend/tests/app.test.ts`: composition root builds config.
