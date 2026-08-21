export interface CityDTO {
  id: string
  name: string | null
  province: string | null
}

export interface NeighborhoodDTO {
  id: string
  name: string | null
  cityName: string | null
}
