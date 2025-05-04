import { useQuery } from '@tanstack/react-query'

export interface ITypeInfo {
  damage_relations: IDamageRelations
  name: string
}

interface IInfo {
  name: string
  url: string
}

interface IDamageRelations {
  double_damage_from: IInfo[]
  double_damage_to: IInfo[]
  half_damage_from: IInfo[]
  half_damage_to: IInfo[]
  no_damage_from: IInfo[]
  no_damage_to: IInfo[]
}

async function fetchTypesData(types: string[]): Promise<ITypeInfo[]> {
  const promises = types.map(type => fetch(`https://pokeapi.co/api/v2/type/${type}`))

  const results = await Promise.all(promises)

  const data = await Promise.all(results.map(res => res.json()))

  const mappedData = data.map(typeData => ({
    name: typeData.name,
    damage_relations: {
      double_damage_from: typeData.damage_relations.double_damage_from,
      double_damage_to: typeData.damage_relations.double_damage_to,
      half_damage_from: typeData.damage_relations.half_damage_from,
      half_damage_to: typeData.damage_relations.half_damage_to,
      no_damage_from: typeData.damage_relations.no_damage_from,
      no_damage_to: typeData.damage_relations.no_damage_to
    }
  }))

  console.log(mappedData)

  return mappedData
}

export function useTypesData(types: string[]) {
  return useQuery<ITypeInfo[]>({
    queryKey: [`poke-type-${types.join('-')}`],
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: !!types,
    queryFn: async () => {
      return fetchTypesData(types)
    },
  })
}
