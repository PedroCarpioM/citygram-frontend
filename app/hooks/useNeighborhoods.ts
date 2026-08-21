import { useQuery } from '@tanstack/react-query'

import { getNeighborhoods } from '~/services/neighborhoods'

export function useNeighborhoods() {
  return useQuery({
    queryKey: ['neighborhoods'],
    queryFn: getNeighborhoods,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}
