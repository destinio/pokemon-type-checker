import { Link, useParams } from 'react-router'
import { renderEvChain } from '../../utils/renderEvChain'
import { getTypeByName } from '../../utils/pokemonTypes'
import { convertInfoHeader } from '../../data/types'
import { usePokemonById } from '../../hooks/usePokemon'
import { useRanks } from '../../hooks/useRanks'
import Section from '../../components/Section'
import Moves from '../../components/Moves'
import { FaFastForward } from 'react-icons/fa'
import { RiBattery2ChargeFill } from 'react-icons/ri'
import SiteLinks from '../../components/SiteLinks'

export default function PokemonInfo() {
  const { id } = useParams()

  const { data: pokemon, isLoading, isFetching } = usePokemonById(id)
  const { data: ranks } = useRanks()

  if (isLoading || isFetching) {
    return <div className="max-w-lg m-auto p-4">Loading...</div>
  }

  if (!pokemon) {
    return <div className="max-w-lg m-auto p-4">No Data!</div>
  }

  const { species, chains } = renderEvChain(pokemon.evChain.chain)

  const rankings = ranks
    ? ranks.filter(p =>
        p.pokemon.toLowerCase().includes(pokemon.name.toLowerCase())
      )
    : []

  return (
    <div className="pb-16 pt-8 flex flex-col gap-8">
      <header
        style={{
          backgroundImage: `url('${pokemon.sprites.other.home.front_default}')`,
          color: getTypeByName(pokemon.typesData[0].name).color,
        }}
        className="bg-right bg-[length:200px] bg-no-repeat pb-6 border-b-2 border-b-slate-700"
      >
        <h1 className="text-4xl font-bold mb-2">{pokemon.name}</h1>
        <div className="mb-6">
          <h3 className="text-xl font-bold">
            <p>Species:</p> <p>{species}</p>
          </h3>
        </div>
        <ul className="flex gap-2 mb-4">
          {pokemon.typesData.map((type, i) => {
            const typeData = getTypeByName(type.name)
            return (
              <li
                key={i}
                style={{ color: typeData.color }}
                className="flex gap-2 items-center text-2xl hover:scale-110 focus:scale-110"
              >
                <Link to={`/typecheck/${type.name}`}>{typeData.icon}</Link>
              </li>
            )
          })}
        </ul>
        <div>
          <h3 className="text-xl font-bold">Go Rank:</h3>
          {ranks ? (
            <pre>
              {
                ranks.filter(p =>
                  p.pokemon.toLowerCase().includes(pokemon.name.toLowerCase())
                )[0].rank
              }
            </pre>
          ) : null}
        </div>
      </header>

      <section>
        <h3 className="text-2xl mb-4 font-extrabold">Evelution Chain(s)</h3>
        <div>
          {chains.map((chain, i) => (
            <div key={i} className="flex gap-2">
              {chain.map((name, i) => (
                <div key={`${name}-${i}`}>
                  <Link
                    to={`/pokemon/${name}`}
                    key={i}
                    className="hover:text-orange-400"
                  >
                    {name}
                  </Link>
                  <span>{i < chain.length - 1 ? ' >' : ''}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <Section title="Type Detials">
        <div className="flex flex-col gap-4">
          {pokemon.typesData.map((type, i) => {
            const { type: name, color, icon } = getTypeByName(type.name)
            return (
              <div key={`${type.name}-${i}`} className="">
                <h4
                  style={{ color, borderColor: color }}
                  className="text-2xl font-bold mb-4 flex gap-2 items-center border-b-2 pb-4"
                >
                  {icon} {name}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(type.damage_relations).map(
                    ([name, value], i) => {
                      return (
                        <div key={`${name}-${i}`}>
                          <div className="mb-2">{convertInfoHeader(name)}</div>
                          <div className="flex flex-wrap w-2/3 gap-1 gap-y-3 text-2xl">
                            {value.map((v: { name: string }, i: number) => {
                              const { icon, color, type } = getTypeByName(
                                v.name
                              )
                              return (
                                <Link
                                  to={`/typecheck/${type}`}
                                  key={`${name}-${i}`}
                                  style={{ color }}
                                >
                                  {icon}
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      )
                    }
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Section>
      <Section title="Other Info">
        {/* rankings */}
        {rankings.filter(p => p.rank <= 50).length > 0 ? (
          <div>
            <h3 className="text-xl mb-4 font-extrabold flex items-center justify-between">
              <span>Go Rankings</span>
              <div className="flex gap-2">
                <FaFastForward className="inline-block " />{' '}
                <RiBattery2ChargeFill className="inline-block" />{' '}
              </div>
            </h3>
            <div className="flex flex-col gap-4">
              {rankings
                .filter(p => p?.rank <= 50)
                .map((rank, i) => (
                  <div key={i} className="flex gap-2 justify-between">
                    <div className="flex gap-2">
                      <div>{rank.rank}</div>
                      <div>{rank.pokemon}</div>
                    </div>
                    {/* Moves */}
                    {rankings ? <Moves rank={rank} /> : null}
                  </div>
                ))
                .slice(0, 5)}
            </div>
          </div>
        ) : null}
        {/* links */}
        <div>
          <SiteLinks pokemon={{ id: pokemon.id, name: pokemon.name }} />
        </div>
      </Section>
    </div>
  )
}
