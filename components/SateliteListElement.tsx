//tu bedzie pojedynczy element listy satelitów

import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";

export interface SateliteData {
  info: {
    satid: number;
    satname: string;
  };
  tle: string;
}

interface SateliteListElementProps {
  satelite: SateliteData;
}

function SateliteListElement({ satelite }: SateliteListElementProps) {
  console.log("satelite data:", satelite);
  return (
    <View className=" flex flex-row items-center justify-between gap-x-5 w-full py-4 px-3 rounded-xl border border-greyColorSearchBar/40">
      <Text className="text-lg text-white/90">{satelite.info.satname}</Text>
      <Text className="text-lg text-white/90 ">{satelite.info.satid}</Text>
      <Pressable className="overflow-hidden rounded-xl border border-lightPurpleColor">
        <LinearGradient
          colors={["#122D94", "#3048A2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text className="text-white/90 px-3 py-1.5 tracking-wide font-semibold">
            Track it
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

export default SateliteListElement;
