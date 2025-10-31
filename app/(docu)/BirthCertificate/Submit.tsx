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
  Image,
} from "react-native";
const Submit = () => {
  const successImage = require("../../../assets/images/sucess.png");
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
        <View className="items-center justify-center flex-1 px-6 mt-20">
          <View className="items-center mb-6">
            <Image source={successImage} style={{ width: 200, height: 200 }} />

            <Text className="mb-2 text-2xl font-bold text-green-600">
              Request Submitted!
            </Text>
            <Text className="text-center text-neutral-700">
              Thank you for submitting your birth certificate request. Our team
              will review your application and contact you once it’s ready for
              release.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/(tabs)")}
            className="px-6 py-3 mt-8 rounded-full bg-primary"
          >
            <Text className="font-semibold text-center text-white">
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Submit;
