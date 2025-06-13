import SateliteListWrapper from "@/components/SateliteListWrapper";
import SearchBarSatelite from "@/components/SearchBarSatelite";

import { LinearGradient } from "expo-linear-gradient";

function SateliteList() {
  return (
    <LinearGradient
      colors={["#162B44", "#070C08"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <SearchBarSatelite />
      <SateliteListWrapper />
    </LinearGradient>
  );
}

export default SateliteList;
