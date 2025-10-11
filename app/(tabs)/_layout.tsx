import { Tabs } from "expo-router";
import {
  House,
  MessageCircleMore,
  Newspaper,
  UserRound,
} from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

type TabIconProps = {
  title: string;
  color: string;
  icon: React.ReactNode;
  focused: boolean;
};

const TabIcon = ({ title, icon, focused }: TabIconProps) => {
  if (focused) {
    return (
      <View className="bg-[#E2F4FF] min-w-[90px] min-h-14 rounded-lg flex-1 justify-center items-center">
        {icon}
        <Text className="text-sm font-medium text-secondary">{title}</Text>
      </View>
    );
  }
  return (
    <View className="min-w-[90px] min-h-14 rounded-lg flex-1 justify-center items-center">
      {icon}
      <Text className="text-sm font-medium text-gray-500">{title}</Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#457B9D",
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 10,
          paddingHorizontal: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              title="Home"
              color={color}
              icon={<House size={20} color={color} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="documents"
        options={{
          title: "Documents",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              title="Docs"
              color={color}
              icon={<Newspaper size={20} color={color} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="feedback"
        options={{
          title: "Feedback",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              title="Feedback"
              color={color}
              icon={<MessageCircleMore size={20} color={color} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              title="Profile"
              color={color}
              icon={<UserRound size={20} color={color} />}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
