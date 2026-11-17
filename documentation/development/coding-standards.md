# Coding Standards

## General

- TypeScript everywhere, strict mode, no `any` (`@typescript-eslint/no-explicit-any` is an error).
- Avoid type assertions (`as`) other than `as const`; prefer type guards.
- Use `import type` for type-only imports (enforced by ESLint).
- Small, single-purpose functions; early returns instead of nested conditionals.
- No unused code, imports, files or dependencies (`noUnusedLocals`, `noUnusedParameters`).
- Comments explain _why_, not _what_.

## React and Next.js

- Server Components by default. Add `"use client"` only for interactivity.
- Avoid `useEffect` for derived state or for data fetching that can happen on the server.
- Semantic HTML and accessible names for every landmark and interactive element.
- Use `next/image` for images and `next/link` for internal navigation.
- Style with Tailwind utilities backed by design tokens; never hardcode brand hex values in
  components.

## Formatting and linting

- Prettier (root `.prettierrc`) is the single source of formatting truth.
- ESLint configs extend `eslint-config-prettier` so they never conflict with Prettier.
- Run `npm run verify` before pushing.
