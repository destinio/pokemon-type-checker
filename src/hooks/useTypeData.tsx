import { getTypes } from '@/api/types'
import { mergeTypeRelationships } from '@/utils/mergeTypeRelationships'
import { useQuery } from '@tanstack/react-query'

export interface ITypeInfo {
  damage_relations: IDamageRelations
  name: string
}

export interface IInfo {
  name: string
  url: string
}

export interface IDamageRelations {
  double_damage_from: IInfo[]
  double_damage_to: IInfo[]
  half_damage_from: IInfo[]
  half_damage_to: IInfo[]
  no_damage_from: IInfo[]
  no_damage_to: IInfo[]
}

export type IDamageRelationsSimplified = {
  [K in keyof IDamageRelations]: string[]
}

export interface ICompiledDamageRelations extends IDamageRelations {
  quadruple_damage_from: string[]
  quadruple_damage_to: string[]
  quarter_damage_from: string[]
  quarter_damage_to: string[]
  neutral_damage_from?: string[]  // optional
  neutral_damage_to?: string[]    // optional
}


export type IDamageRelationKey = keyof IDamageRelations

export function useTypeData(types: string[] | null) {
  return useQuery<{ raw: ITypeInfo[], relationships: any[] }>({
    queryKey: [`poke-type-${types?.sort().join('-')}`],
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: !!types && types.length > 0,
    queryFn: async () => {
      const raw = await getTypes(types as string[])

      mergeTypeRelationships(raw)

      return {
        raw,
        relationships: [],
      }
    },
  })
}