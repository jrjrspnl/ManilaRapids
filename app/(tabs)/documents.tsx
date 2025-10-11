import {
  Baby,
  Heart,
  HeartHandshake,
  PhilippinePeso,
  ScrollText,
  ShieldCheck,
} from "lucide-react-native";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Button from "../components/Button";
import CustomModal from "../components/Modal";

const Documents = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);

  const openModal = (type: string) => {
    setModalType(type);
    setModalVisible(true);
  };

  const modalContent: Record<string, { title: string; body: React.ReactNode }> =
    {
      civil: {
        title: "Civil Registry Documents",
        body: (
          <>
            <Button
              containerClassName="mb-3 py-5 !bg-[#F4F4F4] !rounded-lg border border-gray-200"
              textClassName="!text-primary text-md font-bold"
              iconLeft={<Baby size={25} color="#1d3557" />}
              onPress={() => {}}
            >
              Birth Certificate
            </Button>
            <Button
              containerClassName="mb-3 py-5 !bg-[#F4F4F4] !rounded-lg border border-gray-200"
              textClassName="!text-primary text-md font-bold"
              iconLeft={<Heart size={25} color="#1d3557" />}
              onPress={() => {}}
            >
              Marriage Certificate
            </Button>
          </>
        ),
      },
      services: {
        title: "Community and Social Services",
        body: (
          <>
            <Text className="text-base">
              This is where social services info goes.
            </Text>
          </>
        ),
      },
      clearance: {
        title: "Clearance and Permits",
        body: (
          <>
            <Text className="text-base">
              This is where permit application forms go.
            </Text>
          </>
        ),
      },
      tax: {
        title: "Tax and Financial Documents",
        body: (
          <>
            <Text className="text-base">
              This is where tax document details go.
            </Text>
          </>
        ),
      },
    };

  return (
    <View className="flex-1 p-5 pt-10 bg-white">
      <Text className="mb-5 text-xl font-bold text-primary">
        What would you like to request?
      </Text>

      <View className="gap-5">
        <Button
          iconLeft={<ScrollText size={25} color="#1d3557" />}
          onPress={() => openModal("civil")}
          containerClassName="py-5 !bg-[#F4F4F4] !rounded-lg"
          textClassName="!text-primary text-lg font-medium"
          withShadow={true}
        >
          Civil Registry Documents
        </Button>

        <Button
          iconLeft={<HeartHandshake size={25} color="#1d3557" />}
          onPress={() => openModal("services")}
          containerClassName="py-5 !bg-[#F4F4F4] !rounded-lg"
          textClassName="!text-primary text-lg font-medium"
          withShadow={true}
        >
          Community and Social Services
        </Button>

        <Button
          iconLeft={<ShieldCheck size={25} color="#1d3557" />}
          onPress={() => openModal("clearance")}
          containerClassName="py-5 !bg-[#F4F4F4] !rounded-lg"
          textClassName="!text-primary text-lg font-medium"
          withShadow={true}
        >
          Clearance and Permits
        </Button>

        <Button
          iconLeft={<PhilippinePeso size={25} color="#1d3557" />}
          onPress={() => openModal("tax")}
          containerClassName="py-5 !bg-[#F4F4F4] !rounded-lg"
          textClassName="!text-primary text-lg font-medium"
          withShadow={true}
        >
          Tax and Financial Documents
        </Button>
      </View>

      {modalType && (
        <CustomModal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          title={modalContent[modalType].title}
        >
          {modalContent[modalType].body}
        </CustomModal>
      )}
    </View>
  );
};

export default Documents;
