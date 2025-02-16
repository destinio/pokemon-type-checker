import { useQuery } from '@tanstack/react-query'
import { IPokemon } from '../types'
import { getAllPokemon } from '../api/pokemon'

export function usePokemon() {
  return useQuery<IPokemon[]>({
    queryKey: ['pokemons'],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: getAllPokemon,
  })
}
