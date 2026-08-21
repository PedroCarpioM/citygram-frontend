# Project Architecture & Technical Decisions

This document (almost handmade) details the architectural decisions and the technology stack selected for the Real Estate frontend MVP (CityGram). The primary goal is to ensure high performance, scalability, and a amost pixel-perfect user interface, the design is cenrtered in the UX, and selling capaity of the site.

## 1. Core & Build Tools

- **Core Library:** React 19.
- **Language:** TypeScript. Ensures static type safety, drastically reducing runtime errors when handling complex payloads (e.g., property and user data).
- **Bundler:** Vite. Chosen for its lightning-fast development server and optimized Hot Module Replacement (HMR), providing a superior developer experience compared to legacy tools like Create React App.
- **Package Manager:** `pnpm`. Used instead of `npm`/`yarn` for its content-addressable storage (faster, disk-efficient installs) and strict `node_modules` structure, which prevents phantom dependencies (great with react). Enforced by `pnpm-lock.yaml` at the project root; all install/run commands and scripts across this document assume `pnpm` (e.g., `pnpm install`, `pnpm dev`, `pnpm build`).

## 2. Routing

- **Library:** `react-router` (v8). The latest version of the standard React router is used to efficiently handle public and private (token-protected) routes, leveraging modern data routing to pre-load property data before views are rendered.

## 3. API Consumption & State Management

- **Server State (Asynchronous):** `@tanstack/react-query` + `axios`. Abstracts complex HTTP request logic. Crucial for caching search filters, handling pagination for property listings, and preventing UI freezes during map navigation.
- **Client State (Global):** `zustand`. A lightweight and modern state manager for handling global variables (such as authentication state or active sidebars) without the boilerplate overhead of alternatives like Redux.

## 4. Styling & UI

- **CSS Framework:** Tailwind CSS v4, via the `@tailwindcss/vite` plugin. Mobile-First approach, avoiding massive CSS files or styling conflicts. Vendor prefixing and the rest of the Lightning CSS pipeline are handled internally by the plugin, so no separate `postcss`/`autoprefixer` dependency is needed.
- **UI Ecosystem:** `lucide-react` for lightweight, scalable vector icons, and `sonner` for highly polished temporary notifications (toasts).

## 5. Form Handling & Validation

- **Form Management:** `react-hook-form`. Optimizes performance in extensive forms (e.g., property creation/editing CRUD) by minimizing unnecessary DOM re-renders.
- **Validation:** `zod`. Paired with the form handler to strictly enforce business rules (e.g., price validation, required fields) at the schema level before submitting payloads to the backend.

## 6. Interactive Maps

- **Rendering Engine:** `leaflet` and `react-leaflet`. Provides a robust, open-source solution to embed OpenStreetMap. It simplifies injecting custom markers (distinct pins for houses, lots, and apartments) and handling interactive map events, maybe drawing on it?

## 7. Authentication & Security

- **Identity Provider:** `@react-oauth/google` to enable SSO.
- **Session Management:** `jwt-decode` to parse JSON Web Tokens delivered by the backend, safely determining user roles and session expiration directly on the client side.

## 8. Code Quality & Git Hooks

- **Pre-commit Automation:** `husky` + `lint-staged`. Every `git commit` automatically runs ESLint (`--fix`) and Prettier (`--write`) against staged files, then a full `tsc -b` type check, before the commit is allowed to complete. This keeps formatting, linting, and type errors out of the history without relying on developers to run checks manually.
- **Formatting:** `prettier`, configured via `.prettierrc.json` (no semicolons, single quotes, 100-character print width) to match the existing codebase style.
- **Linting:** `eslint`, configured in `eslint.config.js` with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`.
- **Relevant scripts** (`package.json`):
  - `pnpm lint` / `pnpm lint:fix` — run ESLint across the project.
  - `pnpm format` / `pnpm format:check` — run Prettier across the project.
  - `pnpm typecheck` — run `tsc -b` without emitting output.
  - `pnpm prepare` — installs the Husky git hooks (runs automatically after `pnpm install`).
- **Hook definition:** `.husky/pre-commit` runs `npx lint-staged` followed by `pnpm run typecheck`. A commit is rejected if linting finds unfixable issues or if type checking fails.

## 9. Directory Structure

To maintain a scalable and clean codebase, the project follows a feature-grouped and role-based directory architecture within the `app` folder (React Router v8's convention, not a plain `src/`):

```text
app/
├── app.css         # Global stylesheet (Tailwind entry point)
├── root.tsx        # Root layout/document component
├── routes.ts        # Route manifest
├── components/     # Reusable UI components (Buttons, Inputs, Modals, Cards)
│   ├── common/     # Generic, domain-agnostic components
│   └── map/        # Specific components for Leaflet integration
├── hooks/          # Custom React hooks (e.g., useAuth, useGeolocation)
├── layouts/        # Layout wrappers (e.g., MainLayout, AuthLayout, DashboardLayout)
├── pages/          # Page-level components consumed by routes (currently unused, reserved)
├── routes/         # Route definitions, loaders, and protected route logic
│   ├── public/     # Home, Search, PropertyDetails
│   └── private/    # Dashboard, CreateProperty, EditProperty
├── store/          # Global state management (Zustand slices)
├── types/          # TypeScript declarations and global interfaces
└── utils/          # Helper functions (e.g., formatCurrency, token parsers)
```

Note: `services/` (API configuration, Axios instances) is not yet present — `axios` is a declared dependency but has no call sites in the codebase yet. It should be added under `app/services/` once API integration starts.

## 10. Agents

You, machine, should make use of react-router, never make any educated guesses, just ask, nobody wants you to guess.

### Installed

react-router
claude project description and usage
