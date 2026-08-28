import type { PropertyTypeKey } from '~/components/property/PropertyTypeTile'
import type { PublicListingDTO } from '~/types/listing'

export interface PropertyListing {
  id: string
  lat: number
  lng: number
  zone: string
  image: string
  price: string
  priceValue: number
  operationType: string | null
  propertyType: string | null
  currency: string | null
  beds: number
  baths: number
  garages?: number
  area?: number
  size?: 'sm' | 'md'
}

const PLACEHOLDER_IMAGE = '/images/properties/property-photo-1.jpg'
const COMBINING_DIACRITICS = /[̀-ͯ]/g

/**
 * Maps the backend's `listingType` enum string to the Spanish operation tab
 * label. Only "Sale" → "Venta" is confirmed against a real response; "Rent"
 * and "Anticretico" are best-effort guesses (see docs/backend_requirements.md).
 * Unmapped values pass through unchanged rather than being dropped.
 */
const LISTING_TYPE_LABELS: Record<string, string> = {
  Sale: 'Venta',
  Rent: 'Alquiler',
  Anticretico: 'Anticrético',
}

export function listingTypeLabel(listingType: string | null): string | null {
  if (!listingType) return null
  return LISTING_TYPE_LABELS[listingType] ?? listingType
}

/** Formats a numeric price with a currency suffix, e.g. `620.000 USD`. */
export function formatPrice(amount: number, currency?: string | null) {
  const formatted = amount.toLocaleString('es-BO')
  return currency ? `${formatted} ${currency}` : formatted
}

/**
 * Neither `PublicListingDTO` nor `DetailedPublicListingDTO` expose a dedicated
 * neighborhood/zone field (see docs/backend_requirements.md), so "zone" is
 * approximated from the address, falling back to the city.
 */
export function pickZone(propertyAddress: string | null, city: string | null): string {
  return propertyAddress || city || 'Sin dirección'
}

export function mapPublicListing(dto: PublicListingDTO): PropertyListing {
  return {
    id: dto.id,
    lat: dto.latitude,
    lng: dto.longitude,
    zone: pickZone(dto.propertyAddress, dto.city),
    image: dto.propertyImages?.[0] ?? PLACEHOLDER_IMAGE,
    price: formatPrice(dto.price, dto.currency),
    priceValue: dto.price,
    operationType: listingTypeLabel(dto.listingType),
    propertyType: dto.propertyType,
    currency: dto.currency,
    beds: dto.bedrooms ?? 0,
    baths: dto.bathrooms ?? 0,
    garages: dto.garageCapacity ?? undefined,
  }
}

/**
 * Parses a Bolivian-formatted price string ("620.000", `.` as thousands
 * separator) into a number. Used for the static price-range `<Select>` option
 * labels in search.data.ts — not for `PublicListingDTO.price`, which is now a
 * plain number. Returns null when unparseable.
 */
export function parsePrice(value: string | null | undefined): number | null {
  if (!value) return null
  const normalized = value.replace(/[^\d]/g, '')
  if (!normalized) return null
  const n = Number(normalized)
  return Number.isFinite(n) ? n : null
}

function normalizeText(value: string) {
  return value.normalize('NFD').replace(COMBINING_DIACRITICS, '').trim().toLowerCase()
}

/**
 * Accent/case-insensitive match between a listing's translated operation
 * label (see `listingTypeLabel`) and one of the operation tab labels
 * (Venta/Alquiler/Anticrético).
 */
export function matchesOperation(operationType: string | null, selected: string): boolean {
  if (!operationType) return false
  return normalizeText(operationType) === normalizeText(selected)
}

/**
 * Accent/case-insensitive match between a listing's `propertyType` and one of
 * the property-type tile labels (Casa/Departamento/Terreno/Local/Oficina/Hotel).
 */
export function matchesPropertyType(propertyType: string | null, selected: string): boolean {
  if (!propertyType) return false
  return normalizeText(propertyType) === normalizeText(selected)
}

/**
 * Accent/case-insensitive labels for each `PropertyTypeKey`, mirroring
 * `propertyTypeData` in search.data.ts. Kept here (rather than imported) so
 * this util doesn't depend on a route-local data file.
 */
const PROPERTY_TYPE_LABELS: Record<PropertyTypeKey, string> = {
  vivienda: 'Casa',
  departamento: 'Departamento',
  terreno: 'Terreno',
  local: 'Local',
  oficina: 'Oficina',
  hotel: 'Hotel',
}

/** Normalizes a listing's free-text `propertyType` into a `PropertyTypeKey`, or null if unmatched. */
export function propertyTypeKeyFromLabel(propertyType: string | null): PropertyTypeKey | null {
  if (!propertyType) return null
  const normalized = normalizeText(propertyType)
  const entry = Object.entries(PROPERTY_TYPE_LABELS).find(
    ([, label]) => normalizeText(label) === normalized,
  )
  return (entry?.[0] as PropertyTypeKey) ?? null
}
