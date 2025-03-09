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
