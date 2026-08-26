import { api } from './api'
import type { CreatePropertyDTO, PropertyDTO, UpdatePropertyDTO } from '~/types/property'

export async function getProperties() {
  const { data } = await api.get<PropertyDTO[]>('/Properties')
  return data
}

export async function getProperty(id: string) {
  const { data } = await api.get<PropertyDTO>(`/Properties/${id}`)
  return data
}

export async function createProperty(body: CreatePropertyDTO) {
  const { data } = await api.post<string>('/Properties', body)
  return data
}

export async function updateProperty(id: string, body: UpdatePropertyDTO) {
  await api.put(`/Properties/${id}`, body)
}

export async function deleteProperty(id: string) {
  await api.delete(`/Properties/${id}`)
}
