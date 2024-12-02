import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router'
import { EvChainFull, renderEvChain } from '../../utils/renderEvChain'
import { PokemonFull } from './pokemon'
import { getTypeByName } from '../../components/TypeIcon'

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

  const types = data.types.map(t => {
    return getTypeByName(t.type.name)
  })

  return (
    <div className='max-w-lg m-auto p-4 flex flex-col gap-8'>
      <header
        style={{
          backgroundImage: `url('${data.sprites.other.home.front_default}')`,
          color: types[0].color,
        }}
        className='bg-right bg-[length:200px] bg-no-repeat h-36 border-b-2 border-b-slate-700'
      >
        <h1 className='text-3xl font-bold mb-2'>{data.name}</h1>
        <div className='mb-4'>Species: {species}</div>
        <ul className='flex gap-2'>
          {types.map((type, i) => (
            <li
              key={i}
              style={{ color: type.color }}
              className='flex gap-2 items-center text-2xl'
            >
              {type.icon}
            </li>
          ))}
        </ul>
      </header>

      <section>
        <h2 className='text-2xl mb-4'>Evelution Chain(s)</h2>
        <div>
          <h4>Evelotion Chains:</h4>
          <div>
            {chains.map((chain, i) => (
              <div key={i} className='flex gap-2'>
                {chain.map((name, i) => (
                  <div>
                    <Link
                      to={`/pokemon/${name}`}
                      key={i}
                      className='hover:text-orange-400'
                    >
                      {name}
                    </Link>
                    <span>{i < chain.length - 1 ? ' >' : ''}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
