import { CameraView, useCameraPermissions } from 'expo-camera';
import { RotateCcw, X } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
    Alert,
    Image,
    Modal,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface CameraComponentProps {
  onPhotoTaken: (photoUri: string) => void;
  visible: boolean;
  onClose: () => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({
  onPhotoTaken,
  visible,
  onClose
}) => {
  const [facing, setFacing] = useState<'front' | 'back'>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="slide">
        <View className="flex-1 justify-center items-center p-6 bg-white">
          <Text className="text-lg text-center mb-4 text-primary">
            We need your permission to use the camera
          </Text>
          <TouchableOpacity
            className="bg-primary rounded-xl py-3 px-6"
            onPress={requestPermission}
          >
            <Text className="text-white font-semibold">Grant Permission</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-4 bg-neutral-200 rounded-xl py-3 px-6"
            onPress={onClose}
          >
            <Text className="text-primary font-semibold">Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
        });
        setPhoto(photo.uri);
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const retakePicture = () => {
    setPhoto(null);
  };

  const confirmPicture = () => {
    if (photo) {
      onPhotoTaken(photo);
      setPhoto(null);
      onClose();
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'front' ? 'back' : 'front'));
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1 bg-black">
        {!photo ? (
          <>
            <CameraView
              ref={cameraRef}
              className="flex-1"
              facing={facing}
              mode="picture"
            />
            <View className="absolute top-4 right-4">
              <TouchableOpacity
                onPress={onClose}
                className="bg-black/50 rounded-full p-2"
              >
                <X size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View className="absolute bottom-8 left-0 right-0 items-center">
              <TouchableOpacity
                onPress={takePicture}
                className="bg-white rounded-full w-16 h-16 items-center justify-center border-4 border-primary"
              />
              <TouchableOpacity
                onPress={toggleCameraFacing}
                className="mt-4 bg-black/50 rounded-full p-3"
              >
                <RotateCcw size={24} color="white" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Image source={{ uri: photo }} className="flex-1" resizeMode="contain" />
            <View className="absolute top-4 right-4">
              <TouchableOpacity
                onPress={onClose}
                className="bg-black/50 rounded-full p-2"
              >
                <X size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View className="absolute bottom-8 left-0 right-0 flex-row justify-center space-x-4">
              <TouchableOpacity
                onPress={retakePicture}
                className="bg-red-500 rounded-xl py-3 px-6"
              >
                <Text className="text-white font-semibold">Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmPicture}
                className="bg-primary rounded-xl py-3 px-6"
              >
                <Text className="text-white font-semibold">Use Photo</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default CameraComponent;