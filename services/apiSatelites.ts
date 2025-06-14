const API_KEY = "LVLK94-7WY8HA-GRZSKE-5I19";

const DEFAULT_LAT = 50;
const DEFAULT_LNG = 19;
const DEFAULT_ALT = 0;

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

export const getSatelitePosition = async (
  noradId: number,
  observerLat: number = DEFAULT_LAT,
  observerLng: number = DEFAULT_LNG,
  observerAlt: number = DEFAULT_ALT,
  seconds: number = 60
) => {
  const response = await fetch(
    `https://api.n2yo.com/rest/v1/satellite/positions/${noradId}/${observerLat}/${observerLng}/${observerAlt}/${seconds}?apiKey=${API_KEY}`
  );
  if (!response.ok) throw new Error("Error fetching satellite position");
  const data = await response.json();

  return data;
};

export const getSateliteTle = async (noradId: number) => {
  const response = await fetch(
    `https://api.n2yo.com/rest/v1/satellite/tle/${noradId}&apiKey=${API_KEY}`
  );
  if (!response.ok) throw new Error("Error fetching satellite TLE");
  const data = await response.json();

  return data;
};
