const API_KEY = "LVLK94-7WY8HA-GRZSKE-5I19";

export const getSatelite = async () => {
  const response = await fetch(
    "https://api.n2yo.com/rest/v1/satellite/tle/25544&apiKey=" + API_KEY
  );
  console.log("jest data");
  if (!response.ok) {
    throw new Error("Error fetching satellite data");
  }

  return response.json();
};
