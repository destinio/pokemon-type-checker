import { useQuery } from '@tanstack/react-query'

export default function Search() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['pokemons'],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=1050',
      )
      const { results } = await response.json()

      return results
    },
  })

  console.log(isLoading, isFetching, data)

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>No Data!</div>
  }

  return (
    <div className='max-w-lg m-auto p-4'>
      <form action=''>
        <input
          type='text'
          className='w-full p-2 border border-gray-300 rounded'
          placeholder='Search for a Pokemon'
        />
      </form>
    </div>
  )
}
