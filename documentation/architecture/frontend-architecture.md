# Frontend Architecture

## Stack

- Next.js 16.4 (App Router, Turbopack), React 19, TypeScript (strict)
- Tailwind CSS v4 (CSS-first configuration in `src/app/globals.css`)
- Vitest + React Testing Library + jsdom

## Directory layout

```text
frontend/
├── public/            fonts/, images/, icons/, assets/
├── src/
│   ├── app/           Root layout (html/body, metadata), global styles (design tokens)
│   │   └── (site)/    Route group for public pages; does not appear in URLs
│   │       ├── layout.tsx   Shared frame: announcement bar, navbar, <main>, footer
│   │       ├── page.tsx     Home (/)
│   │       └── about/page.tsx   About (/about)
│   ├── actions/       Server Actions ("use server"), e.g. newsletter sign-up
│   ├── components/    One folder per component (see below)
│   ├── config/        Runtime configuration (site metadata, env-derived values)
│   ├── constants/     Static, compile-time content (copy, links, image paths)
│   ├── hooks/         Client hooks (use-scroll-direction)
│   ├── lib/           Framework-free logic (newsletter validation)
│   ├── types/         Shared domain types (NavLink, CallToAction, FeaturedService)
│   └── utils/ styles/ Reserved, currently empty
└── tests/             Mirrors src/ (components, app, actions, lib)
```

## Component rules

- Every component lives in its own lowercase folder: `components/<name>/<name>.tsx`.
- Each folder exposes a barrel `index.ts`; consumers import from `@/components/<name>`.
- A `<name>.types.ts` file holds the component's prop types. It is added only when the
  component has props (no empty files).
- Private sub-parts of a component live in the same folder and are not exported from the
  barrel (e.g. `navbar/mobile-menu.tsx`, `hero/hero-media.tsx`).
- Editable copy and link lists live in `src/constants/` (`home.ts`, `about.ts`,
  `navigation.ts`, …), not inside components, so content can change without touching markup.
- Components are Server Components unless interactivity requires `"use client"`.

## Pages

Every public page lives in the `app/(site)/` route group and renders **only its own
sections**: the group's `layout.tsx` supplies the announcement bar, the sticky navbar, the
`<main>` landmark (with the standard section gap) and the footer. To add a page:

1. Create `components/<page>/` with `<page>.tsx` composing one file per section, plus
   `<page>.types.ts` and `index.ts` (see `components/about/`).
2. Put its copy and image paths in `constants/<page>.ts`.
3. Add `app/(site)/<page>/page.tsx` that exports `metadata` (`title` is short, e.g. "About";
   the root layout's template appends "| Restora") and renders the page component.

Shared building blocks (`SplitRow`, `PillLink`, `ArrowButton`, `FeaturedServices`) are reused
across pages instead of copied.

## Design tokens

Defined once in `src/app/globals.css`:

| Token                | Value             | Tailwind utility                |
| -------------------- | ----------------- | ------------------------------- |
| `--color-background` | `#F1F0ED`         | `bg-brand-background`           |
| `--color-black`      | `#222222`         | `text-brand-black`              |
| `--color-white`      | `#FFFFFF`         | `text-brand-white`              |
| `--font-brand`       | Swiss721 BT stack | `font-sans` (the default stack) |

Only `brand-*` colors may be used in components. Adding a color requires design approval and
an update to this table.

Usage: the page background is `--color-white`; the announcement bar is `--color-black` with
white text. `--color-background` (off-white) is used by the scrolled navbar and the service
cards. Opacity variants of brand colors (e.g.
`bg-brand-black/55`) are permitted for overlays; they introduce no new hues.

The `themeColor` value in `layout.tsx` mirrors `--color-white`, because Next.js metadata
cannot read CSS variables.

## Typography — pending asset

The brand typeface is **Swiss721 BT Medium**. The licensed font files have **not been supplied
yet**. Until they are:

- `--font-brand` resolves to `"Swiss721 BT", "Helvetica Neue", Helvetica, Arial, sans-serif`
  at weight 500. Swiss 721 is Bitstream's Helvetica design, so the fallback is visually close.
- No other font has been substituted permanently.

When the files arrive:

1. Add `swiss721-bt-medium.woff2` to `src/app/fonts/` (so `next/font/local` can self-host and
   preload it). Keep any other licensed formats in `public/fonts/`.
2. In `layout.tsx`, load it with
   `localFont({ src: "./fonts/swiss721-bt-medium.woff2", weight: "500", variable: "--font-swiss721", display: "swap" })`
   and add `font.variable` to the `<html>` class list.
3. Change `--font-brand` to `var(--font-swiss721), "Helvetica Neue", Helvetica, Arial, sans-serif`.
4. Update this section.

## Home page

Layout (desktop reference measurements at 1900px wide): 43px side gutter; an announcement bar
11px from the top, 36px tall; a 30px gap; then a rounded (12px) media card filling the rest of
the viewport. On smaller screens the gutter shrinks to 12–24px.

- `AnnouncementBar` (`<aside aria-label="Announcement">`): black rounded strip, 11px white
  uppercase text, centered.
- `Navbar` (`<header>`, laid over the top of the hero card):
  - three columns: primary links on the left, lowercase `restora` wordmark in the center,
    secondary links on the right (from `constants/navigation.ts`);
  - reveal on scroll up: a zero-height `sticky` header docks the bar at the page's top padding
    (11px on desktop). At the top of the page it is transparent with white text. Scrolling down
    hides it (slides up and fades out); scrolling up brings it back as an off-white
    (`--color-background`) bar with `brand-black/80` text. Back at the top it is transparent
    again;
  - the direction comes from `hooks/use-scroll-direction.ts` (`top` | `down` | `up`; passive
    listener; movements under 8px are ignored; re-renders only when the value changes).
    `ScrollAwareHeader` is the navbar's only Client Component; it sets `data-scroll`, and all
    styling stays in Tailwind `group-data-[scroll=…]:` classes;
  - below 1024px the link lists are hidden and a `Menu` toggle opens a panel with all links,
    built on native `<details>`/`<summary>` (no JavaScript).
- `Hero` (`<section>` labelled by its `<h1>`): eyebrow, large headline (46px desktop) and an
  outlined pill link, anchored bottom-left with 30px insets. Content comes from props, supplied
  by `constants/home.ts`.
- `HeroMedia`: the background layer. With no `video` prop it renders a neutral
  `brand-black/55` placeholder; with `video={{ src, posterSrc }}` it renders `BackgroundVideo`.
  A bottom scrim (brand black, 50% to transparent) keeps text legible over footage.
- `BackgroundVideo` (Client Component): a muted, looping, inline `<video autoPlay>`. Browsers
  pause muted autoplay video while the page is hidden or the video is off screen and do not
  always resume it, so it also calls `play()` on mount and whenever the page becomes visible
  again (a rejected `play()` is ignored).

- First screen: `page.tsx` gives the hero a minimum height of the viewport minus the
  announcement bar and page padding, so the hero still fills the screen with sections below it.
- `FeaturedServices` (`<section>` labelled "Featured services", visually hidden `<h2>`): three
  service cards from `constants/services.ts` (type `FeaturedService` in `types/service.ts`).
  Desktop: three-column grid, 36px gap, cards 5:6. Below 1024px: horizontal scroll with snap
  points.
  - `ServiceCard`: off-white (`--color-background`) card with a large lowercase display word, a centred service icon (`iconSrc`), and the service name, duration
    and description. The `<h3>` link is stretched over the card, so the whole card is
    clickable.
  - Hover / keyboard focus: the icon fades and shrinks out, the service photo (`imageSrc`)
    fades in behind a brand-black scrim, and the text turns white. Transitions are disabled
    under `prefers-reduced-motion`.
  - Icons live in `public/images/services/icons/` as transparent WebP in brand black
    (`#222222`). Source artwork on a coloured background is converted by mapping darkness to
    alpha and cropping to the artwork, so it sits cleanly on any brand surface.
- `FeatureBanner` (`<section>` labelled by its `<h2>`): full-width rounded photo card with a
  centred lowercase headline, short copy and a `PillLink`. Content from `HOME_FEATURE_BANNER`
  in `constants/home.ts`; photo in `public/images/banners/`. Desktop ratio 21:10 (1800×857 at
  1900px), 16:9 from 640px, at least 520px tall on phones (cropped towards the left so the
  face stays in frame). A 30% brand-black tint keeps the white text legible.
- `Editorial`: a stack of rows, each a photo square beside an off-white panel square
  (shared `SplitRow`, its own `<section>` labelled by the panel's `<h2>`). Desktop: two columns, 36px
  gap, photo side alternating start / end / start. Phones: photo first, then the panel. Content
  from `HOME_EDITORIAL` in `constants/home.ts`; photos in `public/images/editorial/`.
  - First row: `EditorialCarousel` (Client Component). One slide at a time (centred artwork,
    name, description, dark `PillLink`), a circular "Next slide" button that loops, and a
    large `1/3` counter. Each slide is a `role="group"` labelled "n of total" inside a polite
    live region; slides fade in (`animate-fade-in`, defined in `globals.css`, off under
    reduced motion). Its row heading is visually hidden.
  - Other rows: `StoryPanel` with a lowercase headline, short copy and a dark `PillLink`,
    anchored to the bottom of the panel.
- `BrandStory`: three blocks from `HOME_BRAND_STORY` in `constants/home.ts`; images in
  `public/images/brand-story/` (gallery photos in `gallery/`).
  - `SocialGallery` (Client Component): off-white panel with a lowercase heading, a dark
    "Find us on social" `PillLink`, and a horizontally scrolling photo strip (snap points,
    hidden scrollbar, ~3.5 photos visible on desktop). Below it, a thin progress line and left
    / right `ArrowButton`s that scroll 80% of the visible width and disable at either end.
    Smooth scrolling comes from CSS, so reduced-motion users get instant jumps. Photos carry
    real `alt` text (they are content, not decoration).
  - Values row (`SplitRow`, photo on the right): `ValuesPanel` with a large statement, a dark
    `PillLink`, and an expandable list built on native `<details>` (no JavaScript); `+`
    rotates to `×` when open. Row heading is visually hidden.
  - `MilestoneBanner`: wide photo card (4:5 phones, 16:9 tablets, 9:5 desktop) with an
    uppercase headline and light `PillLink` in the top-left over a soft top scrim.
- `Footer` (`<footer>`, outside `<main>`): off-white rounded card. Content from
  `constants/footer.ts` (`FOOTER_CONTENT`).
  - Oversized lowercase wordmark, decorative (`aria-hidden`). Sized in container units
    (`@container` + `text-[36.8cqw]`) so it spans the footer's width at every screen size.
  - Below a divider: newsletter sign-up (left, with a vertical divider on desktop) and a
    `nav` labelled "Footer" with four `FooterColumn`s (Navigate, Social, Official, Support).
    Column items are links or plain text notes; external links open in a new tab with
    `rel="noopener noreferrer"`.
  - `NewsletterForm` (Client Component): labelled email field + Subscribe button using
    `useActionState` with the `subscribeToNewsletter` Server Action (`src/actions/newsletter.ts`).
    The result is announced in a `role="status"` line; the button shows "Subscribing…" while
    pending. Email validation lives in `src/lib/newsletter.ts` (`normalizeEmail`).
  - **Not connected yet:** the action validates the address but does not store or send it.
    Connect it to the chosen email provider at the `TODO(newsletter)` line before launch.
  - The copyright year is a fixed string (computing it would make the page dynamic under
    `cacheComponents`); update it each January.
- `SplitRow` (shared): two equal squares, a photo and an off-white content panel; `mediaPosition`
  sets the photo side on desktop. Used by `Editorial` and `BrandStory`.
- `ArrowButton` (shared): small round outlined arrow button (`direction` left / right) for
  carousel and gallery controls.
- `PillLink` (shared): outlined pill call-to-action. `tone="light"` (default, white) over
  photos and video; `tone="dark"` (brand black) on light panels. Takes a `CallToAction`
  (`types/call-to-action.ts`) plus an optional `className` for spacing.

## About page (`/about`)

`components/about/about.tsx` composes the sections below (one file each); content and image
paths come from `ABOUT_CONTENT` in `constants/about.ts`. Images reuse existing site photos.

- `AboutHero` (`<section>` labelled by the page's `<h1>`): wide photo card (4:5 phones, 16:9
  tablets, 21:9 desktop), heading and dark `PillLink` in the bottom-right corner. The image is
  the page's largest paint, so it loads eagerly with `fetchPriority="high"` (Next.js 16
  deprecates `priority`). A top scrim keeps the white navbar legible over the light photo.
- `FounderNote`: off-white panel, small uppercase label, centred `<blockquote>` inside a
  `<figure>` with a `<figcaption>` sign-off. Quotation marks come from CSS (`open-quote` /
  `close-quote`), so the copy stays plain text.
- Offering row: shared `SplitRow` (photo left) with `OfferingPanel`: lowercase heading, copy,
  dark `PillLink`, and a divided list of links. The links are derived from
  `FEATURED_SERVICES`, so they always match the service cards.
- `FeaturedServices`: the same service cards as the home page.
- `StatementBanner`: wide photo shown in greyscale (fits the black-and-white palette) under a
  25% black tint, with one centred statement as the `<h2>`.
- Philosophy row: shared `SplitRow` (photo left) with `PhilosophyPanel`: lowercase heading,
  short copy, and the shared `DisclosureList` of principles pinned to the bottom.
- `Techniques`: off-white panel with a heading, copy and a list of `TechniqueCard`s (square
  photo, uppercase `<h3>` name, one-line description); 2 columns on phones, 4 on desktop.
- `Team`: centred introduction and a list of `TeamMemberCard`s (portrait, `<h3>` name, role,
  bio). `portraitSrc` is optional: until headshots are supplied, the card shows the member's
  initials (decorative, `aria-hidden`), and the name stays in the heading.
- `PromiseBanner`: off-white card with a visually hidden `<h2>`, a `<ul>` of short claims
  separated by CSS dots, a dark `PillLink` and a wide photo.

`DisclosureList` (`components/disclosure-list/`) is shared with the home page's values panel:
a divided `<ul>` of native `<details>` items, so it needs no JavaScript.

### Service images

- Icons: `public/images/services/icons/<slug>.webp`
- Hover photos: `public/images/services/photos/<slug>.webp`
- Brand story: `public/images/brand-story/` (`values.webp`, `milestone.webp`, `gallery/*`; some
  gallery photos are copies of the service photos for now)
- Editorial photos: `public/images/editorial/` (currently copies of the service photos, as
  placeholders until dedicated shots are supplied)

To change one, replace the file (same name) or add a new file and update `iconSrc` / `imageSrc`
in `src/constants/services.ts`. `next/image` resizes and optimises them; photos are cropped to
the card with `object-cover`.

### Adding the hero video

1. Put the file in `public/videos/` (MP4/H.264, ideally under 5 MB) and a poster frame in
   `public/images/`. The current file is `hero-loop.mp4`.
2. Add `video: { src: "/videos/<file>.mp4", posterSrc: "/images/<poster>.jpg" }` to `HOME_HERO`
   in `src/constants/home.ts`.
3. The MP4 must be "faststart" (its `moov` index before the `mdat` data) so playback starts
   without downloading the end of the file. Export with `ffmpeg -i in.mp4 -c copy -movflags
+faststart out.mp4` (or `-c:v libx264 -crf 26 -preset slow -an -movflags +faststart` to
   also compress).
4. **Use a new file name when replacing a video.** Browsers cache video in byte ranges;
   reusing the same name can mix old and new pieces, and playback stalls until a hard refresh.

### Pending content

- All copy and nav links are placeholders and need brand approval. Service cards show a
  duration rather than a price until pricing is confirmed.
- Nav link targets (`/services`, `/about`, …) do not exist yet and return 404 until built.
