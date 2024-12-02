export interface EvChainFull {
  chain: Chain
}

export interface Chain {
  evolution_details: EvolutionDetail[]
  evolves_to: EvolvesTo[]
  is_baby: boolean
  species: NameUrl
}

export interface EvolvesTo {
  evolution_details: EvolutionDetail[]
  evolves_to: EvolvesTo[]
  is_baby: boolean
  species: NameUrl
}

export interface EvolutionDetail {
  gender: any
  held_item: any
  item?: NameUrl
  known_move: any
  known_move_type?: NameUrl
  location?: NameUrl
  min_affection?: number
  min_beauty: any
  min_happiness?: number
  min_level: any
  needs_overworld_rain: boolean
  party_species: any
  party_type: any
  relative_physical_stats: any
  time_of_day: string
  trade_species: any
  trigger: NameUrl
  turn_upside_down: boolean
}

export interface NameUrl {
  name: string
  url: string
}

export function renderEvChain(chain: Chain) {
  const baseName = chain.species.name

  const chains = [] as string[][]

  function traverse(chain: Chain, path: string[]) {
    if (chain.evolves_to.length === 0) {
      chains.push(path)
      return
    }

    chain.evolves_to.forEach(e => {
      traverse(e, [...path, e.species.name])
    })
  }

  traverse(chain, [baseName])

  return {
    species: baseName,
    chains,
  }
}
