import { useQuery } from "@tanstack/react-query";

export const useSearchSateliteGlobal = (query: string) => {
  return useQuery({
    queryKey: ["search-global", query],
    queryFn: async () => {
      const lowerQuery = query.toLowerCase().trim();
      const response = await fetch(
        `https://celestrak.org/NORAD/elements/index.php?FORMAT=json`
      );
      if (!response.ok) throw new Error("Błąd podczas wyszukiwania");

      const allSats = await response.json();
      return allSats.filter((sat: any) => {
        return (
          sat.OBJECT_NAME.toLowerCase().includes(lowerQuery) ||
          sat.NORAD_CAT_ID.toString().includes(lowerQuery)
        );
      });
    },
  });
};
