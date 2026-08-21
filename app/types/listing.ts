export interface PublicListingDTO {
  id: string
  propertyAddress: string | null
  city: string | null
  bedrooms: number | null
  bathrooms: number | null
  latitude: number
  longitude: number
  type: string | null
  price: string | null
  billingPeriod: string | null
  title: string | null
  description: string | null
  propertyImages: string[] | null
}
