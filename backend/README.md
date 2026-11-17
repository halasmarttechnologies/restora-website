# Restora — Backend

TypeScript backend foundation. Phase 01 contains no HTTP framework, database or endpoints;
those are chosen once real requirements exist.

What exists today:

- `src/config/env.ts` validates environment variables into a typed `AppConfig`.
- `src/errors/` holds the `AppError` base class and `ConfigurationError`.
- `src/app.ts` is the composition root (`createApp`).

## Scripts

Run from this directory, or from the repository root with `--workspace=backend`.

| Command              | Description          |
| -------------------- | -------------------- |
| `npm run build`      | Compile to `dist/`   |
| `npm run lint`       | ESLint               |
| `npm run typecheck`  | TypeScript check     |
| `npm test`           | Vitest (single run)  |
| `npm run test:watch` | Vitest in watch mode |

See [backend-architecture.md](../documentation/architecture/backend-architecture.md).
