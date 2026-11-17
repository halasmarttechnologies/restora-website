# Restora

Luxury massage and wellness services platform.

This repository is an npm-workspaces monorepo:

| Directory                        | Contents                                      |
| -------------------------------- | --------------------------------------------- |
| [frontend/](frontend/README.md)  | Next.js 16 website (App Router, Tailwind CSS) |
| [backend/](backend/README.md)    | TypeScript backend foundation                 |
| [documentation/](documentation/) | Architecture, standards, testing, deployment  |

## Requirements

- Node.js 20.9 or later
- npm 10 or later

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Scripts

| Command             | Description                                     |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Start the frontend dev server                   |
| `npm run build`     | Production build of all workspaces              |
| `npm test`          | Run all test suites                             |
| `npm run lint`      | Lint all workspaces                             |
| `npm run typecheck` | Type-check all workspaces                       |
| `npm run format`    | Format with Prettier                            |
| `npm run verify`    | Format check, lint, typecheck, test, then build |

## Environment

Copy the per-workspace examples before running in a non-default setup:

- `frontend/.env.example` to `frontend/.env.local`
- `backend/.env.example` to `backend/.env`

## Status

Phase 01 (foundation, navbar, hero) is complete. See
[project-roadmap.md](documentation/project-roadmap.md) for outstanding items, including the
pending Swiss721 BT Medium font files.
