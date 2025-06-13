const API_KEY = "LVLK94-7WY8HA-GRZSKE-5I19";

const DEFAULT_LAT = 50;
const DEFAULT_LNG = 19;
const DEFAULT_ALT = 0;

// export const getSatelite = async () => {
//   const response = await fetch(
//     `https://api.n2yo.com/rest/v1/satellite/tle/36516?apiKey=${API_KEY}`
//   );
//   if (!response.ok) throw new Error("Error fetching satellite data");
//   return response.json();
// };

export const getSateliteTLE = async (noradId: number) => {
  const response = await fetch(
    `https://api.n2yo.com/rest/v1/satellite/tle/${noradId}?apiKey=${API_KEY}`
  );
  if (!response.ok) throw new Error("Error fetching satellite TLE data");
  return response.json(); //zawiera info i tle
};
export const getSateliteOrbit = async (
  noradId: number,
  observerLat: number = DEFAULT_LAT,
  observerLng: number = DEFAULT_LNG,
  observerAlt: number = DEFAULT_ALT,
  seconds: number = 300 // maks 300 sekund – daje trasę
) => {
  const response = await fetch(
    `https://api.n2yo.com/rest/v1/satellite/positions/${noradId}/${observerLat}/${observerLng}/${observerAlt}/${seconds}?apiKey=${API_KEY}`
  );
  if (!response.ok) throw new Error("Error fetching satellite orbit data");
  const data = await response.json();
  return data.positions; // tablica pozycji satelity
};

/**
 * Pobiera **aktualną pozycję** satelity jako pierwszy punkt z `positions`
 */
export const getSateliteCurrentPosition = async (
  noradId: number,
  observerLat: number = DEFAULT_LAT,
  observerLng: number = DEFAULT_LNG,
  observerAlt: number = DEFAULT_ALT
) => {
  const positions = await getSateliteOrbit(
    noradId,
    observerLat,
    observerLng,
    observerAlt,
    1 // tylko jeden punkt = aktualna pozycja
  );
  return positions[0]; // pojedyncza pozycja
};

export const getSateliteListByGroup = async (group: string) => {
  const response = await fetch(
    `https://celestrak.org/NORAD/elements/gp.php?GROUP=${group}&FORMAT=json`
  );

  if (!response.ok) {
    throw new Error(`Error fetching satellite list for group`);
  }

  const data = await response.json(); //data = body
  return data;
};
