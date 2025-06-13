import LocationUserDetails from "@/components/LocationUserDetails";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

function Settings() {
  return (
    <LinearGradient
      colors={["#162B44", "#070C08"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <View className="flex-1">
        <LocationUserDetails />
      </View>
    </LinearGradient>
  );
}

export default Settings;
