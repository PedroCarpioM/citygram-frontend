import leafletCss from 'leaflet/dist/leaflet.css?url'
import { lazy, Suspense, useState, useSyncExternalStore } from 'react'
import { Link } from 'react-router'
import { Button } from '~/components/common/Button'
import { SegmentedTabs } from '~/components/common/SegmentedTabs'
import { Select } from '~/components/common/Select'
import { PropertyMapSkeleton } from '~/components/map/PropertyMapSkeleton'
import { PropertyCard } from '~/components/property/PropertyCard'
import { PropertyTypeTile, type PropertyTypeKey } from '~/components/property/PropertyTypeTile'
import {
  COCHABAMBA_CENTER,
  listingData,
  operationOptions,
  pinData,
  priceMaxOptions,
  priceMinOptions,
  propertyTypeData,
} from './search.data'

const PropertyMap = lazy(() => import('~/components/map/PropertyMap'))

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
  const [operation, setOperation] = useState(operationOptions[0])
  const [viewMode, setViewMode] = useState<'mapa' | 'listado'>('mapa')
  const [filtrarOpen, setFiltrarOpen] = useState(false)
  const [activeType, setActiveType] = useState<PropertyTypeKey>('vivienda')
  const [priceMin, setPriceMin] = useState(priceMinOptions[0])
  const [priceMax, setPriceMax] = useState(priceMaxOptions[0])
  const mounted = useMounted()

  const resultsCountLabel = `${listingData.length} anuncios en ${operation.toLowerCase()}`

  const propertyTypeTiles = propertyTypeData.map((pt) => (
    <PropertyTypeTile
      key={pt.type}
      type={pt.type}
      label={pt.label}
      active={pt.type === activeType}
      onClick={() => setActiveType(pt.type)}
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
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setFiltrarOpen((open) => !open)}
            className={`flex items-center gap-2 text-sm font-bold ${
              filtrarOpen ? 'text-brand-primary' : 'text-ink-900'
            }`}
          >
            ☰ FILTRAR
          </button>
          <button
            type="button"
            onClick={() => setViewMode((mode) => (mode === 'mapa' ? 'listado' : 'mapa'))}
            className="flex items-center gap-2 text-sm font-bold text-ink-900"
          >
            {viewMode === 'mapa' ? '☰ LISTADO' : '📍 MAPA'}
          </button>
        </div>
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
        <div className="flex gap-2.5">
          <div className="flex-1">
            <Select
              label="Precio mín."
              value={priceMin}
              options={priceMinOptions}
              onChange={setPriceMin}
            />
          </div>
          <div className="flex-1">
            <Select
              label="Precio máx."
              value={priceMax}
              options={priceMaxOptions}
              onChange={setPriceMax}
            />
          </div>
        </div>
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

            {mounted ? (
              <Suspense fallback={<PropertyMapSkeleton />}>
                <PropertyMap pins={pinData} center={COCHABAMBA_CENTER} zoom={14} />
              </Suspense>
            ) : (
              <PropertyMapSkeleton />
            )}
          </div>
        ) : (
          <div className="h-full overflow-y-auto bg-ink-50 p-4 lg:p-6">
            <div className="mb-4 text-sm font-semibold text-ink-600">{resultsCountLabel}</div>
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] lg:gap-5">
              {listingData.map((item) => (
                <PropertyCard key={item.zone} {...item} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-brand p-4 text-center font-display text-base font-extrabold text-white lg:hidden">
        Anuncia Gratis
      </div>
    </div>
  )
}
