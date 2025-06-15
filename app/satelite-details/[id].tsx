import SateliteDetails from "@/components/SateliteDetails";
import { useLocalSearchParams } from "expo-router";

function SateliteDetailsScreen() {
  const { id } = useLocalSearchParams();

  const noradId = Number(id);

  if (!noradId) {
    return null; 
  }

  return <SateliteDetails noradId={noradId} />;
}

export default SateliteDetailsScreen;
