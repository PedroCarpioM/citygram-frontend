# Backend requirements — public search (`/buscar`)

Tracks the status of gaps between `/buscar`'s map + listing behavior and the API
(`docs/API.md`, `docs/SCHEMA.md`). Complements the untracked scratch notes in
`docs/map_behaviour.md`.

## Resolved

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

## Still open

1. **`listingType` values beyond `"Sale"`** — only `"Sale"` was confirmed against a real
   response. We assumed `"Rent"` → Alquiler and `"Anticretico"` → Anticrético
   (`LISTING_TYPE_LABELS` in `app/utils/listing.ts`). Unmatched values fall through as their
   own untranslated label rather than being hidden, but need the real values confirmed.
2. **`price` field format** — the example payload shared had `"price": 500.023,00,`, which
   isn't valid JSON (stray comma, mixed thousands/decimal separators). We're treating
   `price` as a plain `number` per the field table. Worth double-checking against an actual
   response.
3. **`propertyType` values beyond `"Casa"`** — assumed to match the existing Spanish tile
   labels exactly (Departamento/Terreno/Local/Oficina/Hotel), not yet confirmed.
4. **No `area`/built-area field** on `PublicListingDTO` — still only on
   `DetailedPublicListingDTO`. `PropertyCard`'s area stat stays hidden for real listings
   until either this DTO gains it or a listing-detail screen uses the detailed DTO.
5. **`searchProperties` is intentionally unused** for this screen — `PropertyDTO[]` has no
   `price` field, and its `ListingType`/`Currency`/`AreaUnit`/`SortBy` query params are
   still undocumented raw-int enums (see `docs/SCHEMA.md` "Enums — TBD"). Revisit if/when
   backend documents those and it becomes the server-side filter/pagination answer.
