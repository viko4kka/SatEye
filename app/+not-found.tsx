import { Stack } from "expo-router";
import { Text, View } from "react-native";

function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
      <View>
        {/* <Link href="/">Go to home screen</Link> */}
        <Text>404 error</Text>
      </View>
    </>
  );
}

export default NotFoundScreen;