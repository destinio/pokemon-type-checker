import { pokemonTypesIcons, TPokemonType } from '../components/TypeIcon'

export const getTypeByName = (name: string): TPokemonType => {
  return pokemonTypesIcons.find(t => t.type === name) || pokemonTypesIcons[0]
}
