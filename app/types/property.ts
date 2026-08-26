/**
 * `propertyCondition` and `areaUnit`/`builtAreaUnit` are raw backend enum ints with no
 * documented label mapping yet (see docs/SCHEMA.md — Enums TBD). Keep them as `number`
 * and treat them as opaque until backend confirms the mapping.
 */

export interface PropertyDTO {
  id: string
  bedrooms: number
  bathrooms: number
  people: number | null
  isPetFriendly: boolean
  isFurnished: boolean
  surrounding: string | null
  stories: number
  yearBuilt: number | null
  propertyCondition: string | null
  propertyType: string | null
  street: string | null
  houseNumber: string | null
  area: string | null
  builtArea: string | null
  neighborhood: string | null
  city: string | null
  state: string | null
  country: string | null
  latitude: number
  longitude: number
  amenities: string[] | null
  images: string[] | null
  externalFeatures: string[] | null
}

export interface CreatePropertyDTO {
  bedrooms: number
  bathrooms: number
  people: number | null
  isPetFriendly: boolean
  isFurnished: boolean
  surrounding: string | null
  stories: number
  yearBuilt: number | null
  propertyCondition: number
  propertyTypeId: string
  street: string | null
  houseNumber: string | null
  neighborhoodId: string
  area: number
  areaUnit: number
  builtArea: number
  builtAreaUnit: number
  latitude: number
  longitude: number
}

export type UpdatePropertyDTO = CreatePropertyDTO

export interface PropertyTypeDTO {
  id: string
  name: string | null
}
