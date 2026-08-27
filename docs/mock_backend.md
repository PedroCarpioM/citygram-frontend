# Mock backend

## What this is

`chore/mock-backend-server` is a throwaway branch that adds a local Express server (`mock-server/`) implementing the API contract in `docs/API.md`/`docs/SCHEMA.md`, so frontend work can run against realistic responses while the real backend isn't ready yet.

**This branch is never merged into `master`.** It exists purely as dev tooling — once the real backend is usable, this branch (and this doc) get deleted. It was created off `master` specifically so it never carries feature-branch history either.

**This is the same repo — not a fork, not a separate GitHub project, not a PR.** `chore/mock-backend-server` is a branch like any other in this same repository. Nothing about it requires a different repo on GitHub. The only local-only detail is _how you check it out_: see below.

## Running it

```bash
git checkout chore/mock-backend-server
pnpm install
pnpm dev
```

`pnpm dev` on this branch runs Vite and the mock server together (`concurrently`): the app on `http://localhost:5173`, the mock API on `http://localhost:3000/api` — matching `VITE_API_URL` in `.env.example`. Copy `.env.example` to `.env` as usual.

The mock server is entirely in-memory: data resets every time you restart it. `POST /api/auth/google` accepts any request body and returns a fake, **unsigned** JWT-shaped `accessToken` — it decodes fine with `jwt-decode` but was never verified against a real Google token.

## Testing a feature branch against the mock

The one wrinkle: to test a feature branch's code against the mock server, you need that branch's files merged into `chore/mock-backend-server` locally — but you don't want to disturb your normal checkout (uncommitted work, whatever branch you're mid-feature on).

**Use a git worktree** — a second local folder backed by the _same_ `.git`/repo/remote, so you can have two branches checked out side by side. It is not a second repo, not a fork, nothing to set up on GitHub:

```bash
# once, from your main checkout:
git worktree add ../citygram-mock chore/mock-backend-server

cd ../citygram-mock
pnpm install

# pull your feature branch's code in, temporarily, uncommitted:
git merge --no-commit --no-ff feat/your-branch

pnpm dev
# ... click around, test against the mock API ...

# discard when done — never push from here:
git merge --abort            # if the merge is still pending (no conflicts resolved)
# or, if you resolved conflicts and it auto-completed the merge commit:
git reset --hard origin/chore/mock-backend-server
```

Do not commit or push from the worktree. The point of `--no-commit` + `reset --hard` is that nothing from the feature branch, and nothing from the mock server, ever ends up rewriting either branch's real history — your main checkout (with `feat/your-branch` and any uncommitted work) is untouched the whole time, since it's a different folder.

When you're done with the worktree entirely: `git worktree remove ../citygram-mock`.

## Coverage / limitations

- Implements every resource in `docs/API.md`: Auth, Users, Properties (incl. images and amenities/external-features add/remove), Listings (owner CRUD + public endpoints + search), Cities, Neighborhoods, Countries, Provinces, PropertyTypes, ExternalFeatures, Roles.
- `GET /api/Listings/allListingsForPublic` and `listingByIdForPublic{id}` return the **corrected** `PublicListingDTO`/`DetailedPublicListingDTO` shape the backend owner confirmed during this branch's setup — `docs/API.md` itself is stale on this endpoint pending an update on `master`. Notably: `listingType`, `propertyType`, `currency`, `billingPeriod` arrive as human-readable strings (not raw ints) on these public DTOs, there's no pagination (frontend does lazy loading over the full array), and the endpoint needs no auth.
- `GET /api/Listings/searchProperties` is a best-effort mock: filters the same public listing data by city text and the other documented query params. No bbox/viewport geo search — the backend owner confirmed city-based search is sufficient, so none is implemented.
- Owner-facing `ListingDTO`/`CreateListingDTO`/`UpdateListingDTO` keep `status`/`type`/`billingPeriod`/`currency` as raw backend enum ints, per `docs/SCHEMA.md`'s "Enums TBD" section — don't invent a label mapping for these; only the public DTOs above were explicitly confirmed as strings.
- Everything else is generic in-memory CRUD (`mock-server/utils/crud.js`) with `ProblemDetails`-shaped 404s.
