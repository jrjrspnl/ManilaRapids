import CameraComponent from "@/app/components/CameraComponent";
import { Link, router } from "expo-router";
import { ArrowLeft, Camera, ImagePlus } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const Upload = () => {
  const [showScanner, setShowScanner] = useState(false);

  const handleQRScan = (data: string) => {
    try {
      const parsedData = JSON.parse(data);

      // Navigate to Step1 with the scanned data
      router.push({
        pathname: "/(docu)/BirthCertificate/Step1",
        params: { qrData: data },
      });
    } catch (error) {
      Alert.alert("Invalid QR Code", "The scanned QR code is not valid.");
    }
  };

  return (
    <View>
      <CameraComponent
        visible={showScanner}
        onClose={() => setShowScanner(false)}
        onQRScanned={handleQRScan}
        mode="qr"
      />

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

      <View className="px-5 mt-10">
        <View>
          <Text className="text-2xl font-bold text-primary">
            Upload a photo of your QR code
          </Text>
          <Text className="mt-2 text-base text-gray-600">
            Your QR will be used to automatically fill in your personal
            information for this document request. Please make sure the code is
            clear and readable.
          </Text>
        </View>

        <View className="mt-5">
          <TouchableOpacity activeOpacity={0.8}>
            <View className="items-center justify-center h-64 border-2 border-solid rounded-2xl border-primary/70 bg-neutral-200">
              <ImagePlus color="grey" />
              <Text className="my-2 text-neutral-500">Select file</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center my-5">
          <View className="flex-1 h-[1px] bg-gray-300" />
          <Text className="mx-3 font-medium text-gray-400">or</Text>
          <View className="flex-1 h-[1px] bg-gray-300" />
        </View>

        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            className="py-3 rounded-full bg-primary"
            onPress={() => setShowScanner(true)}
          >
            <View className="flex-row items-center justify-center gap-2">
              <Camera color="white" />
              <Text className="font-medium text-white">
                Open Camera & Scan QR
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Upload;
