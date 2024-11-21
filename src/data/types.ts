export const pokemonTypes = [
  {
    type: 'normal',
    color: '#AAAA99',
  },
  {
    type: 'fighting',
    color: '#BB5544',
  },
  {
    type: 'flying',
    color: '#8899FF',
  },
  {
    type: 'poison',
    color: '#AA5599',
  },
  {
    type: 'ground',
    color: '#DDBB54',
  },
  {
    type: 'rock',
    color: '#BBAA66',
  },
  {
    type: 'bug',
    color: '#AABB22',
  },
  {
    type: 'ghost',
    color: '#6666BB',
  },
  {
    type: 'steel',
    color: '#AAAABB',
  },
  {
    type: 'fire',
    color: '#FF4522',
  },
  {
    type: 'water',
    color: '#3399FF',
  },
  {
    type: 'grass',
    color: '#77CC55',
  },
  {
    type: 'electric',
    color: '#FFCC33',
  },
  {
    type: 'psychic',
    color: '#FF5599',
  },
  {
    type: 'ice',
    color: '#66CCFF',
  },
  {
    type: 'dragon',
    color: '#7766EE',
  },
  {
    type: 'dark',
    color: '#775543',
  },
  {
    type: 'fairy',
    color: '#EE99EE',
  },
]

export function getTypeInfo(type: string) {
  return pokemonTypes.find(t => t.type === type)
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
