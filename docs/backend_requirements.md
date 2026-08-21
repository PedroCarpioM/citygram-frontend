# Backend requirements & open gaps — public search (`/buscar`)

Tracks known gaps between what `/buscar`'s map + listing behavior needs and what
the current API (`docs/API.md`, `docs/SCHEMA.md`) can actually support,
discovered while wiring the behavior phase (see `CLAUDE.md`'s UI-first /
behavior-second workflow). Each entry states the gap, the current workaround,
and what would unblock it. This complements the untracked scratch notes in
`docs/map_behaviour.md`, which record the planning trail this doc's decisions
came out of.

## 1. Property-type filtering (`PropertyTypeTile`) is UI-only, not wired

`PublicListingDTO` has a single `type` field (string, nullable) and no
`propertyType`/`propertyTypeId` field. `GET /api/PropertyTypes` returns
`PropertyTypeDTO[] { id, name }`, but there is nothing on the listing DTO to
join against it, so the property-type tile grid (Casa/Departamento/Terreno/
Local/Oficina/Hotel) cannot filter the result set today — clicking a tile
only changes its own active/selected visual state.

We deliberately did not wire `GET /api/PropertyTypes` in this iteration:
there is no consumer for it yet, and building one now would be speculative.

**Unblocks when:** backend adds a `propertyType`/`propertyTypeId` field to
`PublicListingDTO`, OR confirms that the existing `type` field is actually
meant to carry property-type (not listing operation) — in which case our
current mapping (see §2) would need to switch.

## 2. `PublicListingDTO.type` → operation-tab mapping is inferred, not confirmed

We mapped `type` to the operation tabs (Venta/Alquiler/Anticrético) via
case/accent-insensitive string matching (`app/utils/listing.ts`,
`matchesOperation`), because it's the only type-ish field available on this
DTO. This is a best-effort choice, not a confirmed mapping — the field could
equally mean property type (see §1) or something else entirely. An
unrecognized/unmatched `type` value currently causes a listing to be
**excluded** from every tab (fails `matchesOperation` for all three) rather
than shown under all of them — verify real `type` values against the tab
labels in the browser network tab before relying on this in production;
if they clearly don't match, this behavior needs revisiting.

**Unblocks when:** backend confirms `type`'s actual semantics.

## 3. Price parsing assumes Bolivian thousand-separator formatting

`price` is a pre-formatted string (e.g. `"620.000"`), with no `currency`
field on `PublicListingDTO` at all. `app/utils/listing.ts`'s `parsePrice`
strips non-digit characters and parses the remainder — this assumes `.` is
always a thousands separator, never a decimal point, and that all listings
share one implicit currency. If listings can have mixed currencies (Bs vs.
USD) with materially different magnitudes, price-range filtering across them
is not meaningful without a currency field to compare like-for-like.

**Unblocks when:** backend adds a `currency` field to `PublicListingDTO`, or
confirms all public listings are single-currency.

## 4. No `garages`/`area` fields on `PublicListingDTO`

`PropertyCard`'s garage-count and area stats are hidden (not defaulted to 0)
for real listings, since `PublicListingDTO` has neither field. Map pins and
list cards for real data will always show fewer stats than the mock/fallback
data, which does have both (a design inconsistency, not a bug).

**Unblocks when:** backend adds `garageCapacity`/an area-equivalent field to
`PublicListingDTO`, or a future "listing detail" screen is pointed at
`DetailedPublicListingDTO` instead (which has `garageCapacity`).

## 5. No pagination on `allListingsForPublic`

The endpoint returns the full unpaginated array; `/buscar` renders all of it
today (both the map and the `listado` grid). No pagination UI exists yet by
design — deferred, matching `docs/map_behaviour.md` item 4. Revisit if the
public listing count grows large enough to matter for `listado` load time.

## 6. `searchProperties` is intentionally unused for this screen

`GET /api/Listings/searchProperties` returns `PropertyDTO[]`, which per
`docs/SCHEMA.md` has no `price` field at all (price is a Listing-side
concept only), and its `ListingType`/`Currency`/`AreaUnit`/`SortBy` query
params are undocumented raw-int enums (see `docs/SCHEMA.md` "Enums —
meanings not documented in the swagger (TBD)"). We use
`allListingsForPublic` plus full client-side filtering instead. Revisit
`searchProperties` if/when the backend documents those enum mappings and it
becomes the pagination/server-filter answer to §5.

## 7. Auth on `allListingsForPublic` is assumed, not confirmed

The swagger declares no `securitySchemes`; we call it unauthenticated,
consistent with how `getCities`/`getNeighborhoods` are already called. Per
`docs/BACKEND_USAGE.md` §3, this is an assumption, not a documented fact.

## 8. Map viewport / bbox search is out of scope

No `moveend`/bounds listener was added to `PropertyMap.tsx`. All pins for
the current client-side-filtered dataset render regardless of the visible
map viewport. See `docs/map_behaviour.md` item 3 for the underlying open
question (radius-based search on pan/zoom) — still unresolved, not
attempted here.

## 9. Fallback/demo-mode messaging is MVP-only, not a final pattern

When `allListingsForPublic` fails, the app falls back to the hardcoded mock
arrays in `search.data.ts` and shows a generic Spanish toast ("No se pudo
conectar con el servidor. Mostrando propiedades de ejemplo."). Verified
manually: the fallback dataset is not run through the operation/price
filters, so it always shows all mock entries regardless of the selected
tab/price range — acceptable for an offline demo, but worth knowing before
mistaking it for a filtering bug. This tolerance for a placeholder message
and unfiltered fallback is intentional for this MVP iteration only — a
production fallback experience (e.g. distinguishing "no results match your
filters" from "backend unreachable") is not designed here.
