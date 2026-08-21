import { api } from './api'
import type { NeighborhoodDTO } from '~/types/location'

export async function getNeighborhoods() {
  const { data } = await api.get<NeighborhoodDTO[]>('/Neighborhoods')
  return data
}
