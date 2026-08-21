import { api } from './api'
import type { PublicListingDTO } from '~/types/listing'

export async function getPublicListings() {
  const { data } = await api.get<PublicListingDTO[]>('/Listings/allListingsForPublic')
  return data
}
