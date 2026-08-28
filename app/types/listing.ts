export interface PublicListingDTO {
  id: string
  propertyAddress: string
  city: string
  bedrooms: number | null
  bathrooms: number | null
  garageCapacity: number | null
  latitude: number
  longitude: number
  propertyType: string
  listingType: string
  price: number
  currency: string
  billingPeriod: string
  title: string | null
  description: string | null
  propertyImages: string[] | null
}

export interface DetailedPublicListingDTO {
  id: string
  userName: string | null
  contactPhone: string | null
  propertyAddress: string | null
  city: string | null
  bedrooms: number | null
  bathrooms: number | null
  people: number | null
  isPetFriendly: boolean | null
  isFurnished: boolean | null
  surrounding: string | null
  stories: number | null
  yearBuilt: number | null
  garageCapacity: number | null
  propertyCondition: string | null
  propertyType: string | null
  area: string | null
  builtArea: string | null
  latitude: number
  longitude: number
  type: string | null
  price: string | null
  billingPeriod: string | null
  title: string | null
  description: string | null
  amenities: string[] | null
  externalFeatures: string[] | null
  propertyImages: string[] | null
}

export interface ListingDTO {
  id: string
  userName: string | null
  contactPhone: string | null
  propertyAddress: string | null
  city: string | null
  bedrooms: number | null
  bathrooms: number | null
  people: number | null
  isPetFriendly: boolean | null
  isFurnished: boolean | null
  surrounding: string | null
  stories: number | null
  yearBuilt: number | null
  garageCapacity: number | null
  propertyCondition: string | null
  propertyType: string | null
  area: string | null
  builtArea: string | null
  latitude: number
  longitude: number
  status: string | null
  type: string | null
  createdAt: string
  publishedAt: string | null
  price: string | null
  billingPeriod: string | null
  title: string | null
  description: string | null
  amenities: string[] | null
  externalFeatures: string[] | null
  propertyImages: string[] | null
}

/**
 * `status`, `type` and `billingPeriod` are raw backend enum ints with no documented
 * label mapping yet (see docs/SCHEMA.md — Enums TBD). Keep them as `number` and treat
 * them as opaque until backend confirms the mapping.
 */
export interface CreateListingDTO {
  userId: string
  contactPhone: string | null
  propertyId: string
  status: number
  type: number
  price: string | null
  currency: number
  billingPeriod: number
  title: string | null
  description: string | null
}

export interface UpdateListingDTO {
  userId: string
  propertyId: string
  contactPhone: string | null
  status: number
  type: number
  publishedAt: string | null
  price: string | null
  currency: number
  billingPeriod: number
  title: string | null
  description: string | null
}
