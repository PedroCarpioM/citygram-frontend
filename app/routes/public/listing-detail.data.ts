import type { DetailedPublicListingDTO } from '~/types/listing'

/**
 * `currency` isn't part of `DetailedPublicListingDTO` (see docs/backend_requirements.md) —
 * kept here only for the mock/demo dataset, sourced the same way the real page will: from
 * the `location.state` a listing card passes when navigating here.
 */
export type MockListingDetail = DetailedPublicListingDTO & { currency: string }

export const defaultListingDetail: MockListingDetail = {
  id: 'a1b2c3d4-5e6f-4a7b-8c9d-0e1f2a3b4c5d',
  userName: 'Fernando Rocha',
  contactPhone: '+591 700 45 210',
  propertyAddress: 'Cala-Cala',
  city: 'Cochabamba',
  bedrooms: 3,
  bathrooms: 3,
  people: 6,
  isPetFriendly: true,
  isFurnished: false,
  surrounding: 'Zona residencial tranquila, cerca de colegios, supermercados y áreas verdes',
  stories: 2,
  yearBuilt: 2020,
  garageCapacity: 1,
  propertyCondition: 'Nuevo',
  propertyType: 'Casa',
  area: '350 m2',
  builtArea: '180 m2',
  latitude: -17.3762,
  longitude: -66.152,
  type: 'Sale',
  price: '150.000',
  billingPeriod: null,
  title: 'Casa moderna de un solo dueño con piscina y deck de madera en Cala-Cala',
  description:
    'Casa de dos plantas construida en 2020, con ambientes amplios integrados hacia una piscina y deck exterior. Living, comedor y cocina tipo americana se abren a un patio techado, ideal para reuniones familiares. Ubicada a pocas cuadras de colegios, supermercados y áreas verdes, en una zona residencial tranquila.',
  amenities: [
    'Armarios Empotrados',
    'Intercomunicador',
    'Cocina Tipo Americana',
    'Baño Auxiliar',
    'Gas Domiciliario',
    'Calefacción',
    'Zona de lavandería',
  ],
  externalFeatures: ['Piscina', 'Deck de madera', 'Jardín', 'Terraza techada', 'Parqueo cubierto'],
  propertyImages: [
    '/images/properties/property-photo-1.jpg',
    '/images/properties/property-photo-2.jpg',
    '/images/properties/property-photo-3.jpg',
    '/images/properties/property-photo-4.jpg',
  ],
  currency: 'USD',
}

/** Keyed by the same mock ids used in search.data.ts's `mockListings`, so clicking a card in the offline/demo search fallback lands on matching detail content. */
export const mockListingDetails: Record<string, MockListingDetail> = {
  'mock-1': {
    ...defaultListingDetail,
    id: 'mock-1',
    propertyAddress: 'Cala Cala',
    bedrooms: 3,
    bathrooms: 2,
    garageCapacity: 1,
    propertyType: 'Casa',
    type: 'Sale',
    price: '620.000',
    currency: 'USD',
    title: 'Casa moderna de un solo dueño con piscina y deck de madera en Cala-Cala',
  },
  'mock-2': {
    ...defaultListingDetail,
    id: 'mock-2',
    propertyAddress: 'Av. Aroma',
    bedrooms: 1,
    bathrooms: 1,
    garageCapacity: 0,
    propertyType: 'Departamento',
    type: 'Rent',
    price: '85.000',
    currency: 'USD',
    isFurnished: true,
    title: 'Departamento amoblado con vista a la ciudad sobre Av. Aroma',
    propertyImages: [
      '/images/properties/property-photo-2.jpg',
      '/images/properties/property-photo-3.jpg',
    ],
  },
  'mock-3': {
    ...defaultListingDetail,
    id: 'mock-3',
    propertyAddress: 'Monseñor Rivero',
    bedrooms: 4,
    bathrooms: 3,
    garageCapacity: 2,
    propertyType: 'Casa',
    type: 'Sale',
    price: '740.000',
    currency: 'USD',
    title: 'Amplia casa familiar en Monseñor Rivero con jardín y parqueo doble',
  },
  'mock-4': {
    ...defaultListingDetail,
    id: 'mock-4',
    propertyAddress: 'Zona Norte',
    bedrooms: 2,
    bathrooms: 2,
    garageCapacity: 1,
    propertyType: 'Terreno',
    type: 'Anticretico',
    price: '450.000',
    currency: 'USD',
    title: 'Terreno urbanizado en Zona Norte, listo para construir',
  },
}

export function getListingDetail(id: string | undefined): MockListingDetail {
  if (id && mockListingDetails[id]) return mockListingDetails[id]
  return { ...defaultListingDetail, id: id ?? defaultListingDetail.id }
}
