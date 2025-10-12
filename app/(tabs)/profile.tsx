import { supabase } from "@/services/supabase-client";
import { Link, useRouter } from "expo-router";
import { ChevronRight, Clock, Lock, QrCode, User } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("User");
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");

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

      const { data: personalData } = await supabase
        .from("personal")
        .select("firstName,lastName,profilePhoto")
        .eq("id", user.id)
        .single();

      if (personalData) {
        setUserName(`${personalData.firstName} ${personalData.lastName}`);
        setProfilePhoto(personalData.profilePhoto || "");
        setIsProfileComplete(
          !!(personalData.firstName && personalData.lastName)
        );
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
          (payload) => {
            const updated = payload.new;
            setUserName(`${updated.firstName} ${updated.lastName}`);
            setProfilePhoto(updated.profilePhoto || "");
            setIsProfileComplete(!!(updated.firstName && updated.lastName));
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
        <Link href="/(profile)/information_input" asChild>
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-200">
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
        </Link>

        <Link href="/(profile)/history" asChild>
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-200">
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
        </Link>

        <Link href="/(profile)/change_password" asChild>
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-200">
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
        </Link>
      </View>

      <View className="items-center px-4 py-6 bg-gray-50">
        <Text className="mb-4 text-lg font-semibold text-primary">
          My QR Code
        </Text>

        <View className="items-center justify-center w-32 h-32 mb-3 bg-gray-200 rounded-lg">
          <QrCode size={50} color="#666" />
          <Text className="mt-2 text-xs text-gray-600">QR Code</Text>
        </View>
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
