//uzywamy tutaj z strony CeleStrack

import { getSateliteListByGroup } from "@/services/apiSatelites";
import { useQuery } from "@tanstack/react-query";

export const useSateliteListByCategory = (group: string) => {
  return useQuery({
    queryKey: ["satelites-by-category", group],
    queryFn: () => getSateliteListByGroup(group),
  });
};
