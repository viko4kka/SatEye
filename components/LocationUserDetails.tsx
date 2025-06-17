import { useUserLocation } from "@/hooks/useUserLocation";
import { Text, View } from "react-native";
import { Bounce } from "react-native-animated-spinkit";

function LocationUserDetails() {
  const location = useUserLocation();

  return (
    <View className=" flex flex-col justify-start items-center h-full w-full my-28 px-4">
      <Text className=" text-whiteTextColor/90 text-5xl font-bold tracking-wide">
        Where I Am ?
      </Text>
      {location ? (
        <View className="flex flex-col justify-center items-start w-full gap-y-8 px-6">
          <View className="w-full  rounded-xl p-6 mt-10">
            <View className="flex flex-row items-center mb-2">
              <Text className="text-bgColorOfSateliteDetails font-bold text-lg uppercase tracking-wider">
                City:
              </Text>
              <Text className="uppercase text-bgColorOfSateliteDetails tracking-wide font-medium ml-2">
                {location.city}
              </Text>
            </View>
            <View className="flex flex-row items-center mb-2">
              <Text className="text-bgColorOfSateliteDetails font-bold text-lg uppercase tracking-wider">
                Latitude:
              </Text>
              <Text className="text-bgColorOfSateliteDetails tracking-wide font-medium ml-2">
                {location.latitude.toFixed(5)}°
              </Text>
            </View>
            <View className="flex flex-row items-center mb-2">
              <Text className="text-bgColorOfSateliteDetails font-bold text-lg uppercase tracking-wider">
                Longitude:
              </Text>
              <Text className="text-bgColorOfSateliteDetails tracking-wide font-medium ml-2">
                {location.longitude.toFixed(5)}°
              </Text>
            </View>
            <View className="flex flex-row items-center">
              <Text className="text-bgColorOfSateliteDetails font-bold text-lg uppercase tracking-wider">
                Time Zone:
              </Text>
              <Text className="text-bgColorOfSateliteDetails tracking-wide font-medium ml-2">
                {location.timezone}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View className=" flex flex-col justify-center items-center ">
          <Bounce size={48} color="#3048A2" />
        </View>
      )}
    </View>
  );
}

export default LocationUserDetails;
