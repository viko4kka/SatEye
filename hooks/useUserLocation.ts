import * as Location from "expo-location";
import { useEffect, useState } from "react";

export function useUserLocation() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    city: string;
    timezone: string;
  } | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      const geocode = await Location.reverseGeocodeAsync(loc.coords);
      const city = geocode[0]?.city || "Unknown";
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        city,
        timezone,
      });
    })();
  }, []);

  return location;
}
