//tu bedzie pojedynczy element listy satelitów

import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";

export interface SateliteListItem {
  OBJECT_NAME: string;
  NORAD_CAT_ID: number;
}

interface SateliteListElementProps {
  satelite: SateliteListItem;
  onTrack: () => void;
}

function SateliteListElement({ satelite, onTrack }: SateliteListElementProps) {
  console.log("satelite data:", satelite);
  return (
    <View className=" flex flex-row items-center justify-between gap-x-5 w-full py-4 px-3 rounded-xl border border-greyColorSearchBar/40">
      <Text className="text-lg text-white/90">{satelite.OBJECT_NAME}</Text>
      <Text className="text-lg text-white/90 ">{satelite.NORAD_CAT_ID}</Text>
      <Pressable
        className="overflow-hidden rounded-xl border border-lightPurpleColor"
        onPress={()=>onTrack()}
      >
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
