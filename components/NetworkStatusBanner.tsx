// components/NetworkStatusBanner.tsx
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useInternetStatus } from "../hooks/useInternetStatus";

export default function NetworkStatusBanner() {
  const isConnected = useInternetStatus();

  if (isConnected === false) {
    return (
      <LinearGradient
        colors={["#162B44", "#070C08"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.banner}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Ops! Something with connecting with network. Maybe you are offline.
          </Text>
        </View>
      </LinearGradient>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    paddingHorizontal: 16,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
