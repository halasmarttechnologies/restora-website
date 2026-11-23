# Frontend Architecture

## Stack

- Next.js 16.4 (App Router, Turbopack), React 19, TypeScript (strict)
- Tailwind CSS v4 (CSS-first configuration in `src/app/globals.css`)
- Vitest + React Testing Library + jsdom

## Directory layout

```text
frontend/
├── public/            images/ (banners, brand-story, services/{icons,photos}), videos/{hero,gallery}
├── src/
│   ├── app/           Root layout (html/body, metadata), global styles (design tokens)
│   │   └── (site)/    Route group for public pages; does not appear in URLs
│   │       ├── layout.tsx   Shared frame: announcement bar, navbar, <main>, footer
│   │       ├── page.tsx     Home (/)
│   │       ├── about/page.tsx   About (/about)
│   │       ├── contact/page.tsx Contact form (/contact)
│   │       ├── services/<service>/page.tsx   One folder per service (/services/<service>)
│   │       └── privacy/, terms/, accessibility/, faq/   Text pages on the shared PagePanel
│   ├── actions/       Server Actions ("use server"): newsletter sign-up, contact form
│   ├── components/    One folder per component (see below)
│   ├── config/        Runtime configuration (site metadata, env-derived values)
│   ├── constants/     Static, compile-time content (copy, links, image paths)
│   ├── hooks/         Client hooks (use-scroll-direction)
│   ├── lib/           Framework-free logic (email, contact-form and attachment validation)
│   └── types/         Shared domain types (NavLink, CallToAction, FeaturedService)
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

Shared building blocks (`SplitRow`, `PillLink`, `ArrowButton`, `FeaturedServices`,
`DisclosureList`, `SocialGallery`, `AutoplayVideo`, `SectionHeading` / `SectionLabel`,
`TextLink`, `PagePanel`, `ContentSections`) are reused across pages
instead of copied.

### All services (`/services`)

`app/(site)/services/page.tsx` renders `ServicesOverview` (`components/services-overview/`):
every service as a card with the same category filters and cards as the desktop services
menu (`ServiceFilters`, `ServiceMenuCard` and the shared `useServiceFilter` hook from
`components/services-menu/`). One column on phones, two on tablets, three to four on desktop.
Content: `SERVICES_OVERVIEW` in `constants/services-menu.ts`. Both "View all services" links
(desktop menu, small-screen menu) open it.

### Service pages (`/services/<service>`)

Every service has its **own route folder** and its **own content file**; all six share one
layout component. To change a service, edit its content file; to change the layout of every
service page, edit `components/service-page/`.

```text
src/
├── app/(site)/services/
│   ├── deep-tissue/page.tsx          ─┐
│   ├── swedish-relaxation/page.tsx    │ one folder per service: metadata (title =
│   ├── sports-recovery/page.tsx       │ service name) + <ServicePage {...CONTENT} />
│   ├── prenatal/page.tsx              │
│   ├── signature-restora/page.tsx     │
│   └── reflexology/page.tsx          ─┘
├── constants/services/
│   ├── index.ts                      barrel: FEATURED_SERVICES, SERVICES
│   ├── catalogue.ts                  the menu: name, code, description, photo, link
│   ├── shared.ts                     copy shared by every service page (steps, aftercare,
│   │                                 gift, headings, gallery, row photos)
│   ├── create-service-page.ts        builds one page's props from the three sources above
│   ├── deep-tissue.ts … reflexology.ts   each service's own content
└── components/service-page/          the layout, one file per section
    ├── service-page.tsx              composes the sections (order documented at the top)
    ├── service-page.types.ts         all prop and content types
    ├── service-hero.tsx + booking-form.tsx
    ├── service-specs.tsx · service-outcomes.tsx · service-steps.tsx
    ├── service-details.tsx · service-aftercare.tsx · service-pairings.tsx
    ├── service-gift.tsx · service-reviews.tsx + review-card.tsx + star-rating.tsx
    └── section-label.tsx             small uppercase panel heading
```

Sections, top to bottom (mirroring the reference product page):

1. `ServiceHero`: off-white card under the navbar (`data-light-page`, so the navbar is dark);
   photo left; white panel right with the name (`<h1>`), code, lengths, description and
   `BookingForm`.
2. `SocialGallery` ("felt by you"), the shared photo strip from the home page.
3. Six `SplitRow`s, alternating sides: `ServiceSpecs` (tagline + `<dl>` table),
   `ServiceOutcomes` (three large words), `ServiceSteps` (client carousel, one step at a time),
   `ServiceDetails` (`DisclosureList`), `ServiceAftercare` (`<ol>` with large numbers),
   `ServicePairings` (pill links to related services).
4. `ServiceGift`: gift-card row.
5. `ServiceReviews`: average rating and review cards, or an invitation to share one when there
   are none. **Only add verified reviews**; none are included yet.

`BookingForm` is a plain `GET` form (no JavaScript): it opens
`/book?service=<slug>&duration=<minutes>`, ready for the booking page to read. Durations are
radio inputs styled as pills (`has-[:checked]`).

`createServicePage(slug, content)` finds the menu entry by slug and throws if it (or any
pairing) is missing, so a typo fails the build instead of shipping a broken page. It fills the
split rows from `shared.ts` photos in order, **skipping the hero photo**, so a page never shows
the same photo twice in a row.

**Adding a service**

1. Add it to `SERVICES` in `constants/services/catalogue.ts` (code, name, description,
   category, `href: "/services/<slug>"`, photo).
2. Create `constants/services/<slug>.ts` with `createServicePage("<slug>", { … })` (copy an
   existing file).
3. Create `app/(site)/services/<slug>/page.tsx` (copy an existing one and change the import).

The services menu picks it up automatically, and `tests/app/service-pages.test.tsx` fails if
a menu entry has no page folder.

### Text pages (contact, privacy, terms, accessibility, FAQ)

- `components/page-panel/`: `PagePanel` is the shared frame: an off-white card starting under
  the navbar, with a narrow centred column holding the `<h1>`, intro paragraphs and the page
  content. It carries `data-light-page`; while one is on the page the navbar uses dark text at
  the top (CSS only: `[body:has([data-light-page])_&]:text-brand-black/80` in `navbar.tsx`).
- `components/content-sections/`: `ContentSections` renders long-form copy (`ContentPage` in
  `constants/legal.ts` and `constants/accessibility.ts`): an `<h2>` per section with
  paragraphs, an optional list and an optional link.
- `components/faq/`: `FaqGroups` renders one labelled section per topic, each a
  `DisclosureList` of questions (`constants/faq.ts`).
- Privacy and Terms copy is a **placeholder that must be reviewed by a lawyer** before launch.
  The accessibility statement must stay truthful: update its "What we have done" and "Known
  limitations" lists whenever the site changes.

### Contact form (`components/contact/`)

- `contact-form.tsx` (Client Component): `useActionState` with the `sendContactMessage`
  Server Action. Errors appear under each field (`aria-invalid` + `aria-describedby`), the
  summary is a `role="alert"`, and typed values are returned by the server and restored. On
  success the form is replaced by a confirmation inside a persistent `aria-live` region.
- `form-field.tsx`: `TextField`, `TextAreaField`, `SelectField`. Each has a real (visually
  hidden) `<label>`; the design shows the label as the placeholder ("Email*").
- `attachment-field.tsx` + `use-attachments.ts`: optional images, added by the Upload button,
  drag-and-drop, or pasting anywhere in the form. They live in state and are appended to the
  `FormData` on submit.
- Validation rules live in `lib/contact.ts` and run in both places: the browser uses them for
  instant feedback on attachments, and the server runs every check again.

**Security**

- Server-side validation of every field (required, length limits, email format, reason must
  be one of `CONTACT_REASONS`).
- Attachments: up to 3 JPG/PNG/WebP images, 4 MB in total. The server reads each file's first
  bytes (its "magic number") and rejects anything that is not really an image, whatever its
  name or reported type.
- `serverActions.bodySizeLimit: "4.5mb"` in `next.config.ts`: large enough for the images,
  within Vercel's 4.5 MB request limit.
- A honeypot field (`website`, off-screen and `aria-hidden`) catches simple bots; they receive
  the normal success message so they learn nothing.
- Server Actions only accept `POST` requests from the same origin (built into Next.js), and the
  CSP's `form-action 'self'` stops forms posting elsewhere.
- Not yet connected: the message is validated but not sent (`TODO(contact)` in
  `actions/contact.ts`). Add rate limiting (e.g. per IP) when connecting it to a provider.

## Design tokens

Defined once in `src/app/globals.css`:

| Token                | Value           | Tailwind utility                |
| -------------------- | --------------- | ------------------------------- |
| `--color-background` | `#F1F0ED`       | `bg-brand-background`           |
| `--color-black`      | `#222222`       | `text-brand-black`              |
| `--color-white`      | `#FFFFFF`       | `text-brand-white`              |
| `--font-brand`       | Helvetica stack | `font-sans` (the default stack) |

Only `brand-*` colors may be used in components. Adding a color requires design approval and
an update to this table.

Usage: the page background is `--color-white`; the announcement bar is `--color-black` with
white text. `--color-background` (off-white) is used by the scrolled navbar and the service
cards. Opacity variants of brand colors (e.g.
`bg-brand-black/55`) are permitted for overlays; they introduce no new hues.

The `themeColor` value in `layout.tsx` mirrors `--color-white`, because Next.js metadata
cannot read CSS variables.

## Typography

The site uses one typeface stack, `--font-brand`:
`"Helvetica Neue", Helvetica, Arial, sans-serif` (no web fonts are downloaded), in **one
weight: regular (400)** for all text, headings included. It is set once on `body`; headings
inherit it through Tailwind's preflight.

Components must not set their own font family or weight (no `font-medium`, `font-bold`,
etc.); the single `body` rule covers the whole site.

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
    `ScrollAwareHeader` is the navbar's client shell; it sets `data-scroll` and `data-menu`,
    and all styling stays in Tailwind `group-data-[scroll=…]:` / `group-data-[menu=…]:`
    classes;
  - below 1024px the link lists are hidden and `MobileMenu` (`navbar/mobile-menu.tsx`, Client
    Component) gives the same content as the desktop navbar: a `Menu` button
    (`aria-expanded` / `aria-controls`) slides down a full-width panel under the bar (same
    grid-row animation as the services menu, `inert` while closed). Inside:
    `MobileServiceList` (`mobile-service-list.tsx`), a `<details>` "Services" that expands to
    every service (photo, code, name) and "View all services", then every other page link.
    It closes on Escape (focus returns to the button), a tap outside (`useDismiss`) or a
    followed link. While open, the nav turns off-white via
    `has-[[data-mobile-menu=open]]:` classes; the panel scrolls inside itself if taller than
    the screen.
- Services menu (`components/services-menu/`, large screens): `Services` in the navbar is a
  button (`aria-expanded` / `aria-controls`) that slides a panel open inside the bar, which
  turns off-white while it is open.
  - `services-menu-context.tsx`: `ServicesMenuProvider` holds `open`; `useServicesMenu()`
    reads it.
  - `services-menu-trigger.tsx`: the navbar button. A mouse hover opens the menu; a click, tap
    or Enter / Space toggles it (a click right after a hover-open keeps it open).
  - `services-menu-panel.tsx`: the slide animation is the grid row going `0fr` → `1fr` (no
    measured heights) plus a fade; `inert` while closed. Followed links close it.
  - `service-filters.tsx`: toggle buttons (`aria-pressed`) that filter cards by `category`;
    the first filter has no category and shows everything.
  - `services-carousel.tsx`: snap-scrolling row (3 cards on `lg`, 4 on `xl`); white arrow
    buttons appear only when there is more to see and move one page per click.
  - `service-menu-card.tsx`: code badge, photo (zooms slightly on hover), name as a stretched
    link, description.
  - `ScrollAwareHeader` closes the menu on Escape (focus returns to the button), on a click
    outside the navbar (`hooks/use-dismiss.ts`), when the mouse leaves the navbar, and when the
    bar hides on scroll down.
  - Content: `SERVICES_MENU` in `constants/services-menu.ts`; the six services are
    `SERVICES` in `constants/services/catalogue.ts`. The cards (and their photos) are only
    rendered after the menu first opens (`hasOpened` in the context), so pages where nobody opens
    it download none of them.
- `Hero` (`<section>` labelled by its `<h1>`): eyebrow, large headline (46px desktop) and an
  outlined pill link, anchored bottom-left with 30px insets. Content comes from props, supplied
  by `constants/home.ts`.
- `HeroMedia`: the background layer. With no `video` prop it renders a neutral
  `brand-black/55` placeholder; with `video={{ src, posterSrc }}` it renders the shared
  `AutoplayVideo` (`eager`, decorative) with its pause button in the bottom-right corner.
  A bottom scrim (brand black, 50% to transparent) keeps text legible over footage.

### Shared video (`components/autoplay-video/`)

`AutoplayVideo` is used by the hero and by the photo strip's video tiles:

- muted, looping, inline; `eager` (hero) starts downloading and playing at once, otherwise the
  video loads lazily (`preload="metadata"`) and plays only while 25% or more is on screen
  (`IntersectionObserver`), pausing again when scrolled away;
- resumes when the tab becomes visible again (browsers can pause muted video in background tabs
  and not resume it); a rejected `play()` is ignored and the first frame stays;
- does not start by itself when the visitor prefers reduced motion;
- `VideoToggle` (`video-toggle.tsx`) is a play / pause button (WCAG 2.2.2); once the visitor
  pauses, the video stays paused;
- without a poster, `src#t=0.1` makes the browser show the first frame instead of a blank box;
- with `label` it is announced (`aria-label`); without one it is decorative (`aria-hidden`).

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
  from `HOME_EDITORIAL` in `constants/home.ts`.
  - First row: `EditorialCarousel` (Client Component). One slide at a time (centred artwork,
    name, description, dark `PillLink`), a circular "Next slide" button that loops, and a
    large `1/3` counter. Each slide is a `role="group"` labelled "n of total" inside a polite
    live region; slides fade in (`animate-fade-in`, defined in `globals.css`, off under
    reduced motion). Its row heading is visually hidden.
  - Other rows: `StoryPanel` with a lowercase headline, short copy and a dark `PillLink`,
    anchored to the bottom of the panel.
- `BrandStory`: three blocks from `HOME_BRAND_STORY` in `constants/home.ts`; images in
  `public/images/` (see Images below).
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
  deprecates `priority`). The heading and light `PillLink` are white, bottom-left; top and
  bottom scrims keep the navbar and heading legible over the light photo.
- `FounderNote`: off-white panel, small uppercase label, centred `<blockquote>` inside a
  `<figure>` with a `<figcaption>` sign-off. Quotation marks come from CSS (`open-quote` /
  `close-quote`), so the copy stays plain text.
- Offering row: shared `SplitRow` (photo left) with `OfferingPanel`: lowercase heading, copy,
  dark `PillLink`, and a divided list of links. The links are derived from
  `FEATURED_SERVICES`, so they always match the service cards.
- `FeaturedServices`: the same service cards as the home page.
- `StatementBanner`: wide photo shown in greyscale (fits the black-and-white palette) under a
  25% black tint, with one centred statement as the `<h2>`.
- `panel-intro.tsx`: `PanelHeading` (the lowercase `<h2>` shared by the panels below) and
  `PanelIntro` (that heading plus a line of intro copy).
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

### Images

Each photo is stored **once** and referenced by path from `src/constants/*`. Reusing one URL
means the browser downloads a photo once even when several sections show it.

- Service icons: `public/images/services/icons/<slug>.webp`
- Service photos: `public/images/services/photos/` (`deep-tissue`, `swedish-relaxation`,
  `post-recovery`)
- Banner: `public/images/banners/signature-ritual.webp`
- Brand story: `public/images/brand-story/` (`values.webp`, `milestone.webp`)

Until dedicated shots are supplied, several sections reuse these photos (the gallery, the
editorial rows, the About page, and Sports Recovery, Prenatal, Signature Restora and
Reflexology in the services menu). To give something its own photo, add a new file (e.g.
`public/images/services/photos/prenatal.webp`) and point its `imageSrc` at it in
`src/constants/`. `next/image` resizes and optimises every photo; they are cropped with
`object-cover`.

### Gallery videos

Short vertical clips for the "you + restora" strip live in `public/videos/gallery/`
(`men.mp4`, `woman.mp4`). They are items with `type: "video"` in `HOME_BRAND_STORY.gallery.items`
(`constants/home.ts`), in display order: the men's video first, then the photos, then the
women's video. Each needs an `alt` description.

### Responsive design

Checked at 320, 390, 768, 1024, 1440 and 2560 px wide and on a landscape phone (844 × 390):
no horizontal scrolling anywhere.

- **Phones and in-app browsers** (Instagram, Facebook, TikTok, news apps): form fields use 16px
  text below `sm` (smaller text makes iOS zoom the page on focus); menu tap targets are at least
  36px tall; heights use `svh` so collapsing browser toolbars don't cause jumps.
- **Notched phones:** `viewportFit: "cover"` plus `env(safe-area-inset-*)` padding on `<body>`.
- **Forced dark modes:** `colorScheme: "light"` and `color-scheme: light` stop web views and
  browsers that auto-darken pages from inverting the palette.
- **Landscape phones:** the custom `short:` variant (`max-height: 500px`, in `globals.css`)
  lowers the hero's minimum height so the headline and button are on the first screen.
- **Tablets:** split-row photos are 3:2 between `sm` and `lg` (square photos at full width were
  ~720px tall).
- **Large monitors:** the page frame is capped at 1920px and centred.

### Adding the hero video

1. Put the file in `public/videos/hero/` (MP4/H.264, ideally under 5 MB). The current file is
   `hero-loop.mp4` (15 MB, with an unused audio track: worth re-exporting, see step 3).
2. Set `video: { src: "/videos/hero/<file>.mp4" }` in `HOME_HERO` in `src/constants/home.ts`
   (optionally `posterSrc` for a still image shown before playback).
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
