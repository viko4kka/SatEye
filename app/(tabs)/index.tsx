import { Earth } from "@/components/Earth";
import { LinearGradient } from "expo-linear-gradient";
import { Suspense } from "react";
import { StyleSheet, Text } from "react-native";

export default function GlobalViewScreen() {
  return (
    <LinearGradient
      colors={["#162B44", "#070C08"]} // różowy → niebieski
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <Text style={styles.text}>Earth</Text>
      <Text style={styles.text}>21 Wed</Text>
      <Suspense fallback={null}>
        <Earth />
      </Suspense>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
});
