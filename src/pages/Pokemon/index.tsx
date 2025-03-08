import { Link, useParams } from 'react-router'
import { renderEvChain } from '../../utils/renderEvChain'
import { getTypeByName } from '../../utils/pokemonTypes'
import { convertInfoHeader } from '../../data/types'
import { usePokemonById } from '../../hooks/usePokemon'

export default function PokemonInfo() {
  const { id } = useParams()

  const { data, isLoading, isFetching } = usePokemonById(id)

  if (isLoading || isFetching) {
    return <div className="max-w-lg m-auto p-4">Loading...</div>
  }

  if (!data) {
    return <div className="max-w-lg m-auto p-4">No Data!</div>
  }

  const { species, chains } = renderEvChain(data.evChain.chain)

  return (
    <div className="max-w-lg m-auto p-4 flex flex-col gap-8">
      <header
        style={{
          backgroundImage: `url('${data.sprites.other.home.front_default}')`,
          color: getTypeByName(data.typesData[0].name).color,
        }}
        className="bg-right bg-[length:200px] bg-no-repeat h-44 border-b-2 border-b-slate-700"
      >
        <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
        <div className="mb-6">
          <p>Species:</p>
          <p>{species}</p>
        </div>
        <ul className="flex gap-2 mb-4">
          {data.typesData.map((type, i) => {
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
      </header>

      <section>
        <h2 className="text-2xl mb-4 font-extrabold">Evelution Chain(s)</h2>
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

      <section>
        <h2 className="text-2xl mb-4 font-extrabold">Type Details:</h2>
        <div className="flex flex-col gap-4">
          {data.typesData.map((type, i) => {
            const { type: name, color, icon } = getTypeByName(type.name)
            return (
              <div key={`${type.name}-${i}`} className="">
                <h3
                  style={{ color, borderColor: color }}
                  className="text-2xl font-bold mb-4 flex gap-2 items-center border-b-2 pb-4"
                >
                  {icon} {name}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(type.damage_relations).map(
                    ([name, value], i) => {
                      return (
                        <div key={`${name}-${i}`}>
                          <div className="mb-2">{convertInfoHeader(name)}</div>
                          {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
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
      </section>
      <section>
        <h2 className="text-2xl mb-4 font-extrabold">Links:</h2>
        <div className="flex flex-col gap-4">
          <a href={`https://pogo.gamepress.gg/pokemon/${data.id}`} target='_blank'>gamepress</a>
        </div>
      </section>
    </div>
  )
}