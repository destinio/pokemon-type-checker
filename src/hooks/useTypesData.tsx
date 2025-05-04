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

interface IDamageRelationsExtended extends IDamageRelations {
  quadruple_damage_from: IInfo[]  // 4×
  quarter_damage_from: IInfo[]    // 0.25×
}

function combineTypesData(types: ITypeInfo[]): IDamageRelations {
  const combined: IDamageRelations = {
    double_damage_from: [],
    double_damage_to: [],
    half_damage_from: [],
    half_damage_to: [],
    no_damage_from: [],
    no_damage_to: [],
  };

  for (const type of types) {
    for (const key of Object.keys(combined) as (keyof IDamageRelations)[]) {
      combined[key].push(...type.damage_relations[key]);
    }
  }

  // Remove duplicates by name
  for (const key of Object.keys(combined) as (keyof IDamageRelations)[]) {
    const seen = new Set();
    combined[key] = combined[key].filter(({ name }) => {
      if (seen.has(name)) return false;
      seen.add(name);
      return true;
    });
  }

  return combined;
}

async function fetchTypesData(types: string[]): Promise<[IDamageRelations, ITypeInfo[]]> {
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
  const combined = combineTypesData(mappedData)

  return [combined, mappedData]
}

export function useTypesData(types: string[]) {
  return useQuery<[IDamageRelations, ITypeInfo[]]>({
    queryKey: [`poke-type-${types.sort((a, b) => a.localeCompare(b)).join('-')}`],
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: !!types,
    queryFn: async () => {
      if (types.length === 0) {
        return [{
          double_damage_from: [],
          double_damage_to: [],
          half_damage_from: [],
          half_damage_to: [],
          no_damage_from: [],
          no_damage_to: []
        }, []]
      }

      const result = await fetchTypesData(types);

      return result;
      
    }
  })
}
