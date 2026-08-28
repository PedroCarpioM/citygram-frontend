import type { PropertyTypeKey } from '~/components/property/PropertyTypeTile'
import { formatPrice, type PropertyListing } from '~/utils/listing'

export const operationOptions = ['Venta', 'Alquiler', 'Anticrético']

export const propertyTypeData: { type: PropertyTypeKey; label: string }[] = [
  { type: 'vivienda', label: 'Casa' },
  { type: 'departamento', label: 'Departamento' },
  { type: 'terreno', label: 'Terreno' },
  { type: 'local', label: 'Local' },
  { type: 'oficina', label: 'Oficina' },
  { type: 'hotel', label: 'Hotel' },
]

export const priceMinOptions = ['Mín.', '50.000', '100.000', '200.000', '400.000']
export const priceMaxOptions = ['Máx.', '200.000', '400.000', '600.000', '1.000.000']

export const COCHABAMBA_CENTER: [number, number] = [-17.3895, -66.1568]

/**
 * Offline/demo fallback dataset, shown when the real allListingsForPublic
 * fetch fails (see useListings.ts). Shaped like PropertyListing — the same
 * shape real data is mapped into — so it runs through the exact same
 * operation/price/property-type filtering pipeline in search.tsx instead of
 * bypassing it.
 */
export const mockListings: PropertyListing[] = [
  {
    id: 'mock-1',
    lat: -17.3762,
    lng: -66.152,
    zone: 'Cala Cala',
    priceValue: 620000,
    price: formatPrice(620000, 'USD'),
    currency: 'USD',
    image: '/images/properties/property-photo-1.jpg',
    size: 'md',
    operationType: 'Venta',
    propertyType: 'Casa',
    beds: 3,
    baths: 2,
    garages: 1,
    area: 280,
  },
  {
    id: 'mock-2',
    lat: -17.3935,
    lng: -66.142,
    zone: 'Av. Aroma',
    priceValue: 85000,
    price: formatPrice(85000, 'USD'),
    currency: 'USD',
    image: '/images/properties/property-photo-2.jpg',
    size: 'sm',
    operationType: 'Alquiler',
    propertyType: 'Departamento',
    beds: 1,
    baths: 1,
    garages: 0,
    area: 350,
  },
  {
    id: 'mock-3',
    lat: -17.383,
    lng: -66.165,
    zone: 'Monseñor Rivero',
    priceValue: 740000,
    price: formatPrice(740000, 'USD'),
    currency: 'USD',
    image: '/images/properties/property-photo-3.jpg',
    size: 'md',
    operationType: 'Venta',
    propertyType: 'Casa',
    beds: 4,
    baths: 3,
    garages: 2,
    area: 340,
  },
  {
    id: 'mock-4',
    lat: -17.365,
    lng: -66.155,
    zone: 'Zona Norte',
    priceValue: 450000,
    price: formatPrice(450000, 'USD'),
    currency: 'USD',
    image: '/images/properties/property-photo-4.jpg',
    size: 'sm',
    operationType: 'Anticrético',
    propertyType: 'Terreno',
    beds: 2,
    baths: 2,
    garages: 1,
    area: 190,
  },
]
