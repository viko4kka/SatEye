// pojedynczy przycisk filtru

import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text } from "react-native";

type SateliteFilterBarButtonProps = {
  label: string;
  onPress: () => void;
  isActive: boolean;
};

function SateliteFilterBarButton({
  label,
  onPress,
  isActive = false,
}: SateliteFilterBarButtonProps) {
  if (isActive) {
    return (
      <LinearGradient
        colors={["#122D94", "#3048A2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-xl overflow-hidden border border-lightPurpleColor"
      >
        <Pressable onPress={onPress} className="px-4 py-2 rounded-full">
          <Text className="text-white font-semibold tracking-wider">
            {label}
          </Text>
        </Pressable>
      </LinearGradient>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      className="px-4 py-2 bg-transparent rounded-xl text-whiteTextColor border border-greyColorSearchBar"
    >
      <Text className="text-greyColorSearchBar font-semibold tracking-wider">
        {label}
      </Text>
    </Pressable>
  );
}

export default SateliteFilterBarButton;
