
import { icons } from "@/costants/icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet } from "react-native";

interface TabBarButtonProps {
  label: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  routeName: keyof typeof icons;
  color: string;
}

function TabBarButton({
  label,
  isFocused,
  onPress,
  onLongPress,
  routeName,
  color,
}: TabBarButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        styles.tabBarButton,
        isFocused ? styles.isActiveTabButton : styles.inactiveTabButton,
      ]}
    >
      {isFocused && (
        <LinearGradient
          colors={["#122D94", "#3048A2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {icons[routeName]({
        color: isFocused ? "#fff" : "#ddd",
      })}
    </Pressable>
  );
}

export default TabBarButton;

const styles = StyleSheet.create({
  tabBarButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 20,
    overflow: "hidden",
  },
  isActiveTabButton: {
    backgroundColor: "#122D94",
    borderWidth: 1,
    borderColor: "#3048A2",
  },
  inactiveTabButton: {
    backgroundColor: "transparent",
  },
});