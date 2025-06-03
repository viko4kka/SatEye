import { Earth } from "@/components/Earth";
import { LinearGradient } from "expo-linear-gradient";
import { Suspense } from "react";
import { Text } from "react-native";

export default function GlobalViewScreen() {
  return (
    <LinearGradient
      colors={["#162B44", "#070C08"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <Text className="text-red-600 text-5xl">Earth</Text>
      <Text className="text-red-600 text-5xl">21 Wed</Text>
      <Suspense fallback={null}>
        <Earth />
      </Suspense>
    </LinearGradient>
  );
}
