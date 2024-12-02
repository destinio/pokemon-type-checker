import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { EvChainFull, renderEvChain } from '../../utils/renderEvChain'
import { PokemonFull } from './pokemon'

export default function PokemonInfo() {
  const { id } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['pokemon', id],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const done = (await response.json()) as PokemonFull

      const speciesResponse = await fetch(done.species.url)
      const species = await speciesResponse.json()

      const evChainUrl = species.evolution_chain.url

      const evChainResponse = await fetch(evChainUrl)
      const evChain = (await evChainResponse.json()) as EvChainFull

      const returnData = {
        ...done,
        evChain,
      }

      return returnData
    },
  })

  if (isLoading || isFetching) {
    return <div className='max-w-lg m-auto p-4'>Loading...</div>
  }

  if (!data) {
    return <div className='max-w-lg m-auto p-4'>No Data!</div>
  }

  const { species, chains } = renderEvChain(data.evChain.chain)

  return (
    <div className='max-w-lg m-auto p-4 flex flex-col gap-8'>
      <header className=''>
        <div
          style={{
            backgroundImage: `url('${data.sprites.other.home.front_default}')`,
          }}
          className='bg-right-top'
        >
          <h1 className='text-3xl font-bold mb-2'>{data.name}</h1>
          <div>Species: {species}</div>
        </div>
        {/* <img
            src={data.sprites.other.dream_world.front_default}
            alt={data.name}
          /> */}
      </header>

      <section className=''>
        <h2 className='text-2xl mb-4'>Types</h2>
        <ul>
          {data.types.map((t, i) => (
            <li key={`${t.type.name}-${i}`}>{t.type.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className='text-2xl mb-4'>Evelution Chain(s)</h2>
        <div>
          <h4>Evelotion Chains:</h4>
          <div>
            {chains.map((chain, i) => (
              <div key={i}>{chain}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
