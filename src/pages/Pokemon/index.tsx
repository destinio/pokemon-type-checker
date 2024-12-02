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

      const returnData = {
        ...done,
        evChain,
      }

      console.log(evChain)

      return returnData
    },
  })

  if (isLoading || isFetching) {
    return <div className='max-w-lg m-auto p-4'>Loading...</div>
  }

  if (!data) {
    return <div className='max-w-lg m-auto p-4'>No Data!</div>
  }

  return (
    <div className='max-w-lg m-auto p-4'>
      <h1 className='text-2xl font-bold'>{data.name}</h1>
      <img src={data.sprites.other.dream_world.front_default} alt={data.name} />
      <div>
        <h2>Types</h2>
        <ul>
          {data.types.map((t, i) => (
            <li key={`${t.type.name}-${i}`}>{t.type.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Ev Chain</h2>
        <div>
          {data.evChain.chain.species.name} {'>'}
          {data.evChain.chain.evolves_to.map(e => {
            const chain = e.species.name

            return <span key={e.species.name}>{`${chain} >`}</span>
          })}
        </div>
      </div>
    </div>
  )
}
