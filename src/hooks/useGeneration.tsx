import { useQuery } from '@tanstack/react-query'

const BASE_URL = 'https://pokeapi.co/api/v2/generation'

export function useGeneration(id: number) {
  const queryKey = `generations-${id}`
  const queryUrl = BASE_URL + `/${id}`

  return useQuery({
    queryKey: [queryKey],
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    queryFn: async () => {
      if (id === 0) {
        return null
      }

      return fetch(queryUrl).then(res => {
        if (!res.ok) {
          return null
        }
        return res.json()
      })
    },
  })
}
