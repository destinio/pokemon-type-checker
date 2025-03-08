import { useQuery } from '@tanstack/react-query'
import { IPokemon } from '../types'
import { getAllPokemon, getPokemonById } from '../api/pokemon'

export function usePokemon() {
  return useQuery<IPokemon[]>({
    queryKey: ['pokemons'],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: getAllPokemon,
  })
}

export function usePokemonById(id: string | undefined) {
  if (!id) {
    return {
      data: null,
      isLoading: false,
      isFetching: false,
    }
  }

  return useQuery({
    queryKey: ['pokemon', id],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => getPokemonById(id),
  })
}