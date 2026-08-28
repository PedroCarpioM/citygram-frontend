import { Camera, ChevronLeft, ChevronRight, Heart, MapPinned } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link, useLocation, useParams } from 'react-router'
import { Footer } from '~/components/common/Footer'
import { Navbar } from '~/components/common/Navbar'
import { MapPin } from '~/components/map/MapPin'
import { FeatureList } from '~/components/property/FeatureList'
import { featureIcons } from '~/components/property/featureIcons'
import { PropertyContactCard } from '~/components/property/PropertyContactCard'
import { PropertyGallery } from '~/components/property/PropertyGallery'
import { PropertyStat } from '~/components/property/PropertyStat'
import { listingTypeLabel, pickZone, propertyTypeKeyFromLabel } from '~/utils/listing'
import { getListingDetail } from './listing-detail.data'

interface ListingNavState {
  ids: string[]
  index: number
}

export function meta() {
  return [
    { title: 'Detalle de propiedad · CityGram' },
    { name: 'description', content: 'Revisa los detalles completos de este inmueble.' },
  ]
}

export default function ListingDetail() {
  const params = useParams()
  const location = useLocation()
  const [favorited, setFavorited] = useState(false)

  const listing = getListingDetail(params.id)
  const zone = pickZone(listing.propertyAddress, listing.city)
  const operationLabel = listingTypeLabel(listing.type) ?? listing.type
  const images = listing.propertyImages ?? []

  const navState = location.state as ListingNavState | null
  const hasNav = Boolean(navState && navState.ids.length > 1)
  const nextIndex = navState ? (navState.index + 1) % navState.ids.length : 0
  const nextId = navState?.ids[nextIndex]

  const detailRows: [string, string | number | null][] = [
    ['Ciudad', listing.city],
    ['Dirección', listing.propertyAddress],
    ['Tipo de Inmueble', listing.propertyType],
    ['Tipo de Negocio', operationLabel],
    ['Estado', listing.propertyCondition],
    ['Año Construcción', listing.yearBuilt],
    ['N° de plantas', listing.stories],
    ['Habitaciones', listing.bedrooms],
    ['Baños', listing.bathrooms],
    ['Parqueo', listing.garageCapacity],
    ['Capacidad', listing.people ? `${listing.people} personas` : null],
    ['Amoblado', listing.isFurnished === null ? null : listing.isFurnished ? 'Sí' : 'No'],
    [
      'Admite mascotas',
      listing.isPetFriendly === null ? null : listing.isPetFriendly ? 'Sí' : 'No',
    ],
    ['Entorno', listing.surrounding],
  ]

  const priceLine = `${listing.price ?? '—'} ${listing.currency}${
    listing.billingPeriod ? ` / ${listing.billingPeriod}` : ''
  }`

  return (
    <>
      <Navbar />
      <div className="bg-ink-50">
        <div className="mx-auto max-w-[1180px] lg:px-6 lg:py-6">
          <div className="flex items-center justify-between px-5 py-3.5 lg:px-0">
            <Link
              to="/buscar"
              className="inline-flex items-center gap-1 text-sm font-bold text-ink-600 hover:no-underline"
            >
              <ChevronLeft size={14} aria-hidden strokeWidth={3} />
              Listado
            </Link>
            {hasNav ? (
              <>
                <div className="text-sm font-semibold text-ink-900">
                  <b className="font-extrabold">{navState!.index + 1}</b> de {navState!.ids.length}
                </div>
                <Link
                  to={`/propiedades/${nextId}`}
                  state={{ ids: navState!.ids, index: nextIndex }}
                  className="inline-flex items-center gap-1 text-sm font-bold text-ink-600 hover:no-underline"
                >
                  Siguiente inmueble
                  <ChevronRight size={14} aria-hidden strokeWidth={3} />
                </Link>
              </>
            ) : (
              <span />
            )}
          </div>

          <div className="bg-ink-900 lg:rounded-t-lg">
            <div className="flex items-center justify-between px-5 py-3.5">
              <div className="font-display text-title font-bold text-white">Zona {zone}</div>
              <button
                type="button"
                onClick={() => setFavorited((f) => !f)}
                aria-label="Favorito"
                className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white"
              >
                <Heart
                  size={18}
                  aria-hidden
                  className="text-brand-primary"
                  fill={favorited ? 'var(--color-pink-500)' : 'none'}
                />
              </button>
            </div>
          </div>

          <div className="lg:rounded-b-lg lg:bg-white lg:shadow-card">
            <div className="px-5 pt-3.5 lg:px-6 lg:pt-6">
              <PropertyGallery
                images={images}
                alt={listing.title ?? zone}
                heroClassName="h-[260px] lg:h-[420px] lg:rounded-lg"
              />
            </div>
            <div className="lg:hidden">
              <InfoChips photoCount={images.length} />
            </div>

            <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-8 lg:px-6 lg:pb-6">
              <div className="flex flex-col gap-1 px-5 pt-2 lg:px-0 lg:pt-0">
                <ListingHeader listing={listing} operationLabel={operationLabel} />
                <PriceLine priceLine={priceLine} />
                <AreaLines listing={listing} />
                <TitleAndDescription listing={listing} />
                <Section title="Detalles del Inmueble">
                  <div className="flex flex-col gap-3">
                    {detailRows
                      .filter(([, value]) => value !== null && value !== undefined && value !== '')
                      .map(([label, value]) => (
                        <div key={label} className="flex gap-2 text-body text-ink-900">
                          <b className="shrink-0 font-bold">{label}:</b> {value}
                        </div>
                      ))}
                  </div>
                </Section>
                {listing.amenities && listing.amenities.length > 0 ? (
                  <Section title="Características Internas">
                    <FeatureList items={listing.amenities} />
                  </Section>
                ) : null}
                {listing.externalFeatures && listing.externalFeatures.length > 0 ? (
                  <Section title="Características Externas">
                    <FeatureList items={listing.externalFeatures} />
                  </Section>
                ) : null}
              </div>

              <aside className="hidden flex-col gap-5 lg:flex">
                <div className="sticky top-24 flex flex-col gap-5">
                  <LocationCard listing={listing} />
                  <PropertyContactCard
                    userName={listing.userName ?? 'Anunciante'}
                    contactPhone={listing.contactPhone}
                  />
                </div>
              </aside>
            </div>

            <div className="flex flex-col gap-5 px-5 py-2 lg:hidden">
              <LocationCard listing={listing} />
              <PropertyContactCard
                userName={listing.userName ?? 'Anunciante'}
                contactPhone={listing.contactPhone}
              />
            </div>

            <div className="px-5 pb-6 lg:px-6">
              <Link
                to="/buscar"
                className="flex w-full items-center justify-center rounded-md border-2 border-brand-primary px-5 py-3 text-sm font-bold text-brand-primary hover:no-underline hover:bg-pink-50"
              >
                Seguir buscando en {zone}
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gradient-brand p-4 text-center font-display text-base font-extrabold text-white">
          Anuncia Gratis
        </div>
      </div>
      <Footer />
    </>
  )
}

function InfoChips({ photoCount }: { photoCount: number }) {
  return (
    <div className="flex gap-2 overflow-x-auto px-5 py-3.5">
      <span className="flex items-center gap-1.5 whitespace-nowrap rounded-sm border border-ink-100 bg-white px-2.5 py-2 text-xs font-bold text-ink-900">
        <Camera size={15} aria-hidden />
        {photoCount} fotos
      </span>
      <a
        href="#ubicacion"
        className="flex items-center gap-1.5 whitespace-nowrap rounded-sm border border-brand-primary bg-white px-2.5 py-2 text-xs font-bold text-brand-primary hover:no-underline"
      >
        <MapPinned size={15} aria-hidden />
        Ver mapa
      </a>
    </div>
  )
}

function ListingHeader({
  listing,
  operationLabel,
}: {
  listing: ReturnType<typeof getListingDetail>
  operationLabel: string | null
}) {
  return (
    <div className="flex items-center justify-between pt-3.5">
      <div className="font-display text-title font-bold text-ink-900">
        {listing.propertyType} en {operationLabel}
      </div>
      <div className="flex gap-3.5">
        {listing.bedrooms !== null ? (
          <PropertyStat icon={featureIcons.beds} value={listing.bedrooms} />
        ) : null}
        {listing.bathrooms !== null ? (
          <PropertyStat icon={featureIcons.baths} value={listing.bathrooms} />
        ) : null}
        {listing.garageCapacity !== null ? (
          <PropertyStat icon={featureIcons.garages} value={listing.garageCapacity} />
        ) : null}
      </div>
    </div>
  )
}

function PriceLine({ priceLine }: { priceLine: string }) {
  return (
    <div className="pt-2.5">
      <div className="inline-block border-b-2 border-brand-primary pb-2 text-xl font-bold text-ink-900">
        Precio: <span className="font-extrabold text-brand-primary">{priceLine}</span>
      </div>
    </div>
  )
}

function AreaLines({ listing }: { listing: ReturnType<typeof getListingDetail> }) {
  if (!listing.area && !listing.builtArea) return null
  return (
    <div className="flex flex-col gap-1.5 pt-4 text-body text-ink-900">
      {listing.area ? (
        <div>
          <b className="font-bold">Sup. Lote:</b> {listing.area}
        </div>
      ) : null}
      {listing.builtArea ? (
        <div>
          <b className="font-bold">Sup. Const:</b> {listing.builtArea}
        </div>
      ) : null}
    </div>
  )
}

function TitleAndDescription({ listing }: { listing: ReturnType<typeof getListingDetail> }) {
  return (
    <div className="flex flex-col gap-2.5 pt-3.5">
      {listing.title ? (
        <div className="font-display text-lg font-bold leading-snug text-ink-900">
          {listing.title}
        </div>
      ) : null}
      {listing.description ? (
        <p className="text-body leading-relaxed text-ink-600">{listing.description}</p>
      ) : null}
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="pt-6">
      <div className="border-b-2 border-brand-primary pb-2.5 font-display text-title font-bold text-brand-primary">
        {title}
      </div>
      <div className="pt-4">{children}</div>
    </div>
  )
}

function LocationCard({ listing }: { listing: ReturnType<typeof getListingDetail> }) {
  return (
    <div id="ubicacion" className="scroll-mt-24">
      <div className="mb-2.5 font-display text-title font-bold text-brand-primary lg:hidden">
        Ubicación
      </div>
      <div className="relative h-[160px] overflow-hidden rounded-lg">
        <img
          src="/images/home/map-placeholder.jpg"
          alt="Mapa de ubicación"
          className="h-full w-full object-cover"
        />
        <div className="absolute left-[45%] top-[44%] -translate-x-1/2 -translate-y-full">
          <MapPin
            price={listing.price ? `${listing.price} ${listing.currency}` : undefined}
            size="md"
            type={propertyTypeKeyFromLabel(listing.propertyType)}
          />
        </div>
      </div>
    </div>
  )
}
