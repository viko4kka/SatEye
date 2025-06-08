import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, View } from "react-native";
import SateliteFilterBarButton from "./SateliteFilterBarButton";

function SateliteFilterBar() {
  return (
    <View style={styles.containerFilterBar}>
      <View style={styles.iconWrapper}>
        <LinearGradient
          colors={["#122D94", "#3048A2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientIcon}
        >
          <MaterialCommunityIcons name="tune-variant" size={24} color="white" />
        </LinearGradient>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <SateliteFilterBarButton />
        <SateliteFilterBarButton />
        <SateliteFilterBarButton />
        <SateliteFilterBarButton />
        <SateliteFilterBarButton />
        <SateliteFilterBarButton />
      </ScrollView>
    </View>
  );
}

export default SateliteFilterBar;

const styles = StyleSheet.create({
  containerFilterBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 24,
    paddingHorizontal: 24,
  },
  iconWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#3048A2",
    marginRight: 16,
  },
  gradientIcon: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  scrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
