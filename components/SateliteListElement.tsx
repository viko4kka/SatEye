//tu bedzie pojedynczy element listy satelitów

import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, Text } from "react-native";
import SateliteModal from "./SateliteModal";

export interface SateliteListItem {
  OBJECT_NAME: string;
  NORAD_CAT_ID: number;
}

interface SateliteListElementProps {
  satelite: SateliteListItem;
  onTrack: () => void;
}

function SateliteListElement({ satelite, onTrack }: SateliteListElementProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <Pressable
        onPress={() => setIsModalVisible(true)}
        className="my-2 mx-10 flex flex-row items-center justify-between gap-x-5 w-full py-4 px-6 rounded-xl border border-greyColorSearchBar/40"
      >
        <Text className="text-lg text-white/90">{satelite.OBJECT_NAME}</Text>
        <Pressable
          className="overflow-hidden rounded-xl border border-lightPurpleColor"
          onPress={() => onTrack()}
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
      </Pressable>
      <SateliteModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        sateliteName={satelite.OBJECT_NAME}
        noradId={satelite.NORAD_CAT_ID}
      />
    </>
  );
}

export default SateliteListElement;
