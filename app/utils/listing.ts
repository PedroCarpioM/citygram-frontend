import type { PublicListingDTO } from '~/types/listing'

export interface PropertyListing {
  id: string
  lat: number
  lng: number
  zone: string
  image: string
  price: string
  priceValue: number | null
  operationType: string | null
  beds: number
  baths: number
  garages?: number
  area?: number
  size?: 'sm' | 'md'
}

const PLACEHOLDER_IMAGE = '/images/properties/property-photo-1.jpg'
const COMBINING_DIACRITICS = /[\u0300-\u036f]/g

export function mapPublicListing(dto: PublicListingDTO): PropertyListing {
  return {
    id: dto.id,
    lat: dto.latitude,
    lng: dto.longitude,
    zone: dto.propertyAddress ?? dto.city ?? 'Sin dirección',
    image: dto.propertyImages?.[0] ?? PLACEHOLDER_IMAGE,
    price: dto.price ?? '',
    priceValue: parsePrice(dto.price),
    operationType: dto.type,
    beds: dto.bedrooms ?? 0,
    baths: dto.bathrooms ?? 0,
  }
}

/**
 * Parses a Bolivian-formatted price string ("620.000", `.` as thousands
 * separator) into a number. Returns null when unparseable so callers can
 * exclude priceless listings from range filters instead of treating them as 0.
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
 * Best-effort, accent/case-insensitive match between a listing's raw `type`
 * string and one of the operation tab labels (Venta/Alquiler/Anticrético).
 * See docs/backend_requirements.md — this mapping is inferred, not confirmed.
 */
export function matchesOperation(operationType: string | null, selected: string): boolean {
  if (!operationType) return false
  return normalizeText(operationType) === normalizeText(selected)
}
