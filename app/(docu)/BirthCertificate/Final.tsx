import { Link, router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
const Final = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <ScrollView
        className="flex-1 bg-white"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row items-center px-4 py-4 bg-primary">
          <Link href="/(tabs)" asChild>
            <TouchableOpacity>
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
          </Link>
          <Text className="flex-1 text-xl font-bold text-center text-white">
            Birth Certificate
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <View className="px-6 pb-10 bg-white">
          <Text className="mx-auto mt-5 mb-5 text-xl font-bold text-primary">
            Birth Certificate
          </Text>

          <View className="mt-2">
            <Text className="mb-2 text-base font-semibold text-primary">
              Review Your Details
            </Text>
            <Text className="text-neutral-700">Name: Juan Dela Cruz</Text>
            <Text className="text-neutral-700">Relationship: Self</Text>
            <Text className="text-neutral-700">Purpose: Employment</Text>
            <Text className="text-neutral-700">
              Valid ID: PhilID (National ID)
            </Text>
          </View>

          {/* Fees */}
          <View className="pt-3 mt-6 border-t border-gray-300">
            <View className="flex-row justify-between">
              <Text className="font-medium text-neutral-800">
                Delivery Fee:
              </Text>
              <Text className="font-medium text-neutral-800">₱0.00</Text>
            </View>

            <View className="flex-row justify-between mt-1">
              <Text className="font-medium text-neutral-800">Print Fee:</Text>
              <Text className="font-medium text-neutral-800">₱100.00</Text>
            </View>

            <View className="flex-row justify-between pt-2 mt-1 border-t border-gray-300">
              <Text className="font-bold text-neutral-800">Total Fee:</Text>
              <Text className="font-bold text-neutral-800">₱100.00</Text>
            </View>
          </View>

          <View className="flex-row justify-center gap-5 mx-5 mt-8 mb-8 pb">
            <TouchableOpacity
              className="bg-[#313131] rounded-lg py-3 flex-1"
              onPress={() => router.push("/(docu)/BirthCertificate/Step4")}
            >
              <Text className="text-sm font-medium text-center text-white">
                Previous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 py-3 rounded-lg bg-primary"
              onPress={() => router.push("/(docu)/BirthCertificate/Submit")}
            >
              <Text className="text-sm font-medium text-center text-white">
                Submit Request
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Final;
