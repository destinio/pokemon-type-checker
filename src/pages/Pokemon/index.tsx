import { Link, useNavigate, useParams } from 'react-router'
import { IoSparkles, IoSparklesOutline } from 'react-icons/io5'
import { PiDnaFill } from "react-icons/pi";
import { clsx } from 'clsx';

import Loader from '@/components/Loader'
import Moves from '@/components/Moves'
import Section from '@/components/Section'
import SiteLinks from '@/components/SiteLinks'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6'
import { FaFastForward } from 'react-icons/fa'
import { RiBattery2ChargeFill } from 'react-icons/ri'
import { convertInfoHeader } from '@/data/types'
import { renderEvChain } from '@/utils/renderEvChain'
import { usePokemonById } from '@/hooks/usePokemon'
import { useRanks } from '@/hooks/useRanks'
import { useState } from 'react'
import { getTypeByName } from '@/utils/pokemonUtils'

type TPokemonForms = 'normal' | 'mega' | 'shiny'

export default function PokemonInfo() {
  const { id } = useParams()
  const nav = useNavigate()

  const [imageType, setImageType] = useState<TPokemonForms>('normal')

  const { data: pokemon, isLoading, isFetching } = usePokemonById(id)
  const { data: ranks } = useRanks()

  if (isLoading || isFetching) {
    return <Loader />
  }

  if (!pokemon) {
    return <div className="max-w-lg m-auto p-4">No Data!</div>
  }

  const { species, chains } = renderEvChain(pokemon.evChain.chain)

  const rankings = ranks
    ? ranks.filter(p =>
        p.pokemon
          .toLowerCase()
          .includes(pokemon.name.toLowerCase().replace(/-/g, ' '))
      )
    : []

  function handleChangePokemon(id: number) {
    nav(`/pokemon/${id}`)
  }

  const imagesDict = {
    normal: pokemon.sprites.other.home.front_default,
    shiny: pokemon.sprites.other.home.front_shiny,
    mega: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pokemon.id}-Mega.png`,
  }

  return (
    <div className="pb-16 pt-8 flex flex-col gap-8">
      <header
        style={{
          // TODO: pre load shiny image
          backgroundImage: `url(${imagesDict[imageType]})`,
          backgroundPosition: 'bottom 2rem right 1rem',
          color: getTypeByName(pokemon.typesData[0].name).color,
        }}
        className="bg-[length:200px] bg-no-repeat pb-2 border-b-2 border-b-slate-700"
      >
        <div className="w-100 flex justify-between items-center align-middle gap-2 mb-6">
          <div
            onClick={() => handleChangePokemon(pokemon.id - 1)}
            className="flex gap-1 items-center text-white cursor-pointer"
          >
            <FaAngleLeft className="text-2xl" />
            <span>{pokemon.id - 1}</span>
          </div>
          {/* Name */}
          <h1 className="text-4xl font-bold mb-2">
            {pokemon.name
              .replace(/\-/g, ' ')
              .replace(/\b\w/g, char => char.toUpperCase())}
          </h1>
          <div
            onClick={() => handleChangePokemon(pokemon.id + 1)}
            className="flex gap-1 items-center text-white cursor-pointer"
          >
            <span>{pokemon.id + 1}</span>
            <FaAngleRight className="text-2xl" />
          </div>
        </div>
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
          {rankings && rankings?.length > 0 ? (
            <div>
              <h3 className="text-xl font-bold">Go Rank:</h3>
              <pre>{rankings[0].rank}</pre>
            </div>
          ) : null}
        </div>
        <div className="flex justify-end pt-8 text-2xl">
          <button
            className={clsx({ 'text-yellow-300': imageType === 'shiny' })}
            onClick={() => setImageType(imageType === 'shiny' ? 'normal' : 'shiny')}
          >
            {imageType === 'shiny' ? <IoSparkles /> : <IoSparklesOutline />}
          </button>
          <button
            className={clsx({ 'text-yellow-300': imageType === 'mega' })}
            onClick={() => setImageType(imageType === 'mega' ? 'normal' : 'mega')}
          >
            <PiDnaFill />
          </button>
        </div>
      </header>

      <section>
        <h3 className="text-2xl mb-4 font-extrabold">Evolution Chain(s)</h3>
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

      <Section title="Type Details">
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
        {rankings.length > 0 ? (
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
                .map((rank, i) => {
                  const [_, pForm] = rank.pokemon.split(' ').reverse()

                  return (
                    <div key={i} className="flex gap-2 justify-between">
                      <a
                        href={`https://db.pokemongohub.net/pokemon/${pokemon.id}${pForm ? `-${pForm}` : ''}`}
                        className="flex gap-2"
                      >
                        <div>{rank.rank}</div>
                        <div>{rank.pokemon}</div>
                      </a>
                      {/* Moves */}
                      {rankings ? <Moves rank={rank} /> : null}
                    </div>
                  )
                })
                .slice(0, 3)}
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
