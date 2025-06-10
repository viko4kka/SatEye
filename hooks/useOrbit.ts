import { getSatelitePosition } from "@/services/apiSatelites";
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

const EARTH_RADIUS = 5;       // promień Ziemi w Three.js (w jednostkach 3D)
const EARTH_RADIUS_KM = 6371; // promień Ziemi w kilometrach
const scale = EARTH_RADIUS / EARTH_RADIUS_KM;

// Funkcja konwertująca współrzędne geograficzne na współrzędne 3D z uwzględnieniem skali
const convertTo3D = ({ satlatitude, satlongitude, sataltitude }: SatellitePosition): ConvertedPosition => {
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

// Hook do pobierania i konwersji pozycji satelity
export const useOrbit = (noradId: number = 25544) => {
  return useQuery<ConvertedPosition[]>({
    queryKey: ["satelite-orbit", noradId],
    queryFn: async () => {
      const data = await getSatelitePosition(noradId);
      return data.map(convertTo3D); // data to tablica pozycji, mapujemy na 3D
    },
    staleTime: 10000, // Odświeżanie co 10 sekund
  });
};
