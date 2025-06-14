import { useSatelitePosition } from "@/hooks/useSatelitePosition";
import { useSateliteTle } from "@/hooks/useSateliteTle";
import { Text, View } from "react-native";

interface SateliteDetailsProps {
  noradId: number;
}

function SateliteDetails({ noradId }: SateliteDetailsProps) {
  const { data: positionData, isLoading: isLoadingPosition } =
    useSatelitePosition(noradId, 50, 19, 0, 60); // lat, lon, alt, seconds
  const { data: tleData, isLoading: isLoadingTle } = useSateliteTle(noradId);

  if (isLoadingPosition || isLoadingTle) return <Text>Loading...</Text>;

  const pos = positionData?.positions?.[0]; // pierwszy punkt pozycji
  const tleLines = tleData?.tle?.split("\r\n"); // rozdziel TLE na 2 linie

  return (
    <View className="bg-red-500 w-full h-full p-4 space-y-4">
      <View className="bg-blue-500 w-full p-4 rounded-xl">
        <Text className="text-white font-bold text-lg mb-2">
          Satellite Details:
        </Text>
        <Text className="text-white">NORAD ID: {noradId}</Text>
        <Text className="text-white">Timestamp (UTC): {pos?.timestamp}</Text>
        <Text className="text-white">Latitude: {pos?.satlatitude}</Text>
        <Text className="text-white">Longitude: {pos?.satlongitude}</Text>
        <Text className="text-white">Altitude (km): {pos?.sataltitude}</Text>
        <Text className="text-white">Azimuth: {pos?.azimuth}</Text>
        <Text className="text-white">Elevation: {pos?.elevation}</Text>
      </View>

      <View className="bg-green-500 w-full p-4 rounded-xl">
        <Text className="text-white font-bold text-lg mb-2">TLE:</Text>
        <Text className="text-white">Line 1: {tleLines?.[0]}</Text>
        <Text className="text-white">Line 2: {tleLines?.[1]}</Text>
      </View>
    </View>
  );
}

export default SateliteDetails;
