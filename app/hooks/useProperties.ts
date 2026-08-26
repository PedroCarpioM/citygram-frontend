import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createProperty,
  deleteProperty,
  getProperties,
  getProperty,
  updateProperty,
} from '~/services/properties'
import type { CreatePropertyDTO, UpdatePropertyDTO } from '~/types/property'

export function useProperties() {
  return useQuery({
    queryKey: ['properties'],
    queryFn: getProperties,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ['properties', id],
    queryFn: () => getProperty(id),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

export function useCreateProperty() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: CreatePropertyDTO) => createProperty(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['properties'] }),
  })
}

export function useUpdateProperty() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdatePropertyDTO }) => updateProperty(id, body),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] })
      queryClient.invalidateQueries({ queryKey: ['properties', id] })
    },
  })
}

export function useDeleteProperty() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteProperty(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] })
      queryClient.invalidateQueries({ queryKey: ['properties', id] })
    },
  })
}
