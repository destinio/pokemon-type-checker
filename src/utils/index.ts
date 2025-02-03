import { pokemonTypesIcons } from "../components/TypeIcon";
import { typeRelationHeaders } from "../constants";
import { ITypeRelations } from "../types";

export function getTypeInfo(type: string) {
  return pokemonTypesIcons.find((t) => t.type === type);
}

export async function getTypeApiData(type: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await res.json();
  return data["damage_relations"] as ITypeRelations;
}

export function convertInfoHeader(title: string) {
  return typeRelationHeaders[title];
}
