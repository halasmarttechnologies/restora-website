# Restora — Frontend

Next.js 16 (App Router) website for Restora, written in TypeScript and styled with
Tailwind CSS v4.

## Scripts

Run from this directory, or from the repository root with `--workspace=frontend`.

| Command              | Description                         |
| -------------------- | ----------------------------------- |
| `npm run dev`        | Dev server at http://localhost:3000 |
| `npm run build`      | Production build                    |
| `npm run start`      | Serve the production build          |
| `npm run lint`       | ESLint                              |
| `npm run typecheck`  | TypeScript check                    |
| `npm test`           | Vitest (single run)                 |
| `npm run test:watch` | Vitest in watch mode                |

## Structure

- `src/app/` — routes, root layout and `globals.css` (design tokens)
- `src/components/<name>/` — one folder per component, with an `index.ts` barrel
- `src/config/`, `src/constants/` — site configuration and constants
- `tests/` — Vitest and React Testing Library suites

See [frontend-architecture.md](../documentation/architecture/frontend-architecture.md) for
details.
