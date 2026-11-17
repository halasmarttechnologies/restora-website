# System Architecture

## Overview

Restora is a monorepo managed with **npm workspaces**. It contains two independent
applications and one documentation tree, all at the repository root:

| Directory        | Responsibility                                           | Workspace           |
| ---------------- | -------------------------------------------------------- | ------------------- |
| `frontend/`      | Public website (Next.js App Router, React, Tailwind CSS) | `@restora/frontend` |
| `backend/`       | Business logic and API (TypeScript, framework pending)   | `@restora/backend`  |
| `documentation/` | Architecture, standards, testing and deployment docs     | —                   |

## Principles

- **Strict separation.** The frontend never imports from the backend and vice versa.
  Communication will happen exclusively over a documented HTTP API (see
  [api-guidelines.md](../api/api-guidelines.md)).
- **Independent lifecycles.** Each workspace owns its own `package.json`, `tsconfig.json`,
  ESLint config, test config and `.env.example`, and can be built, tested and deployed alone.
- **Shared conventions, not shared code.** Formatting (`.prettierrc`), editor settings
  (`.editorconfig`) and line endings (`.gitattributes`) live at the root. If code ever needs
  to be shared (e.g. API contract types), it will be introduced as a third workspace package,
  never by cross-importing.
- **No speculative infrastructure.** No database, backend framework or state library is
  introduced until a concrete requirement needs it.

## Architectural decisions (Phase 01)

| #   | Decision                                                | Rationale                                                                                                                          |
| --- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1   | npm workspaces                                          | Native to npm; single lockfile; no extra tooling (Turborepo/Nx not needed yet).                                                    |
| 2   | Next.js 16 App Router, Server Components by default     | Minimal client JavaScript; Phase 01 components ship no client-side component code.                                                 |
| 3   | Tailwind CSS v4 via `@tailwindcss/turbopack`            | The default in Next.js 16.4's official template. It replaces the PostCSS pipeline, so no `postcss.config.mjs` exists.              |
| 4   | Vitest in both workspaces                               | One test runner, fast, ESM-native, first-class TypeScript.                                                                         |
| 5   | Backend has no HTTP framework yet                       | The brief forbids premature framework selection; the backend holds only validated config, error primitives and a composition root. |
| 6   | `cacheComponents` and `partialPrefetching` kept enabled | Next.js 16.4 template defaults; the static page is prerendered at build time.                                                      |
