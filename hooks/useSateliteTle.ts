import { getSateliteTle } from "@/services/apiSatelites";
import { useQuery } from "@tanstack/react-query";

export const useSateliteTle = (noradId: number) => {
  return useQuery({
    queryKey: ["satelite-tle", noradId],
    queryFn: () => getSateliteTle(noradId),
  });
};
