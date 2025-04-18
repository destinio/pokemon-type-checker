import { TPokemonType } from './components/TypeIcon'
import { ITypeInfo } from './hooks/useTypeData'

export interface IPokemon {
  id: number
  name: string
  image: string
  height: number
  weight: number
  types: string[]
}

export interface IRank {
  rank: number
  pokemon: string
  fast: string
  charged: string
  dps: string
  tdo: string
  er: string
  cp: string
}

export interface IMove {
  name: string
  id: number
  typeName: string
  pp: number
  power: number
}

export interface IMoveWithTypes extends IMove {
  type: TPokemonType
}

export interface ICurrentRaid {
  tier: string
  bosses: IRaidBoss[]
}

export interface IRaidBoss {
  name: string
  mainCP: string
  boostedCP: string
  weather: string[]
}
