import { useQuery } from '@tanstack/react-query'

import { getPublicListings } from '~/services/listings'

export function usePublicListings() {
  return useQuery({
    queryKey: ['listings', 'public'],
    queryFn: getPublicListings,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}
