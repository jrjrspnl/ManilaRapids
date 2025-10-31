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
import Input from "@/app/components/Input";
const Step2 = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <ScrollView
        className="flex-1 bg-primary"
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

        <View className="px-4 pb-10 bg-white">
          <View>
            <Text className="mx-auto mt-4 text-lg font-medium text-neutral-400">
              Step 2 of 4
            </Text>
            <View className="h-[2px] w-full bg-neutral-700 mt-3 rounded-full overflow-hidden">
              <View className="w-2/4 h-full bg-green-500" />
            </View>
          </View>

          <View>
            <Text className="mt-5 mb-4 text-2xl font-bold text-primary">
              Owner’s Parent’s Name
            </Text>
          </View>

          <View>
            <View>
              <Text className="text-sm font-medium text-neutral-400">
                Document Owner Father’s Name
              </Text>
              <Input
                text="First Name "
                labelClassName="text-primary"
                placeholder="Enter first name"
                autoCapitalize="characters"
              />
            </View>

            <View>
              <Input
                text="Last Name "
                labelClassName="text-primary"
                placeholder="Enter last name"
                autoCapitalize="characters"
              />
            </View>

            <View>
              <Input
                text="Middle Name "
                labelClassName="text-primary"
                placeholder="Enter middle name"
                autoCapitalize="characters"
              />
            </View>

            <View className="mt-4">
              <Text className="text-sm font-medium text-neutral-400">
                Document Owner Mother’s Name
              </Text>
              <Input
                text="First Name "
                labelClassName="text-primary"
                placeholder="Enter first name"
                autoCapitalize="characters"
              />
            </View>

            <View>
              <Input
                text="Last Name "
                labelClassName="text-primary"
                placeholder="Enter last name"
                autoCapitalize="characters"
              />
            </View>

            <View>
              <Input
                text="Middle Name "
                labelClassName="text-primary"
                placeholder="Enter middle name"
                autoCapitalize="characters"
              />
            </View>
          </View>

          <View className="flex-row justify-center gap-5 mx-5 mt-8 mb-8 pb">
            <TouchableOpacity
              className="bg-[#313131] rounded-lg py-3 flex-1"
              onPress={() => router.push("/(docu)/BirthCertificate/Step1")}
            >
              <Text className="text-sm font-medium text-center text-white">
                Previous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 py-3 rounded-lg bg-primary"
              onPress={() => router.push("/(docu)/BirthCertificate/Step3")}
            >
              <Text className="text-sm font-medium text-center text-white">
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Step2;
