import { ITypeInfo } from '../hooks/useTypeData'
import { PokemonFull } from '../pages/Pokemon/pokemon'
import { IPokemon } from '../types'
import { EvChainFull } from '../utils/renderEvChain'

export async function getAllPokemon() {
  const response = await fetch('/data/pokemon.json')

  if (response.ok) {
    const data = (await response.json()) as IPokemon[]

    const newData = data.map(p => {
      return {
        ...p,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`,
      }
    }) as IPokemon[]

    return newData
  }

  return []
}

export async function getPokemonById(id: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const done = (await response.json()) as PokemonFull

  const speciesResponse = await fetch(done.species.url)
  const species = await speciesResponse.json()

  const evChainUrl = species.evolution_chain.url

  const evChainResponse = await fetch(evChainUrl)
  const evChain = (await evChainResponse.json()) as EvChainFull

  const typesData = [] as ITypeInfo[]

  for (const type of done.types) {
    const typeResponse = await fetch(type.type.url)
    const typeData = await typeResponse.json()
    typesData.push(typeData)
  }

  const returnData = {
    ...done,
    evChain,
    typesData,
  }

  return returnData
}