import { api } from './api'
import type { CityDTO } from '~/types/location'

export async function getCities() {
  const { data } = await api.get<CityDTO[]>('/Cities')
  return data
}
