import NetworkStatusBanner from "@/components/NetworkStatusBanner";
import { SateliteProvider } from "@/context/SateliteContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "../global.css";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SateliteProvider>
        <NetworkStatusBanner />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <StatusBar style="light" /> */}
        </Stack>
      </SateliteProvider>
    </QueryClientProvider>
  );
}
