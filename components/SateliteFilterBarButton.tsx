// pojedynczy przycisk filtru

import { Text, View } from "react-native";

function SateliteFilterBarButton() {
  return (
    <View className="rounded-xl px-5 py-2  border border-greyColorSearchBar">
      <Text className="text-greyColorSearchBar text-lg font-medium tracking-wide">
        Weather
      </Text>
    </View>
  );
}

export default SateliteFilterBarButton;
