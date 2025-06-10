//tu bedzie cala lista satelitów

import useSateliteData from "@/hooks/useSateliteData";
import { ScrollView, StyleSheet, Text } from "react-native";
import SateliteListElement from "./SateliteListElement";

function AllSateliteList() {
  const { data, error, isLoading } = useSateliteData();

  if (isLoading) return <Text>Ładowanie...</Text>;
  if (error) return <Text>Błąd ładowania danych</Text>;
  if (!data) return <Text>Brak danych satelity</Text>;

  return (
    <ScrollView contentContainerStyle={styles.containerList}>
      <SateliteListElement satelite={data} />
    </ScrollView>
  );
}

export default AllSateliteList;

const styles = StyleSheet.create({
  containerList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    marginTop: 24,
    marginHorizontal: 24,
    paddingVertical: 16,
  },
});
