# Backend requirements — public listings (`/buscar`, `/propiedades/:id`)

Tracks the status of gaps between the public search/listing-detail screens and the API
(`docs/API.md`, `docs/SCHEMA.md`). Complements the untracked scratch notes in
`docs/map_behaviour.md`.

## `/buscar` — Resolved

- **Property-type filtering**: `PublicListingDTO` now has `propertyType`. Wired in
  `app/utils/listing.ts` (`matchesPropertyType`) and `search.tsx` (property-type tiles now
  actually filter results).
- **Operation mapping**: the old `type` field is now `listingType`, confirmed to arrive as
  a string (not a raw enum int). Mapped to the Venta/Alquiler/Anticrético tabs via
  `listingTypeLabel` in `app/utils/listing.ts`.
- **Currency**: `PublicListingDTO` now has `currency`. Prices render with the real currency
  suffix instead of a hardcoded default.
- **Garages**: `PublicListingDTO` now has `garageCapacity`. Wired into `PropertyCard`/map
  pins.
- **Pagination**: none planned backend-side. Implemented client-side lazy loading on the
  `listado` grid instead (loads more as the user scrolls; the full array is still fetched
  in one request).
- **Auth**: `allListingsForPublic` confirmed unauthenticated.
- **Map viewport/bbox search**: confirmed out of scope — city-based search is sufficient.
- **Shareable filter state**: operation and property-type filters are now reflected in
  `/buscar`'s URL (`?operacion=venta&tipo=vivienda`) via `useSearchParams`, so filtered
  views are linkable/bookmarkable.

## `/buscar` — Still open

1. **`listingType` values beyond `"Sale"`** — only `"Sale"` was confirmed against a real
   response. We assumed `"Rent"` → Alquiler and `"Anticretico"` → Anticrético
   (`LISTING_TYPE_LABELS` in `app/utils/listing.ts`). Unmatched values fall through as their
   own untranslated label rather than being hidden, but need the real values confirmed.
2. **`price` field format** — the example payload shared had `"price": 500.023,00,`, which
   isn't valid JSON (stray comma, mixed thousands/decimal separators). We're treating
   `price` as a plain `number` per the field table. Worth double-checking against an actual
   response. The price min/max filter on `/buscar` is hidden from the UI (not just disabled)
   until this is confirmed — see the TODO in `search.data.ts`/`search.tsx`.
3. **`propertyType` values beyond `"Casa"`** — assumed to match the existing Spanish tile
   labels exactly (Departamento/Terreno/Local/Oficina/Hotel), not yet confirmed.
4. **No `area`/built-area field** on `PublicListingDTO` — still only on
   `DetailedPublicListingDTO`. `PropertyCard`'s area stat stays hidden for real listings
   until either this DTO gains it or a listing-detail screen uses the detailed DTO.
5. **`searchProperties` is intentionally unused** for this screen — `PropertyDTO[]` has no
   `price` field, and its `ListingType`/`Currency`/`AreaUnit`/`SortBy` query params are
   still undocumented raw-int enums (see `docs/SCHEMA.md` "Enums — TBD"). Revisit if/when
   backend documents those and it becomes the server-side filter/pagination answer.

## `/propiedades/:id` — Still open

UI phase only (`feat/public-listing-detail`): built against a local mock dataset shaped
like `DetailedPublicListingDTO` (`app/routes/public/listing-detail.data.ts`), no real fetch
by id yet. The gaps below need resolving before wiring this route to
`GET /api/Listings/listingByIdForPublic{id}`.

1. **No `currency` field on `DetailedPublicListingDTO`** — unlike `PublicListingDTO`, the
   detail DTO has no currency. The mock dataset adds one locally (`MockListingDetail`) since
   TypeScript's excess-property check won't allow it on the real DTO type. When wired for
   real: either the endpoint needs to gain the field, or the detail page needs to carry the
   currency over via `location.state` from whichever `/buscar` card was clicked — which
   breaks for a listing opened via a direct/shared link with no prior navigation state.
2. **No neighborhood/zone field** on `DetailedPublicListingDTO` (nor `PublicListingDTO`) —
   same gap as `/buscar`'s cards. The design's "Zona {x}" header and the "Seguir buscando en
   {zona}" CTA both approximate zone from `propertyAddress`/`city` via the new
   `pickZone()` helper in `app/utils/listing.ts` (shared with `mapPublicListing`), not a
   real neighborhood value. `NeighborhoodDTO`/`Properties.neighborhood` exist elsewhere in
   the schema but aren't exposed on either public listing DTO.
3. **No floor-plan or 360°-tour field** anywhere in the Property/Listing schema — the
   source design (`Publicacion.dc.html`) had "Plano" and "360°" info chips; both are omitted
   from this iteration rather than shipped as dead UI. Revisit if that becomes an actual
   feature request.
4. **No favorites/wishlist endpoint** in the API at all — the heart/favorite toggle on this
   page is local component state only, not persisted, and resets on reload/navigation.
5. **No contact/inquiry endpoint** — the "Contactar" button has nothing to call yet
   (decorative for this iteration). Only the phone-reveal interaction is functional, since
   `contactPhone` is already plain data on the DTO.
6. **`type`/`propertyCondition`/`billingPeriod` on `DetailedPublicListingDTO`** — same
   TBD-enum-value concern as the rest of the schema (`docs/SCHEMA.md` "Enums — TBD"). `type`
   reuses the already-established `listingTypeLabel()` mapping since it's the same
   Sale/Rent/Anticretico domain as `PublicListingDTO.listingType`; `propertyCondition` and
   `billingPeriod` are rendered as plain pass-through text, not mapped to guessed labels.
7. **`listingByIdForPublic{id}` path oddity** — already flagged in `docs/API.md` (literal
   path, no `/` before `{id}` in the spec). Confirm the real request shape with backend
   before wiring the loader.
8. **Prev/next navigation ("4 de 14", "Siguiente inmueble")** has no backend-provided
   ordering — implemented as client-only `location.state` (`{ ids, index }`) passed from the
   `/buscar` card/pin that was clicked (`search.tsx`, `PropertyMap.tsx`). A listing opened
   directly (shared link, no state) simply hides that control instead of guessing an order.
9. **"Seguir buscando en {zona}" CTA links to `/buscar` without a working zone filter** —
   `/buscar` only has operación/tipo wired (see above), no neighborhood query param yet. The
   zone name is shown for context but doesn't actually filter the destination results; a
   related future enhancement, not a blocker for this iteration.
