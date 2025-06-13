import { getSateliteCurrentPosition } from "@/services/apiSatelites";
import { useQuery } from "@tanstack/react-query";

export const useSatelitePosition = (noradId: number) => {
  return useQuery({
    queryKey: ["satelite-position", noradId],
    queryFn: () => getSateliteCurrentPosition(noradId),
    staleTime: 5000,
    enabled: !!noradId, // działa tylko gdy noradId istnieje
  });
};


