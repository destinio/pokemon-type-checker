import { useQuery } from "@tanstack/react-query";
import { getRankings } from "../api/rank";
import { IRank } from "../types";

export function useRanks() {
  return useQuery<IRank[]>({
    queryKey: ['ranks'],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: getRankings,
  })
}