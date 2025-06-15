import { IDamageRelations, IDamageRelationsSimplified, ITypeInfo } from "@/hooks/useTypeData";

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

console.log(damageRelationKeys);

function flattenWithDuplicates(types: IDamageRelationsSimplified[]) {
  const result = {
    double_damage_from: [],
    double_damage_to: [],
    half_damage_from: [],
    half_damage_to: [],
    no_damage_from: [],
    no_damage_to: [],
  };


  return result;
}

function compileDamageRelations(data: IDamageRelationsSimplified[]) {
  console.log('Compiling Damage Relations:', data);
  flattenWithDuplicates(data);

  // damageRelationKeys.forEach(key => {
  //   compiled[key] = [];
  // });
  //
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

  console.log('Merged Relationships:', relationships);

  return relationships;

}

export { mergeTypeRelationships };