import { useQuery } from '@tanstack/react-query'
import { INameUrl } from '../context/AppProvider'

const BASE_URL = 'https://pokeapi.co/api/v2/generation'

export function useGenerations() {
  const queryKey = 'generations'
  const queryUrl = BASE_URL

  const query = useQuery<{ results: INameUrl[] }>({
    queryKey: [queryKey],
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    queryFn: async () => {
      return fetch(queryUrl).then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
    },
  })

  const generations = query.data?.results.map((gen: INameUrl) => {
    return {
      id: Number(gen.url.split('/').filter(Boolean).pop()),
      url: gen.url,
      name: gen.name,
    }
  })

  const returnValue = {
    query,
    generations,
    isLoading: query.isLoading || query.isFetching,
    isError: query.isError,
    error: query.error,
  }

  return returnValue
}
