# Collaboration Guide

Keep it simple; extend this doc only when a real need shows up.

## 1. Commits - Conventional Commits

Every commit message follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <short summary>

<optional body>
```

**Types:**

- `feat`: a new feature for the user
- `fix`: a bug fix
- `chore`: tooling, config, dependencies; no source behavior change
- `docs`: documentation only (README, ADR, this file)
- `style`: formatting only (whitespace, semicolons); no code logic change
- `refactor`: code change that neither fixes a bug nor adds a feature
- `test`: adding or correcting tests
- `perf`: performance improvement

**Rules:**

- Summary in imperative mood ("add", not "added"/"adds"), lowercase, no trailing period.
- Summary ≤ 72 characters.
- Scope is optional but useful for larger changes (e.g. `feat(map): add cluster markers`).
- One logical change per commit - don't bundle unrelated work.
- Breaking changes: add `!` after the type/scope (`feat!: ...`) and explain the break in the body.

## 2. Branches

```
<type>/<short-description>
```

Examples: `feat/property-search`, `fix/map-marker-icon`, `chore/upgrade-vite`.

- Branch off `main`.
- Keep branches short-lived and scoped to one feature/fix.

## 3. Before committing

Local checks run automatically via Husky (`.husky/pre-commit`):

1. `lint-staged` - ESLint (`--fix`) + Prettier (`--write`) on staged files.
2. `pnpm run typecheck` - `react-router typegen` + `tsc`.

A commit is rejected if linting finds unfixable issues or type checking fails. Don't bypass this with `--no-verify` - fix the underlying issue instead.

You can also run these manually at any time:

```bash
pnpm lint        # check
pnpm lint:fix    # check + fix
pnpm format      # write formatting
pnpm typecheck   # type check
```

## 4. Code style

- No semicolons, single quotes, 100-character print width - enforced by Prettier (`.prettierrc.json`), don't fight it manually.
- Follow the directory structure documented in [ADR.md](ADR.md#9-directory-structure) - routes under `app/routes/{public,private}`, shared UI under `app/components`, etc.
- Don't guess on architectural or library decisions (routing, state, styling) - see [ADR.md](ADR.md) or ask.

## 5. Pull requests

- PR title follows the same Conventional Commits format as commits.
- Description should explain _why_, not just _what_ - link to context (issue, discussion) when relevant.
- Keep PRs focused; split unrelated changes into separate PRs.
