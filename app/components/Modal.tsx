import { Modal, Text, View } from "react-native";
import { BackButton } from "../components/Button";

type CustomModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  title: string;
  children?: React.ReactNode;
};

const CustomModal = ({
  visible,
  onRequestClose,
  title,
  children,
}: CustomModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View className="items-center justify-center flex-1 bg-black/40">
        <View className="bg-white h-[80%] w-96 rounded-2xl">
          <View className="flex-row items-center p-6 mb-2 border-b border-gray-200">
            <BackButton onPress={onRequestClose} />
            <Text className="mx-auto text-xl font-bold text-primary">
              {title}
            </Text>
          </View>

          <View className="flex-1 p-5">{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
