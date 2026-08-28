import L from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import type { PropertyTypeKey } from '~/components/property/PropertyTypeTile'
import { PropertyCard } from '~/components/property/PropertyCard'
import { MapPin } from './MapPin'

export interface MapPinData {
  id: string
  lat: number
  lng: number
  zone: string
  price: string
  priceNum: number
  beds: number
  baths: number
  garages?: number
  area?: number
  currency?: string | null
  image: string
  size: 'sm' | 'md'
  type: PropertyTypeKey | null
}

interface PropertyMapProps {
  pins: MapPinData[]
  center: [number, number]
  zoom: number
}

const pinIconCache = new Map<string, L.DivIcon>()

function buildPinIcon(pin: MapPinData) {
  const cacheKey = `${pin.id}-${pin.size}-${pin.price}-${pin.type}`
  const cached = pinIconCache.get(cacheKey)
  if (cached) return cached

  const dim = pin.size === 'sm' ? 34 : 44
  const labelHeight = 24
  const html = renderToStaticMarkup(<MapPin price={pin.price} size={pin.size} type={pin.type} />)
  const icon = L.divIcon({
    html,
    className: '',
    iconSize: [dim, dim * 1.2 + labelHeight],
    iconAnchor: [dim / 2, dim * 1.2 + labelHeight],
  })
  pinIconCache.set(cacheKey, icon)
  return icon
}

function ZoomControls() {
  const map = useMap()
  return (
    <div className="absolute bottom-20 right-4 z-[1000] flex flex-col gap-2 lg:bottom-5">
      <button
        type="button"
        onClick={() => map.zoomIn()}
        aria-label="Acercar"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-bold text-ink-900 shadow-card"
      >
        +
      </button>
      <button
        type="button"
        onClick={() => map.zoomOut()}
        aria-label="Alejar"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-bold text-ink-900 shadow-card"
      >
        –
      </button>
    </div>
  )
}

export default function PropertyMap({ pins, center, zoom }: PropertyMapProps) {
  const ids = pins.map((pin) => pin.id)

  return (
    <MapContainer center={center} zoom={zoom} zoomControl={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pins.map((pin, index) => (
        <Marker key={pin.id} position={[pin.lat, pin.lng]} icon={buildPinIcon(pin)}>
          <Popup minWidth={220} maxWidth={340}>
            <div className="lg:hidden">
              <PropertyCard
                compact
                image={pin.image}
                zone={pin.zone}
                price={pin.price}
                beds={pin.beds}
                baths={pin.baths}
                garages={pin.garages}
                area={pin.area}
                currency={pin.currency ?? undefined}
                to={`/propiedades/${pin.id}`}
                state={{ ids, index }}
              />
            </div>
            <div className="hidden lg:block">
              <PropertyCard
                image={pin.image}
                zone={pin.zone}
                price={pin.price}
                beds={pin.beds}
                baths={pin.baths}
                garages={pin.garages}
                area={pin.area}
                currency={pin.currency ?? undefined}
                to={`/propiedades/${pin.id}`}
                state={{ ids, index }}
              />
            </div>
          </Popup>
        </Marker>
      ))}
      <ZoomControls />
    </MapContainer>
  )
}
