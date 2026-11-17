# Backend Architecture

## Status

Phase 01 establishes the **foundation only**. No HTTP framework, database, API endpoints or
business logic exist yet, by design.

## Stack

- TypeScript (strict, `NodeNext` ESM, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`)
- Vitest
- No runtime dependencies

## Directory layout

```text
backend/src/
├── app.ts          Composition root: createApp(env) → { config }
├── config/         env.ts validates process.env into a typed AppConfig
├── errors/         AppError base class + ConfigurationError
├── modules/        Feature modules (bookings, therapists, …), future
├── middleware/     Transport middleware, future
├── services/       Business logic, future
├── repositories/   Data access, future
├── validators/     Input validation schemas, future
├── types/          Shared backend types, future
└── utils/          Pure helpers, future
```

## Layering (target)

```text
transport (routes, middleware) → module service → repository → data source
```

- Services depend on repository **interfaces**, not implementations (Dependency Inversion), so
  tests can substitute in-memory repositories.
- Each feature module will own its routes, service, repository, validators and types under
  `modules/<feature>/`. Cross-cutting pieces stay in the top-level folders.

## Configuration

`loadConfig(env)` runs once at startup and fails fast with a `ConfigurationError` on invalid
values. Supported variables are listed in `backend/.env.example`.

| Variable   | Allowed                             | Default       |
| ---------- | ----------------------------------- | ------------- |
| `NODE_ENV` | `development`, `test`, `production` | `development` |
| `PORT`     | integer 1–65535                     | `4000`        |

## Error handling

All expected errors extend `AppError`, which carries a stable machine-readable `code`. Once a
transport layer exists, a single error-handling middleware will map `AppError` subclasses to
responses (see [api-guidelines.md](../api/api-guidelines.md)); anything else is treated as a
500 and logged.

## Open decisions

- HTTP framework (evaluate against real requirements, e.g. Fastify, Hono, NestJS).
- Database and ORM or query builder.
- Validation library.
- Authentication provider.
