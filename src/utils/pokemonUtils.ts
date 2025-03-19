import { pokemonTypesIcons, TPokemonType } from '@/components/TypeIcon'

export const getTypeByName = (name: string): TPokemonType => {
  return pokemonTypesIcons.find(t => t.type === name) || pokemonTypesIcons[0]
}

const regions = {
  '1-151': 'kanto',
  '152-251': 'johto',
  '252-386': 'hoenn',
  '387-493': 'sinnoh',
  '494-649': 'unova',
  '650-721': 'kalos',
  '722-809': 'alola',
  '810-905': 'galar',
  '906-1010': 'paldea',
}

export function getPokemonRegion(dexNumber: number | string) {
  if (typeof dexNumber === 'string') {
    dexNumber = parseInt(dexNumber)
  }

  for (const range in regions) {
    const [min, max] = range.split('-').map(Number)
    if (dexNumber >= min && dexNumber <= max) {
      const regionKey = range as keyof typeof regions
      return regions[regionKey]
    }
  }
  return 'Unknown'
}
