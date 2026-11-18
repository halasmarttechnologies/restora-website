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
- `frontend/tests/components/brand-story.test.tsx`: gallery photos with alt text, social link,
  arrow buttons scroll right / left and disable at each end; values statement, link and
  `<details>` items; milestone heading, link and decorative photo.
- `frontend/tests/components/footer.test.tsx`: contentinfo landmark and copyright, every
  column heading and link, external links open safely in a new tab, labelled email field,
  Subscribe button, privacy link, success and invalid-email messages.
- `frontend/tests/lib/newsletter.test.ts`: email normalisation and rejection cases.
- `frontend/tests/actions/newsletter.test.ts`: the sign-up action accepts valid and rejects
  invalid addresses.
- `frontend/tests/config/next-config.test.ts`: Strict Mode on, no `X-Powered-By`, no browser
  source maps, CSP and hardening headers on every route.
- `frontend/tests/components/about.test.tsx`: hero `<h1>`, link and decorative photo; founder
  note as a `<blockquote>` with sign-off; offering panel links and photo; reused service
  cards; statement banner; philosophy principles as `<details>`; technique cards (name,
  description, decorative photo); team members (role, bio, portrait or decorative initials);
  promise claims, link and photo; section order.
- `frontend/tests/components/disclosure-list.test.tsx`: one list item per entry, each body
  inside a closed `<details>`.
- `frontend/tests/config/site.test.ts`: site URL resolution (explicit URL, Vercel domain,
  localhost).
- `frontend/tests/app/site-layout.test.tsx`: announcement bar rendered, page content inside
  `<main>`, navbar and footer outside it.
- `frontend/tests/app/page.test.tsx`: home hero and every home section inside `<main>`.
- `frontend/tests/app/about-page.test.tsx`: About content inside `<main>`; page `title` and
  `description` metadata.
- `frontend/tests/app/render-page.tsx` (helper): renders a page inside the site layout.
- `backend/tests/config.test.ts`: defaults, valid values, invalid `NODE_ENV` and `PORT`,
  error shape.
- `backend/tests/app.test.ts`: composition root builds config.
