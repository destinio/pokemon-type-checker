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
  fastMove: string
  chargedMove: string
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
