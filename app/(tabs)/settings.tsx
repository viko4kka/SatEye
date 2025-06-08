import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

function Settings() {
  return (
    <LinearGradient
      colors={["#162B44", "#070C08"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <View>
        <Text>Tu bedzie settings</Text>
      </View>
    </LinearGradient>
  );
}

export default Settings;
