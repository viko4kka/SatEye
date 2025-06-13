//tu bedzie cala lista satelitów

import { useSateliteListByCategory } from "@/hooks/useSatelitesByCategory";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SateliteListElement, { SateliteListItem } from "./SateliteListElement";

interface AllSateliteListProps {
  group: string;
}

function AllSateliteList({ group }: AllSateliteListProps) {
  const router = useRouter();

  const { data, isLoading, error } = useSateliteListByCategory(group);

  const handleClick = (noradId: number) => {
    router.push({
      pathname: "/",
      params: { satId: noradId.toString() },
    });
    console.log(noradId);
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.containerList}>
      {data.map((satelite: SateliteListItem) => (
        <SateliteListElement
          key={satelite.NORAD_CAT_ID}
          satelite={satelite}
          onTrack={() => handleClick(satelite.NORAD_CAT_ID)}
        />
      ))}
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
