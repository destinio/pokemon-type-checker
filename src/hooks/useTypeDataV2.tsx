import { useQuery } from "@tanstack/react-query";
import { ITypeRelations } from "../types";

export interface ITypeInfo {
  damage_relations: ITypeRelations;
  name: string;
}

export function useTypeData(type: string | null) {
  return useQuery<ITypeInfo>({
    queryKey: [`poke-type-${type}`],
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    queryFn: async () => {
      if (!type) {
        return Promise.reject("Type is null");
      }
      return fetch(`https://pokeapi.co/api/v2/type/${type}`).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        console.log(res.json());
        return res.json();
      });
    },
  });
}
