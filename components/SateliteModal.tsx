import Feather from "@expo/vector-icons/Feather";
import { Modal, Pressable, Text, View } from "react-native";
import SateliteDetails from "./SateliteDetails";

interface SateliteModalProps {
  isModalVisible: boolean;
  sateliteName: string;
  setIsModalVisible: (value: boolean) => void;
  noradId: number;
}

const SateliteModal = ({
  isModalVisible,
  setIsModalVisible,
  sateliteName,
  noradId,
}: SateliteModalProps) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <Pressable
        className="flex-1 bg-black/50"
        onPress={() => setIsModalVisible(false)}
      />
      <View className="absolute bottom-0 w-full bg-modalBgColor pt-6 p-5 rounded-t-2xl shadow-xl h-3/4">
        <View className="relative items-center mb-4">
          <Text className="text-darkColorText text-3xl font-semibold text-center">
            {sateliteName}
          </Text>

          <Pressable
            onPress={() => setIsModalVisible(false)}
            className="absolute right-0"
          >
            <Feather name="x" size={28} color="#070C08" />
          </Pressable>
        </View>

        <SateliteDetails noradId={noradId} />
      </View>
    </Modal>
  );
};

export default SateliteModal;
