import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import TabBarButton from "./TabBarButton";


interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

function TabBar({ state, descriptors, navigation }: TabBarProps) {
  return (
    <LinearGradient
      colors={["#0C1522", "#374555"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.tabBar}
    >
      <View style={{ flexDirection: "row", flex: 1 }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TabBarButton
              key={route.name}
              onPress={onPress}
              onLongPress={onLongPress}
              isFocused={isFocused}
              routeName={route.name}
              color={isFocused ? "#67ab7" : "#222"}
              label=""
            />
          );
        })}
      </View>
    </LinearGradient>
  );
}

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    height: 70,
    bottom: 50,
    left: 30,
    right: 30,
    borderRadius: 15,
    width: "auto",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#374555",
  },
});