import { useSatelitePosition } from "@/hooks/useSatelitePosition";
import { useSateliteTle } from "@/hooks/useSateliteTle";
import { ActivityIndicator, Text, View } from "react-native";

interface SateliteDetailsProps {
  noradId: number;
}

function SateliteDetails({ noradId }: SateliteDetailsProps) {
  const { data: positionData, isLoading: isLoadingPosition } =
    useSatelitePosition(noradId, 50, 19, 0, 60); // lat, lon, alt, seconds
  const { data: tleData, isLoading: isLoadingTle } = useSateliteTle(noradId);

  if (isLoadingPosition || isLoadingTle)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3048A2" />
      </View>
    );

  const pos = positionData?.positions?.[0];
  const tleLines = tleData?.tle?.split("\r\n");

  return (
    <View className=" w-full h-full p-4 pt-10 flex gap-y-6">
      <View className="w-full bg-bgColorOfSateliteDetails rounded-xl p-6">
        <Text className="text-lightPurpleColor font-bold text-lg mb-2 uppercase tracking-wider">
          Satellite Details:
        </Text>
        <View className="flex gap-y-2">
          <Text className="text-darkColorText tracking-wide font-medium ">
            NORAD ID: {noradId}
          </Text>
          <Text className="text-darkColorText tracking-wide font-medium ">
            Timestamp (UTC): {pos?.timestamp}
          </Text>
          <Text className="text-darkColorText tracking-wide font-medium ">
            Latitude: {pos?.satlatitude}
          </Text>
          <Text className="text-darkColorText tracking-wide font-medium ">
            Longitude: {pos?.satlongitude}
          </Text>
          <Text className="text-darkColorText tracking-wide font-medium ">
            Altitude (km): {pos?.sataltitude}
          </Text>
          <Text className="text-darkColorText tracking-wide font-medium ">
            Azimuth: {pos?.azimuth}
          </Text>
          <Text className="text-darkColorText tracking-wide font-medium ">
            Elevation: {pos?.elevation}
          </Text>
        </View>
      </View>

      <View className="w-full bg-bgColorOfSateliteDetails rounded-xl p-6">
        <Text className="text-lightPurpleColor font-bold text-lg mb-2 uppercase tracking-wider">
          TLE:
        </Text>
        <View className="flex gap-y-2">
          <Text className="text-darkColorText tracking-wide font-medium ">
            Line 1: {tleLines?.[0]}
          </Text>
          <Text className="text-darkColorText tracking-wide font-medium ">
            Line 2: {tleLines?.[1]}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default SateliteDetails;
