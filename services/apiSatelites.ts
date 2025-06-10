const API_KEY = "LVLK94-7WY8HA-GRZSKE-5I19";

export const getSatelite = async () => {
  const response = await fetch(
    `https://api.n2yo.com/rest/v1/satellite/tle/25544?apiKey=${API_KEY}`
  );
  if (!response.ok) throw new Error("Error fetching satellite data");
  return response.json();
};

export const getSateliteTLE = async (noradId: number = 25544) => {
  const response = await fetch(
    `https://api.n2yo.com/rest/v1/satellite/tle/${noradId}?apiKey=${API_KEY}`
  );
  if (!response.ok) throw new Error("Error fetching satellite TLE data");
  return response.json();
};

export const getSatelitePosition = async (
  noradId: number = 25544,
  observerLat: number = 50,
  observerLng: number = 19,
  observerAlt: number = 0,
  seconds: number = 60
) => {
  const response = await fetch(
    `https://api.n2yo.com/rest/v1/satellite/positions/${noradId}/${observerLat}/${observerLng}/${observerAlt}/${seconds}?apiKey=${API_KEY}`
  );
  if (!response.ok) throw new Error("Error fetching satellite position data");
  const data = await response.json();
  return data.positions;
};
