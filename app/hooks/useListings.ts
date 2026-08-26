import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createListing,
  deleteListing,
  getOwnerListing,
  getOwnerListings,
  getPublicListings,
  updateListing,
} from '~/services/listings'
import type { CreateListingDTO, UpdateListingDTO } from '~/types/listing'

export function usePublicListings() {
  return useQuery({
    queryKey: ['listings', 'public'],
    queryFn: getPublicListings,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

export function useOwnerListings() {
  return useQuery({
    queryKey: ['listings', 'owner'],
    queryFn: getOwnerListings,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

export function useOwnerListing(id: string) {
  return useQuery({
    queryKey: ['listings', 'owner', id],
    queryFn: () => getOwnerListing(id),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

export function useCreateListing() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ body, publishAt }: { body: CreateListingDTO; publishAt?: boolean }) =>
      createListing(body, publishAt),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['listings', 'owner'] }),
  })
}

export function useUpdateListing() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateListingDTO }) => updateListing(id, body),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['listings', 'owner'] })
      queryClient.invalidateQueries({ queryKey: ['listings', 'owner', id] })
    },
  })
}

export function useDeleteListing() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteListing(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['listings', 'owner'] })
      queryClient.invalidateQueries({ queryKey: ['listings', 'owner', id] })
    },
  })
}
