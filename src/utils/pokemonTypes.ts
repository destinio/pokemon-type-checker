import { pokemonTypesIcons } from '../components/TypeIcon'

export const getTypeByName = (name: string) => {
  return pokemonTypesIcons.find(t => t.type === name) || pokemonTypesIcons[0]
}
