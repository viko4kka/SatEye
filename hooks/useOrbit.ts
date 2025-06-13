import { getSateliteOrbit } from "@/services/apiSatelites";
import { useQuery } from "@tanstack/react-query";

export interface SatellitePosition {
  satlatitude: number;
  satlongitude: number;
  sataltitude: number;
}

export interface ConvertedPosition {
  x: number;
  y: number;
  z: number;
}

const EARTH_RADIUS = 5; // promień Ziemi w jednostkach Three.js
const EARTH_RADIUS_KM = 6371;
const scale = EARTH_RADIUS / EARTH_RADIUS_KM;

const convertTo3D = ({
  satlatitude,
  satlongitude,
  sataltitude,
}: SatellitePosition): ConvertedPosition => {
  const radiusKm = EARTH_RADIUS_KM + sataltitude;
  const radius = radiusKm * scale;

  const latRad = (Math.PI / 180) * satlatitude;
  const lonRad = (Math.PI / 180) * satlongitude;

  return {
    x: radius * Math.cos(latRad) * Math.cos(lonRad),
    y: radius * Math.sin(latRad),
    z: radius * Math.cos(latRad) * Math.sin(lonRad),
  };
};

// ← dodaj parametr `seconds` z wartością domyślną
export const useOrbit = (noradId: number, seconds: number = 300) => {
  return useQuery<ConvertedPosition[]>({
    queryKey: ["satelite-orbit", noradId, seconds],
    queryFn: async () => {
      const orbitData = await getSateliteOrbit(noradId, 50, 19, 0, seconds);
      console.log("Fetched orbitData from API:", orbitData); // <--- tu
      return orbitData.map(convertTo3D);
    },
    staleTime: 10000,
    enabled: !!noradId,
  });
};
