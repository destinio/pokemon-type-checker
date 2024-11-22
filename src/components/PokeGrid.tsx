import { useQuery } from '@tanstack/react-query'

export default function PokeGrid() {
  const { data } = useQuery({
    queryKey: ['pokemons'],
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    queryFn: async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')

      const { results } = await res.json()

      if (!results) {
        throw new Error('No results')
      }

      return results
    },
  })

  return <div className='max-w-lg m-auto p-4'></div>
}
