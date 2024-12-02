import { pokemonTypesIcons } from '../components/TypeIcon'

export function getTypeInfo(type: string) {
  return pokemonTypesIcons.find(t => t.type === type)
}

export interface Info {
  name: string
  url: string
}

export interface TypeRelations {
  double_damage_from: Info[]
  double_damage_to: Info[]
  half_damage_from: Info[]
  half_damage_to: Info[]
  no_damage_from: Info[]
  no_damage_to: Info[]
}

export async function getTypeApiData(type: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
  const data = await res.json()
  return data['damage_relations'] as TypeRelations
}

export function convertInfoHeader(title: string) {
  let header

  switch (title) {
    case 'double_damage_from':
      header = 'Weak to (2x)'
      break
    case 'double_damage_to':
      header = 'Strong against (2x)'
      break
    case 'half_damage_from':
      header = 'Resistant to (.5x)'
      break
    case 'half_damage_to':
      header = 'Weak against (.5x)'
      break
    case 'no_damage_from':
      header = 'Immune to (0x)'
      break
    case 'no_damage_to':
      header = 'No effect on (0x)'
      break
    default:
      header = title
      break
  }

  return header
}
