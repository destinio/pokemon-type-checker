import { pokemonTypesIcons } from '../components/TypeIconOld'

export const getTypeByName = (name: string) => {
  return pokemonTypesIcons.find(t => t.type === name) || pokemonTypesIcons[0]
}
