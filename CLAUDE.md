# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

CityGram — a real estate discovery/management frontend MVP (public property browsing + map search, authenticated owner dashboard for CRUD on listings). Frontend-only; no backend lives in this repo. See [README.md](README.md) and [docs/ADR.md](docs/ADR.md) for the full feature/stack rationale.

## Commands

Package manager is `pnpm` (enforced by `pnpm-lock.yaml`); Node >= 24.

```bash
pnpm dev             # start Vite dev server (http://localhost:5173)
pnpm build            # SSR server + client production build
pnpm start            # serve the production build (react-router-serve)
pnpm typecheck        # react-router typegen && tsc
pnpm lint             # eslint .
pnpm lint:fix         # eslint . --fix
pnpm format           # prettier --write .
pnpm format:check     # prettier --check .
```

There is no test suite/framework configured yet — don't invent test commands or assume Jest/Vitest exist.

A commit runs `.husky/pre-commit`: `lint-staged` (ESLint --fix + Prettier --write on staged files) then `pnpm run typecheck`. A commit is rejected if lint can't auto-fix an issue or typecheck fails — fix the root cause rather than bypassing with `--no-verify`.

## Architecture

**React Router v8, Framework Mode** (`@react-router/dev`, `react-router.config.ts`, explicit route manifest in `app/routes.ts`, SSR on by default via `ssr: true`). Routes are declared explicitly in `app/routes.ts`, not file-based — adding a route means adding it there. Before writing any router code (loaders, actions, forms, middleware, params), check `.agents/skills/react-router/SKILL.md` and its `references/framework-mode.md` for the version-specific contract instead of relying on general React Router knowledge — the ADR itself says not to guess on this, just check the reference.

**Directory layout** (`app/`, see [ADR.md §9](docs/ADR.md#9-directory-structure) for the authoritative version):

- `routes/{public,private}/` — route modules; `private/` is for token-protected owner-dashboard routes
- `components/{common,map}/` — shared UI vs. Leaflet-specific components
- `store/` — Zustand slices (client state: auth, UI)
- `hooks/`, `layouts/`, `types/`, `utils/`
- `services/` does not exist yet — `axios` is installed but has no call sites; add it there once real API integration starts, don't scatter HTTP calls elsewhere
- `pages/` exists but is reserved/unused

**State**: TanStack Query for server state (caching, pagination for listings), Zustand for client/global state. Don't reach for Redux or Context-as-a-store — the ADR already made this call.

**Path alias**: `~/*` → `./app/*` (tsconfig + Vite).

**Styling**: Tailwind CSS v4 via `@tailwindcss/vite` (no separate PostCSS/autoprefixer). The design system (fonts, color tokens, type scale, shadows) is defined in the `@theme` block at the top of `app/app.css` — the CityGram brand: Poppins (`font-display`) for headings/prices paired with Inter (`font-body`) for UI copy, a pink/purple brand core (`pink-500`/`purple-500`) with a signature gold→pink→purple gradient (`bg-gradient-brand`, used sparingly on search panels and promo bands, never as a page background), flat white/near-white surfaces, soft low-contrast card shadows (`shadow-card`/`shadow-elevated`/`shadow-modal`), and generously rounded corners (`radius-sm/md/lg` overridden project-wide). Reuse those tokens/utilities instead of hardcoding colors or shadows. `lang="es"` on the root `<html>` — the UI is in Spanish.

**Forms/validation**: `react-hook-form` + `zod` schemas.

**Auth**: `@react-oauth/google` for SSO, `jwt-decode` for reading the session JWT client-side. `.env.example` documents `VITE_API_URL` and `VITE_GOOGLE_CLIENT_ID` — both are currently placeholders, not yet consumed by any code.

**Maps**: `leaflet` + `react-leaflet`, custom markers per property type (house/lot/apartment).

## Conventions

- Prettier: no semicolons, single quotes, 100-char width — don't hand-format against it.
- ESLint flat config (`eslint.config.js`) turns off `react-refresh/only-export-components` and `no-empty-pattern` specifically for `app/root.tsx` and `app/routes/**` because framework-mode route modules are expected to export `loader`/`action`/`meta`/`links`/`ErrorBoundary` alongside the component — that's intentional, not a lint gap to "fix".
- Commit messages and branch names follow [docs/COLLABORATE.md](docs/COLLABORATE.md) (Conventional Commits, `<type>/<short-description>` branches).
- Don't guess on architecture/library choices (routing, state management, styling approach) — they're already decided in the ADR; if a task seems to need a new one, ask instead of picking one.
- Language split: all development-facing text — code, identifiers, comments, commit messages, branch names, docs — is in English. All user-facing text — UI copy, labels, meta content, error messages shown to the visitor — is in Spanish (see `lang="es"` in `app/root.tsx`).

## Feature Development Workflow

Backend integration hasn't started yet (no code in `app/` calls the API — see `services/` note above), so every feature from here on should be planned and built in two separate phases rather than as one undifferentiated task:

1. **UI phase** — build the route/components with static or mock data. Focus on layout, styling, interaction states, and reusing the design tokens in `app/app.css`. No real HTTP calls, no loaders/actions hitting the backend yet.
2. **Behavior phase** — wire that already-built UI to the real backend, following [docs/API.md](docs/API.md) (endpoint contract), [docs/SCHEMA.md](docs/SCHEMA.md) (DTO/enum shapes) and [docs/BACKEND_USAGE.md](docs/BACKEND_USAGE.md) (integration conventions: services layout, TanStack Query key conventions, auth/error handling).

**Scope rule**: a behavior-phase iteration must delimit its scope up front to one resource or one user flow (e.g. "wire the city dropdown to `GET /api/Cities`", "wire search pagination") — never "integrate the backend" as a single task spanning multiple resources or flows at once. If a task description doesn't fit in one sentence naming a single resource/flow, split it before starting.

This is a process guideline, not an enforced technical gate — the two phases don't have to land in separate commits or PRs, though splitting them often happens naturally.

Several backend enums are undocumented in the swagger (raw integers with no names — see [docs/SCHEMA.md](docs/SCHEMA.md#enums--meanings-not-documented-in-the-swagger-tbd)). Don't guess their meaning when wiring behavior for listings/properties — confirm with backend first.
