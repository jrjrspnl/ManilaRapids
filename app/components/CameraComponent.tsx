import { CameraView, useCameraPermissions } from "expo-camera";
import { RotateCcw, X } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CameraComponentProps {
  onPhotoTaken?: (photoUri: string) => void;
  onQRScanned?: (data: string) => void;
  visible: boolean;
  onClose: () => void;
  mode?: "photo" | "qr";
}

const CameraComponent: React.FC<CameraComponentProps> = ({
  onPhotoTaken,
  onQRScanned,
  visible,
  onClose,
  mode = "photo",
}) => {
  const [facing, setFacing] = useState<"front" | "back">(
    mode === "qr" ? "back" : "front"
  );
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="slide">
        <View className="items-center justify-center flex-1 p-6 bg-white">
          <Text className="mb-4 text-lg text-center text-primary">
            We need your permission to use the camera
          </Text>
          <TouchableOpacity
            className="px-6 py-3 bg-primary rounded-xl"
            onPress={requestPermission}
          >
            <Text className="font-semibold text-white">Grant Permission</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-6 py-3 mt-4 bg-neutral-200 rounded-xl"
            onPress={onClose}
          >
            <Text className="font-semibold text-primary">Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!scanned && onQRScanned) {
      setScanned(true);
      onQRScanned(data);
      setTimeout(() => {
        setScanned(false);
        onClose();
      }, 500);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
        });
        setPhoto(photo.uri);
      } catch (error) {
        Alert.alert("Error", "Failed to take picture");
      }
    }
  };

  const retakePicture = () => {
    setPhoto(null);
  };

  const confirmPicture = () => {
    if (photo && onPhotoTaken) {
      onPhotoTaken(photo);
      setPhoto(null);
      onClose();
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "front" ? "back" : "front"));
  };

  // QR Scanner Mode
  if (mode === "qr") {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={StyleSheet.absoluteFillObject}>
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFillObject}
            facing="back"
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          />

          <View className="absolute inset-0 items-center justify-center">
            <View className="w-64 h-64 border-4 border-white rounded-2xl" />
            <Text className="mt-4 text-lg font-semibold text-white">
              Align QR code within frame
            </Text>
          </View>

          <TouchableOpacity
            onPress={onClose}
            className="absolute p-3 rounded-full top-12 right-4 bg-black/50"
          >
            <X size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  // Photo Mode (existing functionality)
  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1 bg-black">
        {!photo ? (
          <>
            <CameraView
              ref={cameraRef}
              style={{ flex: 1 }}
              facing={facing}
              mode="picture"
              mirror={true}
            />
            <View className="absolute top-4 right-4">
              <TouchableOpacity
                onPress={onClose}
                className="p-2 rounded-full bg-black/50"
              >
                <X size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View className="absolute left-0 right-0 items-center bottom-8">
              <TouchableOpacity
                onPress={takePicture}
                className="items-center justify-center w-16 h-16 bg-white border-4 rounded-full border-primary"
              />
              <TouchableOpacity
                onPress={toggleCameraFacing}
                className="p-3 mt-4 rounded-full bg-black/50"
              >
                <RotateCcw size={24} color="white" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Image
              source={{ uri: photo }}
              className="flex-1"
              resizeMode="contain"
            />
            <View className="absolute top-4 right-4">
              <TouchableOpacity
                onPress={onClose}
                className="p-2 rounded-full bg-black/50"
              >
                <X size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View className="absolute left-0 right-0 flex-row justify-center gap-5 space-x-4 bottom-8">
              <TouchableOpacity
                onPress={retakePicture}
                className="px-6 py-3 bg-red-500 rounded-xl"
              >
                <Text className="font-semibold text-white">Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmPicture}
                className="px-6 py-3 bg-primary rounded-xl"
              >
                <Text className="font-semibold text-white">Use Photo</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default CameraComponent;
