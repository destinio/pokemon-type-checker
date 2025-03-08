import { useQuery } from "@tanstack/react-query";
import { getRankings } from "../api/rank";

export function useRanks() {
  return useQuery<any[]>({
    queryKey: ['ranks'],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: () => getRankings(),
  })
}