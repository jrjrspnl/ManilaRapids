import { supabase } from "@/services/supabase-client";
import { useRouter } from "expo-router";
import {
  ChevronRight,
  Clock,
  Download,
  Lock,
  QrCode,
  User,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

const Profile = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("User");
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [qrData, setQrData] = useState("");
  const [isLoadingQR, setIsLoadingQR] = useState(true);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error logging out:", error.message);
    } else {
      router.replace("/(auth)/Login");
    }
  };

  useEffect(() => {
    let subscription: any;

    const fetchUserProfile = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) return;

      // Fetch personal data
      const { data: personalData } = await supabase
        .from("personal")
        .select("*")
        .eq("id", user.id)
        .single();

      // Fetch address data
      const { data: addressData } = await supabase
        .from("address")
        .select("*")
        .eq("id", user.id)
        .single();

      // Fetch contact data
      const { data: contactData } = await supabase
        .from("contact")
        .select("*")
        .eq("id", user.id)
        .single();

      if (personalData) {
        setUserName(`${personalData.firstName} ${personalData.lastName}`);
        setProfilePhoto(personalData.profilePhoto || "");
        setIsProfileComplete(
          !!(personalData.firstName && personalData.lastName)
        );

        // Generate QR code data
        const qrCodeData = JSON.stringify({
          userId: user.id,
          personal: personalData,
          address: addressData || {},
          contact: contactData || {},
          generatedAt: new Date().toISOString(),
        });
        setQrData(qrCodeData);
        setIsLoadingQR(false);
      }

      subscription = supabase
        .channel(`personal_updates_user_${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "personal",
            filter: `id=eq.${user.id}`,
          },
          async (payload) => {
            const updated = payload.new;
            setUserName(`${updated.firstName} ${updated.lastName}`);
            setProfilePhoto(updated.profilePhoto || "");
            setIsProfileComplete(!!(updated.firstName && updated.lastName));

            // Refetch all data for QR code
            const { data: addressData } = await supabase
              .from("address")
              .select("*")
              .eq("id", user.id)
              .single();

            const { data: contactData } = await supabase
              .from("contact")
              .select("*")
              .eq("id", user.id)
              .single();

            const qrCodeData = JSON.stringify({
              userId: user.id,
              personal: updated,
              address: addressData || {},
              contact: contactData || {},
              generatedAt: new Date().toISOString(),
            });
            setQrData(qrCodeData);
          }
        )
        .subscribe();
    };

    fetchUserProfile();

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  return (
    <ScrollView className="bg-white">
      <View className="items-center px-4 pt-10 bg-primary">
        {profilePhoto ? (
          <Image
            source={{ uri: profilePhoto }}
            className="w-24 h-24 mb-5 rounded-full"
          />
        ) : (
          <View className="items-center justify-center w-24 h-24 mb-5 rounded-full bg-neutral-300">
            <User size={40} color="#666" />
          </View>
        )}

        <View className="flex-row items-center w-full max-w-xs px-4 py-3 mb-5 bg-white rounded-lg">
          <View className="flex-1">
            <Text className="text-sm text-gray-600">My Name</Text>
            <Text className="text-lg font-semibold text-primary">
              {userName}
            </Text>
          </View>
          <ChevronRight size={20} color="#666" />
        </View>
      </View>

      <View className="px-4 py-0">
        <TouchableOpacity
          className="flex-row items-center justify-between py-4 border-b border-gray-200"
          onPress={() => router.push("/(profile)/information_input")}
        >
          <View className="flex-row items-center">
            <View className="items-center justify-center w-10 h-10 mr-3 rounded-full bg-primary">
              <User size={20} color="#ffffff" />
            </View>
            <View>
              <Text className="text-lg font-semibold text-primary">
                My Information
              </Text>
              <Text className="text-sm text-gray-600">
                View and update your personal details
              </Text>
            </View>
          </View>
          <ChevronRight size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-between py-4 border-b border-gray-200"
          onPress={() => router.push("/(profile)/history")}
        >
          <View className="flex-row items-center">
            <View className="items-center justify-center w-10 h-10 mr-3 rounded-full bg-primary">
              <Clock size={20} color="#ffffff" />
            </View>
            <View>
              <Text className="text-lg font-semibold text-primary">
                History
              </Text>
              <Text className="text-sm text-gray-600">
                View your request history
              </Text>
            </View>
          </View>
          <ChevronRight size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-between py-4 border-b border-gray-200"
          onPress={() => router.push("/(profile)/change_password")}
        >
          <View className="flex-row items-center">
            <View className="items-center justify-center w-10 h-10 mr-3 rounded-full bg-primary">
              <Lock size={20} color="#ffffff" />
            </View>
            <View>
              <Text className="text-lg font-semibold text-primary">
                Change Password
              </Text>
              <Text className="text-sm text-gray-600">
                Update your password
              </Text>
            </View>
          </View>
          <ChevronRight size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View className="items-center px-4 py-6 bg-gray-50">
        <Text className="mb-4 text-lg font-semibold text-primary">
          My QR Code
        </Text>

        {isLoadingQR && (
          <View className="items-center justify-center w-48 h-48 bg-white rounded-lg">
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text className="mt-2 text-sm text-gray-600">Generating QR...</Text>
          </View>
        )}

        {!isLoadingQR && qrData && (
          <View className="p-4 bg-white rounded-lg shadow-sm">
            <QRCode
              value={qrData}
              size={200}
              backgroundColor="white"
              color="black"
            />
            <Text className="mt-3 text-xs text-center text-gray-600">
              Scan to view your information
            </Text>
            <TouchableOpacity className="flex-row items-center justify-center px-6 py-3 mt-4 rounded-lg bg-primary">
              <>
                <Download size={20} color="#ffffff" />
                <Text className="ml-2 text-base font-semibold text-white">
                  Download QR code
                </Text>
              </>
            </TouchableOpacity>
          </View>
        )}

        {!isLoadingQR && !qrData && (
          <View className="items-center justify-center w-48 h-48 bg-gray-200 rounded-lg">
            <QrCode size={50} color="#666" />
            <Text className="mt-2 text-xs text-gray-600">
              Complete your profile to generate QR
            </Text>
          </View>
        )}
      </View>

      <View className="px-4 py-6">
        <TouchableOpacity className="items-center py-4 bg-red-500 rounded-lg">
          <Text
            onPress={handleLogout}
            className="text-lg font-semibold text-white"
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
