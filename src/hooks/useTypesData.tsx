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

export function useTypesData(types: string[] | null) {
  return useQuery<ITypeInfo[]>({
    queryKey: [`poke-type-${types?.join('-')}`],
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    queryFn: async () => {
      if (!types) {
        return Promise.reject('Types is null')
      }
      const typePromises = types.map(type => {
        return fetch(`https://pokeapi.co/api/v2/type/${type}`).then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok')
          }
          return res.json() as Promise<ITypeInfo>
        })
      })

      return Promise.all<ITypeInfo>(typePromises).then(data => {
        console.log('data', data)
        return data.map(d => d)
      })
    },
  })
}

// return fetch(`https://pokeapi.co/api/v2/type/${type}`).then(res => {
//   if (!res.ok) {
//     throw new Error('Network response was not ok')
//   }
//   return res.json()
// })
