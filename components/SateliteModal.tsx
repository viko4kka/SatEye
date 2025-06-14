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
      <View className="absolute bottom-0 w-full bg-white p-5 rounded-t-2xl shadow-xl h-3/4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-semibold">{sateliteName}</Text>

          <Pressable onPress={() => setIsModalVisible(false)}>
            <Feather name="x" size={24} color="#3048A2" />
          </Pressable>
        </View>
        <SateliteDetails noradId={noradId} />
      </View>
    </Modal>
  );
};

export default SateliteModal;
