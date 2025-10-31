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
import { Dropdown } from "react-native-element-dropdown";
import Input from "@/app/components/Input";
const Step1 = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView
        className="flex-1 bg-primary"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row items-center px-4 py-4 bg-primary">
          <Link href="/(docu)/BirthCertificate/Upload" asChild>
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
              Step 1 of 4
            </Text>
            <View className="h-[2px] w-full bg-neutral-700 mt-3 rounded-full overflow-hidden">
              <View className="w-1/4 h-full bg-green-500" />
            </View>
          </View>

          <View>
            <Text className="mt-5 mb-5 text-2xl font-bold text-primary">
              Owner’s Personal Information
            </Text>
          </View>

          <View>
            <View>
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

            <View>
              <Input
                text="Suffix "
                labelClassName="text-primary"
                placeholder="Enter suffix name"
                autoCapitalize="characters"
              />
            </View>

            <View className="mb-4">
              <View className="flex-row justify-between flex-1">
                <Text className="mb-1 text-sm font-bold text-primary">Sex</Text>
              </View>

              <View className="justify-center h-12 px-3 border border-gray-400 rounded-lg ">
                <Dropdown
                  style={{ flex: 1 }}
                  placeholderStyle={{ color: "#888", fontSize: 14 }}
                  selectedTextStyle={{ color: "#000", fontSize: 14 }}
                  itemTextStyle={{ fontSize: 14 }}
                  data={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                  ]}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Sex"
                  onChange={() => ""}
                />
              </View>
            </View>

            <View className="mb-2">
              <Input
                text="Date of Birth"
                labelClassName="text-primary"
                inputClassName="!mb-0"
                placeholder="MM/DD/YYYY"
                keyboardType="numeric"
                autoCapitalize="none"
              />
              <Text className="mt-1 text-xs text-neutral-500">
                Format: MM/DD/YYYY
              </Text>
            </View>

            <View>
              <Input
                text="Place of Birth"
                labelClassName="text-primary"
                placeholder="e.g., Quezon City, Metro Manila"
                autoCapitalize="characters"
                error="Required"
              />
            </View>

            <View>
              <Input
                text="Region"
                labelClassName="text-primary"
                placeholder="e.g., NCR"
                autoCapitalize="characters"
                error="Required"
              />
            </View>

            <View>
              <Input
                text="Province"
                labelClassName="text-primary"
                placeholder="e.g., Metro Manila"
                autoCapitalize="characters"
              />
            </View>

            <View>
              <Input
                text="City / Municipality *"
                labelClassName="text-primary"
                placeholder="e.g., Makati City"
                autoCapitalize="characters"
              />
            </View>
          </View>

          <View className="flex-row justify-center gap-5 mx-5 mt-8 mb-8 pb">
            <TouchableOpacity className="bg-[#313131] rounded-lg py-3 flex-1">
              <Text className="text-sm font-medium text-center text-white">
                Previous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 py-3 rounded-lg bg-primary"
              onPress={() => router.push("/(docu)/BirthCertificate/Step2")}
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

export default Step1;
