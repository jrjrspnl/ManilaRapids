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
import { Dropdown } from "react-native-element-dropdown";
const Step4 = () => {
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
              Step 4 of 4
            </Text>
            <View className="h-[2px] w-full bg-neutral-700 mt-3 rounded-full overflow-hidden">
              <View className="h-full bg-green-500 w-4/4" />
            </View>
          </View>

          <View>
            <Text className="mt-5 mb-4 text-2xl font-bold text-primary">
              Requestor’s Information
            </Text>
          </View>

          <View>
            <View>
              <Input
                text="Please specify country if born abroad only "
                labelClassName="text-primary"
                placeholder="_"
                autoCapitalize="characters"
              />
            </View>

            <View>
              <Input
                text="Birth Reference Number(BReN) if known "
                labelClassName="text-primary"
                placeholder="_"
                autoCapitalize="characters"
              />
            </View>

            <View>
              <Input
                text="Hospital Name "
                labelClassName="text-primary"
                placeholder="_"
                autoCapitalize="characters"
              />
            </View>

            <View className="mb-4">
              <View className="flex-row justify-between flex-1">
                <Text className="mb-1 text-sm font-bold text-primary">
                  Registered Late?(if Yes)
                </Text>
              </View>

              <View className="justify-center h-12 px-3 border border-gray-400 rounded-lg ">
                <Dropdown
                  style={{ flex: 1 }}
                  placeholderStyle={{ color: "#888", fontSize: 14 }}
                  selectedTextStyle={{ color: "#000", fontSize: 14 }}
                  itemTextStyle={{ fontSize: 14 }}
                  data={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                  labelField="label"
                  valueField="value"
                  placeholder="--Select--"
                  onChange={() => ""}
                />
              </View>
            </View>

            <View className="mb-4">
              <View className="flex-row justify-between flex-1">
                <Text className="mb-1 text-sm font-bold text-primary">
                  No. of Copies
                </Text>
              </View>

              <View className="justify-center h-12 px-3 border border-gray-400 rounded-lg ">
                <Dropdown
                  style={{ flex: 1 }}
                  placeholderStyle={{ color: "#888", fontSize: 14 }}
                  selectedTextStyle={{ color: "#000", fontSize: 14 }}
                  itemTextStyle={{ fontSize: 14 }}
                  data={[
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                  ]}
                  labelField="label"
                  valueField="value"
                  placeholder="--Select--"
                  onChange={() => ""}
                />
              </View>
            </View>

            <View className="mb-4">
              <View className="flex-row justify-between flex-1">
                <Text className="mb-1 text-sm font-bold text-primary">
                  Purpose
                </Text>
              </View>

              <View className="justify-center h-12 px-3 border border-gray-400 rounded-lg">
                <Dropdown
                  style={{ flex: 1 }}
                  placeholderStyle={{ color: "#888", fontSize: 14 }}
                  selectedTextStyle={{ color: "#000", fontSize: 14 }}
                  itemTextStyle={{ fontSize: 14 }}
                  data={[
                    { label: "Employment", value: "Employment" },
                    {
                      label: "School Requirement",
                      value: "School Requirement",
                    },
                    {
                      label: "Marriage Requirement",
                      value: "Marriage Requirement",
                    },
                    {
                      label: "Personal Record / Copy",
                      value: "Personal Record / Copy",
                    },
                    {
                      label: "Government Requirement",
                      value: "Government Requirement",
                    },
                    { label: "Others", value: "Others" },
                  ]}
                  labelField="label"
                  valueField="value"
                  placeholder="-- Select Purpose --"
                  onChange={() => ""}
                />
              </View>
            </View>

            <View className="mb-4">
              <View className="flex-row justify-between flex-1">
                <Text className="mb-1 text-sm font-bold text-primary">
                  Valid ID Present Upon Claiming
                </Text>
              </View>

              <View className="justify-center h-12 px-3 border border-gray-400 rounded-lg">
                <Dropdown
                  style={{ flex: 1 }}
                  placeholderStyle={{ color: "#888", fontSize: 14 }}
                  selectedTextStyle={{ color: "#000", fontSize: 14 }}
                  itemTextStyle={{ fontSize: 14 }}
                  data={[
                    { label: "PhilID (National ID)", value: "PhilID" },
                    { label: "Passport", value: "Passport" },
                    { label: "Driver’s License", value: "Driver’s License" },
                    { label: "SSS/UMID", value: "SSS/UMID" },
                    { label: "Voter’s ID", value: "Voter’s ID" },
                  ]}
                  labelField="label"
                  valueField="value"
                  placeholder="-- Select Valid ID --"
                  onChange={() => ""}
                />
              </View>
            </View>
          </View>

          <View className="flex-row justify-center gap-5 mx-5 mt-8 mb-8 pb">
            <TouchableOpacity
              className="bg-[#313131] rounded-lg py-3 flex-1"
              onPress={() => router.push("/(docu)/BirthCertificate/Step3")}
            >
              <Text className="text-sm font-medium text-center text-white">
                Previous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 py-3 rounded-lg bg-primary"
              onPress={() => router.push("/(docu)/BirthCertificate/Final")}
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

export default Step4;
