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
const Step3 = () => {
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
              Step 3 of 4
            </Text>
            <View className="h-[2px] w-full bg-neutral-700 mt-3 rounded-full overflow-hidden">
              <View className="w-3/4 h-full bg-green-500" />
            </View>
          </View>

          <View>
            <Text className="mt-5 mb-4 text-2xl font-bold text-primary">
              Transactional Information
            </Text>
          </View>

          <View>
            <View>
              <Input
                text="Requestor's Tax Identification Number (TIN) if known"
                labelClassName="text-primary"
                placeholder="---_---_---_---"
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
                text="Relationship to the owner "
                labelClassName="text-primary"
                placeholder="Relationship (Self, Parent, etc.)"
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

            <View>
              <Input
                text="Primary Phone Number *"
                labelClassName="text-primary"
                placeholder="09XXXXXXXXX"
                keyboardType="numeric"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-2">
              <Input
                text="Telephone Number"
                labelClassName="text-primary"
                inputClassName="!mb-0"
                placeholder="02XXXXXXXX"
                keyboardType="numeric"
                autoCapitalize="none"
                error="Invalid Landline Format"
              />
              <Text className="mt-1 text-xs text-neutral-500">
                Optional (for landline users)
              </Text>
            </View>
          </View>

          <View className="flex-row justify-center gap-5 mx-5 mt-8 mb-8 pb">
            <TouchableOpacity
              className="bg-[#313131] rounded-lg py-3 flex-1"
              onPress={() => router.push("/(docu)/BirthCertificate/Step2")}
            >
              <Text className="text-sm font-medium text-center text-white">
                Previous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 py-3 rounded-lg bg-primary"
              onPress={() => router.push("/(docu)/BirthCertificate/Step4")}
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

export default Step3;
