import { getSatelitePosition } from "@/services/apiSatelites";
import { useQuery } from "@tanstack/react-query";

export const useSatelitePosition = (
  noradId: number,
  observerLat: number,
  observerLng: number,
  observerAlt: number,
  seconds: number
) => {
  return useQuery({
    queryKey: [
      "satelite-position",
      noradId,
      observerLat,
      observerLng,
      observerAlt,
      seconds,
    ],
    queryFn: () =>
      getSatelitePosition(
        noradId,
        observerLat,
        observerLng,
        observerAlt,
        seconds
      ),
  });
};
