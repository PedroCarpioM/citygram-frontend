import type { MapPinData } from '~/components/map/PropertyMap'
import type { PropertyTypeKey } from '~/components/property/PropertyTypeTile'

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

function formatPrice(amount: number) {
  return `${amount.toLocaleString('es-BO')} Sus`
}

export const pinData: MapPinData[] = [
  {
    id: '1',
    lat: -17.3762,
    lng: -66.152,
    zone: 'Cala Cala',
    priceNum: 620000,
    price: formatPrice(620000),
    image: '/images/properties/property-photo-1.jpg',
    size: 'md',
    beds: 3,
    baths: 2,
    garages: 1,
    area: 280,
  },
  {
    id: '2',
    lat: -17.3935,
    lng: -66.142,
    zone: 'Av. Aroma',
    priceNum: 85000,
    price: formatPrice(85000),
    image: '/images/properties/property-photo-2.jpg',
    size: 'sm',
    beds: 0,
    baths: 0,
    garages: 0,
    area: 350,
  },
  {
    id: '3',
    lat: -17.383,
    lng: -66.165,
    zone: 'Monseñor Rivero',
    priceNum: 740000,
    price: formatPrice(740000),
    image: '/images/properties/property-photo-3.jpg',
    size: 'md',
    beds: 4,
    baths: 3,
    garages: 2,
    area: 340,
  },
  {
    id: '4',
    lat: -17.365,
    lng: -66.155,
    zone: 'Zona Norte',
    priceNum: 450000,
    price: formatPrice(450000),
    image: '/images/properties/property-photo-4.jpg',
    size: 'sm',
    beds: 2,
    baths: 2,
    garages: 1,
    area: 190,
  },
]

export const listingData = [
  {
    image: '/images/properties/property-photo-1.jpg',
    zone: 'Cala Cala',
    price: '620.000',
    currency: 'Sus',
    beds: 3,
    baths: 2,
    garages: 1,
    area: 280,
  },
  {
    image: '/images/properties/property-photo-3.jpg',
    zone: 'Monseñor Rivero',
    price: '740.000',
    currency: 'Sus',
    beds: 4,
    baths: 3,
    garages: 2,
    area: 340,
  },
  {
    image: '/images/properties/property-photo-4.jpg',
    zone: 'Zona Norte',
    price: '450.000',
    currency: 'Sus',
    beds: 2,
    baths: 2,
    garages: 1,
    area: 190,
  },
]
