import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";
import "./global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        className="flex-1 bg-primary"
        edges={["top", "left", "right"]}
      >
        <ToastManager
          position="top"
          duration={3000}
          showProgressBar={false}
          topOffset={30}
        />

        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(profile)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(docu)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
