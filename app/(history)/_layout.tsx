import { Stack } from "expo-router";
import React from "react";

const HistoryLayout = () => {
  return (
    <Stack>

      <Stack.Screen
        name="index"
        options={{
          title: "History",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="request"
        options={{
          title: "Request",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="to_process"
        options={{
          title: "To Process",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="to_receive"
        options={{
          title: "To Receive",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="completed"
        options={{
          title: "Completed",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="cancelled"
        options={{
          title: "Cancelled",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default HistoryLayout;