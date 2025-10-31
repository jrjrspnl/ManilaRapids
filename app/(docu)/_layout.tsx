import { Stack } from "expo-router";

export default function DocuLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BirthCertificate" />
    </Stack>
  );
}
