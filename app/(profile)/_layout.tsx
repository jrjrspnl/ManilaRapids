import { Stack } from "expo-router";
import React from "react";

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="change_password"
        options={{
          title: "ChangePassword",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="history"
        options={{
          title: "History",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="information_input"
        options={{
          title: "InformationInput",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
