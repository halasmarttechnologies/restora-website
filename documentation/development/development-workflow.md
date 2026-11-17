# Development Workflow

## Prerequisites

- Node.js 20.9 or later (developed on Node 24)
- npm 10 or later

## Commands (run from the repository root)

| Command             | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `npm install`       | Install all workspaces                          |
| `npm run dev`       | Start the frontend at http://localhost:3000     |
| `npm run lint`      | ESLint in every workspace                       |
| `npm run typecheck` | `tsc --noEmit` in every workspace               |
| `npm test`          | Vitest in every workspace                       |
| `npm run build`     | Production build of every workspace             |
| `npm run format`    | Format the repository with Prettier             |
| `npm run verify`    | Format check, lint, typecheck, test, then build |

Target one workspace with `--workspace=frontend` or `--workspace=backend`.

## Change workflow

1. Branch from `main` (`feature/<short-name>`, `fix/<short-name>`).
2. Write a failing test describing the behaviour (see
   [testing-strategy.md](../testing/testing-strategy.md)).
3. Implement the minimum to pass, then refactor.
4. Update any documentation affected by the change.
5. Run `npm run verify`, then open a pull request.

## Adding dependencies

Install into the workspace that needs it (`npm install <pkg> --workspace=frontend`). Justify
every new dependency in the pull request; prefer the platform and existing tools.
