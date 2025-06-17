import { useSatellite } from "@/context/SateliteContext";
import { useSateliteListByCategory } from "@/hooks/useSatelitesByCategory";
import { useSearchSateliteGlobal } from "@/hooks/useSearchSateliteGlobal";
import { useUserLocation } from "@/hooks/useUserLocation"; // ← NOWY HOOK
import { getSatelitePosition, getSateliteTle } from "@/services/apiSatelites";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Bounce } from "react-native-animated-spinkit";
import SateliteListElement, { SateliteListItem } from "./SateliteListElement";

interface AllSateliteListProps {
  group: string;
  searchText: string;
}

function AllSateliteList({ group, searchText }: AllSateliteListProps) {
  const router = useRouter();
  const { setNoradId, setTleString } = useSatellite();
  const location = useUserLocation(); // ← użycie hooka lokalizacji

  const query = searchText.toLowerCase().trim();

  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useSateliteListByCategory(group);

  // Tu wstawiasz useEffect-y:
  useEffect(() => {
    console.log("Wybrana grupa:", group);
  }, [group]);

  useEffect(() => {
    if (categoryData) {
      console.log("Dane z useSateliteListByCategory:", categoryData);
    }
  }, [categoryData]);

  const {
    data: globalSearchData,
    isLoading: globalLoading,
    error: globalError,
  } = useSearchSateliteGlobal(query);

  const handleClick = async (noradId: number) => {
    console.log("Clicked on NORAD ID:", noradId);

    try {
      setNoradId(noradId);

      // Użycie lokalizacji użytkownika, fallback na Kraków
      const observerLat = location?.latitude ?? 50.06;
      const observerLng = location?.longitude ?? 19.94;
      const observerAlt = 0;
      const seconds = 0;

      const position = await getSatelitePosition(
        noradId,
        observerLat,
        observerLng,
        observerAlt,
        seconds
      );

      const tle = await getSateliteTle(noradId);
      setTleString(tle);

      console.log("📍 Current Position:", position);
      console.log("🛰️ TLE Data:", tle);

      router.push({
        pathname: "/",
        params: { satId: noradId.toString() },
      });
    } catch (error) {
      console.error("Error fetching satellite data:", error);
    }
  };

  const isLoading =
    (group && categoryLoading) || (!group && query && globalLoading);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Bounce size={48} color="#3048A2" />
        <Text style={styles.infoText}>Ładowanie danych satelitarnych...</Text>
      </View>
    );
  }

  const isError = (group && categoryError) || (!group && query && globalError);

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Opps, coś poszło nie tak. Spróbuj ponownie.
        </Text>
      </View>
    );
  }

  let displayData: SateliteListItem[] = [];

  if (group && categoryData) {
    displayData = categoryData.filter((sat: SateliteListItem) => {
      return (
        sat.OBJECT_NAME.toLowerCase().includes(query) ||
        sat.NORAD_CAT_ID.toString().includes(query)
      );
    });
  } else if (!group && query && globalSearchData) {
    displayData = globalSearchData;
  }

  if (query !== "" && displayData.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.infoText}>
          Nie znaleziono satelity: {searchText}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={displayData}
      keyExtractor={(item: SateliteListItem) => item.NORAD_CAT_ID.toString()}
      renderItem={({ item }: { item: SateliteListItem }) => (
        <SateliteListElement
          satelite={item}
          onTrack={() => handleClick(item.NORAD_CAT_ID)}
        />
      )}
      contentContainerStyle={styles.containerList}
    />
  );
}

export default AllSateliteList;

const styles = StyleSheet.create({
  containerList: {
    paddingBottom: 150,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginHorizontal: 24,
    paddingVertical: 16,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  errorText: {
    color: "#ff4d4d",
    fontSize: 18,
    textAlign: "center",
  },
  infoText: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
  },
});
