import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const icons = {
  index: (props: any) => (
    <FontAwesome6 name="earth-americas" size={24} {...props} />
  ),
  "satelite-list": (props: any) => (
    <MaterialIcons name="satellite-alt" size={24} {...props} />
  ),
  settings: (props: any) => (
    <Ionicons name="settings-outline" size={24} {...props} />
  ),
};