import { useQuery } from '@tanstack/react-query'
import { getMoves } from '../api/moves'
import { IMoveWithTypes } from '../types'

export function useMoves({ fast, charged }: { fast: string; charged: string }) {
  return useQuery<IMoveWithTypes[]>({
    queryKey: ['moves', fast, charged],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: () => getMoves({ fast, charged }),
  })
}
