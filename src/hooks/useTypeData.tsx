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

export function useTypeData(type: string | null) {
  return useQuery<ITypeInfo>({
    queryKey: [`poke-type-${type}`],
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: !!type,
    queryFn: async () => {
      return fetch(`https://pokeapi.co/api/v2/type/${type}`).then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
    },
  })
}
