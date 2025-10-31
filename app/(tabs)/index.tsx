import { supabase } from "@/services/supabase-client";
import { Link, useRouter } from "expo-router";
import {
  ArrowRight,
  HeartHandshake,
  PackageCheck,
  RefreshCw,
  ScrollText,
  ShieldCheck,
  Star,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Button, { IconButton } from "../components/Button";
export default function Index() {
  const Logo = require("../../assets/images/mrapids-logo-1024x1024.png");
  const Image1 = require("../../assets/images/image1.png");
  const Image2 = require("../../assets/images/image2.png");
  const router = useRouter();

  const [userName, setUserName] = useState("User");
  const [isProfileComplete, setIsProfileComplete] = useState(false);

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
    <ScrollView className="bg-white pt-7">
      <View className="flex-row items-start px-4 mb-4">
        <Image
          source={Logo}
          style={{ width: 100, height: 100, borderRadius: 9999 }}
        />
        <View className="flex-1">
          <Text className="text-2xl font-bold text-primary">
            Magandang Araw,
          </Text>
          <View className="flex-row items-center ">
            <Text className="text-xl font-semibold text-primary">
              {userName}{" "}
            </Text>
            {!isProfileComplete && (
              <Button
                containerClassName="px-3 py-1 !rounded-full items-center justify-center "
                textClassName="text-xs"
                onPress={() => router.push("/(tabs)/profile")}
                iconRight={<ArrowRight size={15} color="white" />}
              >
                Set Up Profile
              </Button>
            )}
          </View>
          {!isProfileComplete ? (
            <Text className="text-sm font-medium text-neutral-500">
              Upang makapagpatuloy, kailangan mo munang kumpletuhin ang iyong
              profile.
            </Text>
          ) : (
            <Button
              containerClassName="px-2 py-3 !rounded-full items-center justify-center w-32 mt-1"
              textClassName="text-sm"
              onPress={() => router.push("/(tabs)/profile")}
              iconRight={<ArrowRight size={15} color="white" />}
            >
              View Profile
            </Button>
          )}
        </View>
      </View>
      <View className="h-40 p-4 bg-[#F4F4F4] mb-2">
        <Text className="font-medium text-md text-primary">
          My Document Requests
        </Text>
        <View className="flex-row items-center justify-center gap-10 mt-5">
          <IconButton
            onPress={() => {
              router.push("/(profile)/history?tab=request");
            }}
            icon={<ScrollText color="white" />}
          >
            Requests
          </IconButton>
          <IconButton
            onPress={() => router.push("/(profile)/history?tab=toProcess")}
            icon={<RefreshCw color="white" />}
          >
            To Process
          </IconButton>
          <IconButton
            onPress={() => router.push("/(profile)/history?tab=toReceive")}
            icon={<PackageCheck color="white" />}
          >
            To Receive
          </IconButton>
          <IconButton
            onPress={() => router.push("/(profile)/history?tab=completed")}
            icon={<Star color="white" />}
          >
            To Rate
          </IconButton>
        </View>
      </View>

      <View className="p-4">
        <Text className="mb-4 text-xl font-bold text-primary">
          What would you like to request?
        </Text>
        <View className="gap-5">
          <Button
            containerClassName="py-5 !bg-[#F4F4F4] !rounded-lg "
            textClassName="!text-primary text-lg font-medium"
            withShadow={true}
            iconLeft={<ScrollText size={25} color="#1d3557" />}
            onPress={() => router.push("/(docu)/BirthCertificate/Upload")}
          >
            Birth Certificate
          </Button>
          <Button
            containerClassName="py-5 !bg-[#F4F4F4] !rounded-lg "
            textClassName="!text-primary text-lg font-medium"
            withShadow={true}
            iconLeft={<HeartHandshake size={25} color="#1d3557" />}
          >
            Community and Social Services
          </Button>
          <Button
            containerClassName="py-5 !bg-[#F4F4F4] !rounded-lg "
            textClassName="!text-primary text-lg font-medium"
            withShadow={true}
            iconLeft={<ShieldCheck size={25} color="#1d3557" />}
          >
            Clearance and Permits
          </Button>
          <View className="items-end">
            <View className="flex-row ml">
              <Link href="/(tabs)/documents">
                <Text className="mr-1 text-neutral-400 text-medium">
                  See more
                </Text>
              </Link>
              <ArrowRight color="#A3A3A3" size={20}></ArrowRight>
            </View>

            {/* <Button
              containerClassName="w-32 py-2 !rounded-full items-center justify-center"
              textClassName="text-sm"
              onPress={() => router.push("/(tabs)/documents")}
              iconRight={<ArrowRight size={15} color="white" />}
            >
              See more
            </Button> */}
          </View>
        </View>
      </View>

      <View className="p-4">
        <Text className="mb-4 text-xl font-bold text-primary">
          Discover Latest News
        </Text>
        <View className="gap-2 pb-10">
          <Image source={Image1} className="object-cover w-full mb-2"></Image>
          <Text className="text-lg font-bold">
            BREAKING NEWS: Yorme Isko talks to the troops: Serve the people,
            protect public welfare
          </Text>
          <Text className="text-xs text-neutral-400 mb">
            September 21, 2025
          </Text>
          <Text className="text-md text-neutral-600 mb">
            At 4:30 a.m. on Sunday, September 21, Manila City Mayor Francisco
            Isko Moreno Domagoso addressed city government workers ahead of
            their deployment to 14 protest sites across the capital, reminding
            them that their mission is to serve the public. The deployment
            covers Manila Health Department (MHD)...
          </Text>
        </View>
        <View className="gap-2 pb-10">
          <Image source={Image2} className="object-cover w-full mb-2"></Image>
          <Text className="text-lg font-bold">
            BREAKING NEWS: Saludo sa ating magigiting na kapulisan!
          </Text>
          <Text className="text-xs text-neutral-400 mb">
            September 21, 2025
          </Text>
          <Text className="text-md text-neutral-600 mb">
            Sa kabila ng tensyon na sumiklab sa Ayala Bridge sa pagitan ng mga
            tauhan ng Manila Police District (MPD) at mga raliyista, nanindigan
            ang ating kapulisan na ipatupad ang maximum tolerance. Hindi sila
            nagpadaig sa agresibong hakbang ng mga nagpoprotesta na naghayag ng
            kanilang galit laban sa korapsyon kaugnay ng flood control scam...
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
