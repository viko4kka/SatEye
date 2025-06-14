import SateliteDetails from "@/components/SateliteDetails";
import { useLocalSearchParams } from "expo-router";

function SateliteDetailsScreen() {
  const { id } = useLocalSearchParams();

  const noradId = Number(id);

  if (!noradId) {
    return null; // or handle the error appropriately
  }

  return <SateliteDetails noradId={noradId} />;
}

export default SateliteDetailsScreen;
