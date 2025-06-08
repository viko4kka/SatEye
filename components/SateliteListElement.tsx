//tu bedzie pojedynczy element listy satelitów

import useSateliteData from "@/hooks/useSateliteData";
import { Text, View } from "react-native";

function SateliteListElement() {
  const { data, error, isLoading } = useSateliteData();

  if (isLoading) {
    return (
      <View className="bg-blue-500 mb-6">
        <Text className="text-lg ">Ładowanie...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="bg-red-500 mb-6">
        <Text className="text-lg ">Błąd ładowania danych</Text>
      </View>
    );
  }

  return (
    <View className="bg-red-500 mb-6">
      <Text className="text-lg ">{data.info.satname}</Text>
    </View>
  );
}

export default SateliteListElement;
