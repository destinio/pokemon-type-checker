import { IDamageRelations, ITypeInfo } from "@/hooks/useTypeData";

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
  'quarter_damage_to',
  'neutral_damage_from',
  'neutral_damage_to'
] as const;

function compileDamageRelations(data: Record<string, string[]>[]) {
  const compiled: Record<string, string[]> = {};
  damageRelationKeys.forEach(key => {
    compiled[key] = [];
  });

  console.log('compiled', compiled);

}


function simplifyTypeEffectiveness(data: IDamageRelations) {
  const result: Record<string, string[]> = {};

  for (const key of Object.keys(data) as Array<keyof IDamageRelations>) {
    result[key] = data[key]!.map((info: { name: string }) => info.name);
  }

  return result;
}

function mergeTypeRelationships(types: ITypeInfo[]) {
  const relationships = types.map(t => t.damage_relations).map(simplifyTypeEffectiveness);

  compileDamageRelations(relationships);

}

export { mergeTypeRelationships };