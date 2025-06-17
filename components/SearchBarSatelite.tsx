import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

interface SearchBarProps {
  searchBarText: string;
  setSearchBarText: (text: string) => void;
  onSearch: () => void;
}

function SearchBarSatelite({
  searchBarText,
  setSearchBarText,
  onSearch,
}: SearchBarProps) {
  const [isFocus, setIsFocus] = useState(false);
  const [isSearching, setIsSearching] = useState(false); // stan po kliknięciu lupki

  const handleSearchPress = () => {
    setIsSearching(true); // ustawiamy flagę
    onSearch();
  };

  const handleBlur = () => {
    setIsFocus(false);
    setIsSearching(false); // resetujemy po wyjściu z inputa
  };

  return (
    <View className="items-center justify-start px-10 pt-12">
      <Text className="text-white/70 text-3xl font-light tracking-wider mb-4 flex flex-col items-center justify-center text-center px-10 py-8">
        What are you looking for in space today?
      </Text>
      <View className="flex flex-row items-center justify-between px-10 gap-x-4">
        <View className="w-full">
          <TextInput
            className="px-6 py-4 rounded-xl w-full bg-transparent text-whiteTextColor border"
            placeholder="Search"
            placeholderTextColor="#76808D"
            value={searchBarText}
            onChangeText={setSearchBarText}
            onFocus={() => setIsFocus(true)}
            onBlur={handleBlur}
            style={[
              {
                borderColor: isSearching
                  ? "#76808D" // spokojny kolor po kliknięciu lupki
                  : isFocus
                  ? "#3048A2" // czerwony podczas focus
                  : "#76808D", // default
              },
            ]}
          />
        </View>
        <Pressable
          onPress={handleSearchPress}
          className="overflow-hidden rounded-xl border border-lightPurpleColor"
        >
          <LinearGradient
            colors={["#122D94", "#3048A2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Feather
              name="search"
              size={24}
              color="white"
              className="p-3 mx-5"
            />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

export default SearchBarSatelite;
