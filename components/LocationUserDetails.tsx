import { Text, View } from "react-native";

function LocationUserDetails() {
  return (
    <View className="bg-green-500 flex flex-col justify-center items-center h-full w-full ">
      <Text className="bg-red-500 flex flex-col justify-start text-whiteTextColor/90 text-5xl font-bold tracking-wide">
        Where I Am
      </Text>
      <View className="bg-blue-500 ">
        <View className="flex flex-row items-center  ">
          <Text className="text-2xl text-whiteTextColor/90">
            Your location:
          </Text>
          <Text>Rzeszów</Text>
        </View>
        <View className="flex flex-row items-center  ">
          <Text className="text-2xl text-whiteTextColor/90">Latitude: </Text>
          <Text>50.04132°</Text>
        </View>
        <View className="flex flex-row items-center  ">
          <Text className="text-2xl text-whiteTextColor/90">Longitude: </Text>
          <Text>50.04132°</Text>
        </View>
        <View className="flex flex-row items-center  ">
          <Text className="text-2xl text-whiteTextColor/90">
            Local time zone:{" "}
          </Text>
          <Text>GMT+2</Text>
        </View>
      </View>
    </View>
  );
}

export default LocationUserDetails;
