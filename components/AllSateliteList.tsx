//tu bedzie cala lista satelitów

import { ScrollView, StyleSheet } from "react-native";
import SateliteListElement from "./SateliteListElement";

function AllSateliteList() {
  return (
    <ScrollView contentContainerStyle={styles.containerList}>
      <SateliteListElement />
      <SateliteListElement />
      <SateliteListElement />
      <SateliteListElement />
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
    backgroundColor: "white",
    marginTop: 24,
    marginHorizontal: 24,
    paddingVertical: 16,
  },
});
