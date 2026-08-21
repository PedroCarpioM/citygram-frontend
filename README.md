# Real Estate Platform - Frontend MVP

A modern, almost pixel-perfect, and fully responsive web application for real estate discovery and management. Inspired by industry-leading platforms, it allows users to explore properties via lists and interactive maps, and provides authenticated owners with a dashboard to manage their listings.

## Key Features

- **Public Exploration:** Browse properties with advanced filtering and detailed views.
- **Interactive Maps:** OpenStreetMap integration with custom markers for houses, lots, and apartments.
- **Secure Authentication:** Seamless Google SSO integration with JWT session management.
- **Owner Dashboard:** Protected routes for creating, editing, and deleting properties and listings.
- **Almost Pixel-Perfect UI:** Strictly follows the provided design system using Tailwind CSS.

## 🛠️ Tech Stack Overview

- **Framework:** React 19 + TypeScript + Vite
- **Routing:** React Router v8
- **State Management:** TanStack Query (Server) + Zustand (Client)
- **Styling:** Tailwind CSS + Lucide Icons
- **Maps:** Leaflet + React-Leaflet
- **Forms:** React Hook Form + Zod

---

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v24 or higher) and [pnpm](https://pnpm.io/) installed on your machine.

### Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/pedrocarpiom/citygram-frontend
   cd citygram-frontend
   ```

````

2. **Install dependencies:**
```bash
pnpm install

````

3. **Environment Variables:**
   Create a `.env` file in the root directory based on the `.env.example` file:

```bash
cp .env.example .env

```

_Make sure to fill in the required values, such as your backend API URL and Google Client ID. Note: these variables are placeholders for the upcoming API/OAuth integration and are not yet consumed by the codebase._ 4. **Start the development server:**

```bash
pnpm dev

```

The application (by default) will be available at `http://localhost:5173`.

---

## Architecture & Technical Decisions (ADR)

-> **Please read the [Architecture Decision Record](docs/ADR.md) for an almost in-depth understanding of the codebase structure and technical stack.**

---

## Available Scripts

- `pnpm dev`: Starts the Vite development server.
- `pnpm build`: Builds the SSR server and client bundles for production.
- `pnpm start`: Serves the production build (used by the Dockerfile).
- `pnpm typecheck`: Runs `react-router typegen` and `tsc` to check types.
- `pnpm lint` / `pnpm lint:fix`: Runs ESLint to check (and fix) code quality and syntax issues.
- `pnpm format` / `pnpm format:check`: Runs Prettier to format (and check) the codebase.
