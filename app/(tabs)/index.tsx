import { Earth } from "@/components/Earth";
import { LinearGradient } from "expo-linear-gradient";
import { Suspense, useState } from "react";
import { Text, View } from "react-native";

function getCurrentDate() {
  const today = new Date();

  const date = today.getDate();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayName = daysOfWeek[today.getDay()];
  return `${date} ${dayName}`;
}

export default function GlobalViewScreen() {
  const [currentDate, setCurrentDate] = useState(getCurrentDate());

  return (
    <LinearGradient
      colors={["#162B44", "#070C08"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <View className="flex-1">
        <View className="items-start justify-center px-6 pt-28 ">
          <Text className="text-whiteTextColor/90 text-5xl font-bold tracking-wide">
            Earth
          </Text>
          <Text className="text-whiteTextColor/50 text-3xl font-medium tracking-wide">
            {currentDate}
          </Text>
        </View>
        <View className="flex-1 justify-center">
          <Suspense fallback={"null"}>
            <Earth />
          </Suspense>
        </View>
      </View>
    </LinearGradient>
  );
}
