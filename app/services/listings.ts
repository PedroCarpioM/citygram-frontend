import { api } from './api'
import type {
  CreateListingDTO,
  ListingDTO,
  PublicListingDTO,
  UpdateListingDTO,
} from '~/types/listing'

export async function getPublicListings() {
  const { data } = await api.get<PublicListingDTO[]>('/Listings/allListingsForPublic')
  return data
}

export async function getOwnerListings() {
  const { data } = await api.get<ListingDTO[]>('/Listings')
  return data
}

export async function getOwnerListing(id: string) {
  const { data } = await api.get<ListingDTO>(`/Listings/${id}`)
  return data
}

export async function createListing(body: CreateListingDTO, publishAt = false) {
  const { data } = await api.post<string>('/Listings', body, { params: { PublishAt: publishAt } })
  return data
}

export async function updateListing(id: string, body: UpdateListingDTO) {
  await api.put(`/Listings/${id}`, body)
}

export async function deleteListing(id: string) {
  await api.delete(`/Listings/${id}`)
}

export async function getUserListings(userId: string) {
  const { data } = await api.get<ListingDTO[]>(`/Listings/user/${userId}`)
  return data
}
