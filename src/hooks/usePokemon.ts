import { useQuery, useQueryClient } from '@tanstack/react-query'
import { IPokemon } from '../types'
import { getAllPokemon, getPokemonById } from '../api/pokemon'
import { useEffect } from 'react'

export function usePokemon() {
  return useQuery<IPokemon[]>({
    queryKey: ['pokemons'],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: getAllPokemon,
  })
}

export function usePokemonById(id?: string) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['pokemon', id],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => getPokemonById(id!),
    enabled: !!id,
  })

  useEffect(() => {
    if (!id) return

    const nextId = parseInt(id) + 1
    const prevId = parseInt(id) - 1

    queryClient.prefetchQuery({
      queryKey: ['pokemon', nextId.toString()],
      queryFn: () => getPokemonById(nextId.toString()),
    })

    if (prevId > 0) {
      queryClient.prefetchQuery({
        queryKey: ['pokemon', prevId.toString()],
        queryFn: () => getPokemonById(prevId.toString()),
      })
    }
  }, [id, queryClient])

  return query
}
