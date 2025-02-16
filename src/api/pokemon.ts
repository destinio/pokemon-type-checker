import { IPokemon } from '../types'

export async function getAllPokemon() {
  const response = await fetch('/data/pokemon.json')

  if (response.ok) {
    const data = (await response.json()) as IPokemon[]

    const newData = data.map(p => {
      return {
        ...p,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`,
      }
    })

    return newData
  }
}
