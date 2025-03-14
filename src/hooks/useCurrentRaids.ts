import { useQuery } from '@tanstack/react-query'
import { getCurrentRaids } from '../api/current'

export function useCurrentRaids() {
  return useQuery({
    queryKey: ['currentRaids'],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: getCurrentRaids,
  })
}
