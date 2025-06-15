import { ICompiledDamageRelations, IDamageRelations, IDamageRelationsSimplified, ITypeInfo } from "@/hooks/useTypeData";

const damageRelationKeys = [
  'double_damage_from',
  'double_damage_to',
  'half_damage_from',
  'half_damage_to',
  'no_damage_from',
  'no_damage_to',
  'quadruple_damage_from',
  'quadruple_damage_to',
  'quarter_damage_from',
  'quarter_damage_to'
] as const;

function normalizeDamageRelations(input: Record<string, string[]>) {
  const result = {
    quadruple_damage_to: [],
    quadruple_damage_from: [],
    double_damage_to: [],
    double_damage_from: [],
    no_damage_to: [],
    no_damage_from: [],
    half_damage_to: [],
    half_damage_from: [],
    quarter_damage_to: [],
    quarter_damage_from: [],
  } as ICompiledDamageRelations;

  for (const key of [
    "double_damage_from",
    "double_damage_to",
    "half_damage_from",
    "half_damage_to",
  ]) {
    const counts: Record<string, number> = {};
    for (const type of input[key] || []) {
      counts[type] = (counts[type] || 0) + 1;
    }

    for (const [type, count] of Object.entries(counts)) {
      if (count === 2) {
        if (key.startsWith("double")) {
          const resultKey = `quadruple_${key.slice(7)}` as keyof typeof result;
          result[resultKey].push(type);
        } else if (key.startsWith("half")) {
          const resultKey = `quarter_${key.slice(4)}` as keyof typeof result;
          result[resultKey].push(type);
        }
      } else {
        const resultKey = key as keyof typeof result;
        result[resultKey].push(type);
      }
    }
  }

  // no_damage is not doubled, just copy over
  result.no_damage_from = (input.no_damage_from || []) as string[];
  result.no_damage_to = (input.no_damage_to || []) as string[];

  return result;
}

function flattenWithDuplicates(types: IDamageRelationsSimplified[]) {
  const result = {
    double_damage_from: [],
    double_damage_to: [],
    half_damage_from: [],
    half_damage_to: [],
    no_damage_from: [],
    no_damage_to: [],
  } as Record<keyof IDamageRelationsSimplified, string[]>;

  types.forEach(type => {
    const typeObj = Object.entries(type) as [keyof IDamageRelationsSimplified, string[]][];

    typeObj.forEach(([key, values]) => {
      if (result[key]) {
        result[key].push(...values);
      } else {
        console.warn(`Unknown key: ${key}`);
      }
    });
  });

  return result;
}

function compileDamageRelations(data: IDamageRelationsSimplified[]) {
  const flat = flattenWithDuplicates(data);
  const normalized = normalizeDamageRelations(flat);

  return normalized;
}


function simplifyTypeEffectiveness(data: IDamageRelations) {
  const result = {
    double_damage_from: data.double_damage_from.map(info => info.name),
    double_damage_to: data.double_damage_to.map(info => info.name),
    half_damage_from: data.half_damage_from.map(info => info.name),
    half_damage_to: data.half_damage_to.map(info => info.name),
    no_damage_from: data.no_damage_from.map(info => info.name),
    no_damage_to: data.no_damage_to.map(info => info.name),
  } satisfies IDamageRelationsSimplified;

  return result;
}

function mergeTypeRelationships(types: ITypeInfo[]) {
  const dmgRelations = types.map(type => type.damage_relations);

  const relationships = compileDamageRelations(dmgRelations.map(simplifyTypeEffectiveness))

  return relationships;

}

export { mergeTypeRelationships };