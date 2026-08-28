import leafletCss from 'leaflet/dist/leaflet.css?url'
import { Filter, List, MapPin } from 'lucide-react'
import { lazy, Suspense, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { Link, useSearchParams } from 'react-router'
import { toast } from 'sonner'
import { Button } from '~/components/common/Button'
import { SegmentedTabs } from '~/components/common/SegmentedTabs'
import type { MapPinData } from '~/components/map/PropertyMap'
import { PropertyMapSkeleton } from '~/components/map/PropertyMapSkeleton'
import { PropertyCard } from '~/components/property/PropertyCard'
import { PropertyTypeTile, type PropertyTypeKey } from '~/components/property/PropertyTypeTile'
import { usePublicListings } from '~/hooks/useListings'
import { mapPublicListing, matchesOperation, matchesPropertyType } from '~/utils/listing'
import {
  COCHABAMBA_CENTER,
  mockListings,
  OPERATION_SLUGS,
  operationFromSlug,
  operationOptions,
  propertyTypeData,
} from './search.data'

const PropertyMap = lazy(() => import('~/components/map/PropertyMap'))
const LISTADO_PAGE_SIZE = 12

function subscribeNoop() {
  return () => {}
}

/** True only once hydrated on the client — keeps Leaflet's module graph out of the SSR render. */
function useMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  )
}

export function links() {
  return [{ rel: 'stylesheet', href: leafletCss }]
}

export function meta() {
  return [
    { title: 'Buscar propiedades · CityGram' },
    {
      name: 'description',
      content: 'Busca casas, departamentos y terrenos en el mapa o en el listado.',
    },
  ]
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState<'mapa' | 'listado'>('mapa')
  const [filtrarOpen, setFiltrarOpen] = useState(false)
  const mounted = useMounted()

  // Only the filters that still actually filter results (operation, property type) live in
  // the URL — invalid/unknown values fall back to the defaults instead of breaking the page.
  const operation = operationFromSlug(searchParams.get('operacion')) ?? operationOptions[0]
  const typeSlug = searchParams.get('tipo')
  const activeType = propertyTypeData.some((pt) => pt.type === typeSlug)
    ? (typeSlug as PropertyTypeKey)
    : null

  function setOperation(next: string) {
    const params = new URLSearchParams(searchParams)
    const slug = OPERATION_SLUGS[next]
    if (slug) params.set('operacion', slug)
    else params.delete('operacion')
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }

  function setActiveType(next: PropertyTypeKey | null) {
    const params = new URLSearchParams(searchParams)
    if (next) params.set('tipo', next)
    else params.delete('tipo')
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }

  const listingsQuery = usePublicListings()

  useEffect(() => {
    if (listingsQuery.isError) {
      toast.error('No se pudo conectar con el servidor. Mostrando propiedades de ejemplo.')
    }
  }, [listingsQuery.isError])

  const mappedListings = useMemo(
    () => (listingsQuery.data ?? []).map(mapPublicListing),
    [listingsQuery.data],
  )

  // On error, filter the same mock dataset instead of bypassing filtering —
  // keeps tab/price interactions meaningful in the offline/demo fallback too.
  const sourceListings = listingsQuery.isError ? mockListings : mappedListings

  const activeTypeLabel = useMemo(
    () => propertyTypeData.find((pt) => pt.type === activeType)?.label ?? null,
    [activeType],
  )

  // TODO(search-price-filter): price filtering is asleep — see the TODO on priceMinOptions/
  // priceMaxOptions in search.data.ts for why. Re-add a priceValue min/max check here once the
  // backend confirms PublicListingDTO.price's real format.
  const filteredListings = useMemo(
    () =>
      sourceListings.filter((item) => {
        if (!matchesOperation(item.operationType, operation)) return false
        if (activeTypeLabel && !matchesPropertyType(item.propertyType, activeTypeLabel))
          return false
        return true
      }),
    [sourceListings, operation, activeTypeLabel],
  )

  const [visibleCount, setVisibleCount] = useState(LISTADO_PAGE_SIZE)
  const [prevFilteredListings, setPrevFilteredListings] = useState(filteredListings)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  if (filteredListings !== prevFilteredListings) {
    setPrevFilteredListings(filteredListings)
    setVisibleCount(LISTADO_PAGE_SIZE)
  }

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setVisibleCount((count) => count + LISTADO_PAGE_SIZE)
      }
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [viewMode, filteredListings, visibleCount])

  const pins: MapPinData[] = filteredListings.map((item) => ({
    id: item.id,
    lat: item.lat,
    lng: item.lng,
    zone: item.zone,
    price: item.price,
    priceNum: item.priceValue,
    beds: item.beds,
    baths: item.baths,
    garages: item.garages,
    area: item.area,
    currency: item.currency,
    image: item.image,
    size: item.size ?? 'md',
  }))

  const listItems = filteredListings.map((item) => ({
    id: item.id,
    image: item.image,
    zone: item.zone,
    price: item.price,
    beds: item.beds,
    baths: item.baths,
    garages: item.garages,
    area: item.area,
    currency: item.currency ?? undefined,
  }))

  const visibleListItems = listItems.slice(0, visibleCount)
  const hasMoreListItems = visibleCount < listItems.length

  const resultsCountLabel = `${listItems.length} anuncios en ${operation.toLowerCase()}`

  const propertyTypeTiles = propertyTypeData.map((pt) => (
    <PropertyTypeTile
      key={pt.type}
      type={pt.type}
      label={pt.label}
      active={pt.type === activeType}
      onClick={() => setActiveType(activeType === pt.type ? null : pt.type)}
    />
  ))

  return (
    <div className="flex h-dvh flex-col lg:flex-row">
      {/* Mobile top bar — default/base layout */}
      <div className="flex flex-col gap-3 border-b border-ink-100 bg-white p-4 lg:hidden">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-600"
        >
          ‹ Volver
        </Link>
        <SegmentedTabs options={operationOptions} value={operation} onChange={setOperation} />
        <button
          type="button"
          onClick={() => setFiltrarOpen((open) => !open)}
          className={`flex items-center gap-2 text-sm font-bold ${
            filtrarOpen ? 'text-brand-primary' : 'text-ink-900'
          }`}
        >
          <Filter size={16} aria-hidden />
          FILTRAR
        </button>
      </div>

      {/* Desktop sidebar — progressive enhancement, absent on mobile */}
      <aside className="hidden lg:flex lg:w-[300px] lg:flex-shrink-0 lg:flex-col lg:gap-5 lg:overflow-y-auto lg:border-r lg:border-ink-100 lg:bg-white lg:p-5">
        <Button
          variant="outline"
          onClick={() => setViewMode((mode) => (mode === 'mapa' ? 'listado' : 'mapa'))}
        >
          {viewMode === 'mapa' ? 'Ir al listado' : 'Ver en el mapa'}
        </Button>
        <SegmentedTabs options={operationOptions} value={operation} onChange={setOperation} />
        <div>
          <div className="mb-2.5 text-xs font-bold uppercase tracking-wide text-ink-600">
            Tipo de propiedad
          </div>
          <div className="grid grid-cols-2 gap-2">{propertyTypeTiles}</div>
        </div>
        {/* TODO(search-price-filter): price range selects removed here — see the TODO on
            priceMinOptions/priceMaxOptions in search.data.ts. */}
      </aside>

      <div className="relative min-h-0 flex-1">
        {filtrarOpen ? (
          <div className="absolute inset-x-3 top-3 z-[1000] flex flex-wrap justify-center gap-2.5 lg:hidden">
            {propertyTypeTiles}
          </div>
        ) : null}

        {viewMode === 'mapa' ? (
          <div className="relative h-full w-full">
            <div className="absolute left-4 top-4 z-[1000] hidden lg:block">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-brand-primary bg-white px-3.5 py-2 text-sm font-bold text-brand-primary shadow-card"
              >
                ☰ Zonas seleccionadas (1)
              </button>
            </div>
            <div className="absolute left-1/2 top-4 z-[1000] hidden -translate-x-1/2 lg:block">
              <div className="rounded-full bg-ink-900 px-4 py-2 text-sm font-bold text-white shadow-card">
                {resultsCountLabel}
              </div>
            </div>

            {mounted && !listingsQuery.isLoading ? (
              <Suspense fallback={<PropertyMapSkeleton />}>
                <PropertyMap pins={pins} center={COCHABAMBA_CENTER} zoom={14} />
              </Suspense>
            ) : (
              <PropertyMapSkeleton />
            )}
          </div>
        ) : (
          <div className="h-full overflow-y-auto bg-ink-50 p-4 lg:p-6">
            <div className="mb-4 text-sm font-semibold text-ink-600">{resultsCountLabel}</div>
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] lg:gap-5">
              {visibleListItems.map(({ id, ...item }) => (
                <PropertyCard key={id} {...item} />
              ))}
            </div>
            {hasMoreListItems ? <div ref={sentinelRef} className="h-1" /> : null}
          </div>
        )}

        {/* View toggle FAB — mobile only; desktop uses the sidebar button instead. Always
            labels the *destination* view (not the current one) so the action is unambiguous. */}
        <button
          type="button"
          onClick={() => setViewMode((mode) => (mode === 'mapa' ? 'listado' : 'mapa'))}
          aria-label={
            viewMode === 'mapa' ? 'Cambiar a vista de listado' : 'Cambiar a vista de mapa'
          }
          className="absolute bottom-4 left-1/2 z-[1000] flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-sm font-bold text-white shadow-elevated transition-colors duration-200 active:scale-[0.97] lg:hidden"
        >
          {viewMode === 'mapa' ? (
            <>
              <List size={18} aria-hidden />
              Ver listado
            </>
          ) : (
            <>
              <MapPin size={18} aria-hidden />
              Ver mapa
            </>
          )}
        </button>
      </div>

      <div className="bg-gradient-brand p-4 text-center font-display text-base font-extrabold text-white lg:hidden">
        Anuncia Gratis
      </div>
    </div>
  )
}
