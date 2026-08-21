import { useQuery } from '@tanstack/react-query'

import { getCities } from '~/services/cities'

export function useCities() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: getCities,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}
