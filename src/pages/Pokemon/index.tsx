import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { PokemonFull } from './pokemon'

export default function PokemonInfo() {
  const { id } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['pokemon', id],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const done = await response.json()

      const speciesResponse = await fetch(done.species.url)
      const species = await speciesResponse.json()

      const evChainUrl = species.evolution_chain.url

      const evChainResponse = await fetch(evChainUrl)
      const evChain = await evChainResponse.json()

      console.log(evChain)

      return done as PokemonFull
    },
  })

  if (isLoading || isFetching) {
    return <div className='max-w-lg m-auto p-4'>Loading...</div>
  }

  if (!data) {
    return <div className='max-w-lg m-auto p-4'>No Data!</div>
  }

  console.log(data)

  return (
    <div className='max-w-lg m-auto p-4'>
      <h1 className='text-2xl font-bold'>{data.name}</h1>
      <img src={data.sprites.other.dream_world.front_default} alt={data.name} />
    </div>
  )
}
