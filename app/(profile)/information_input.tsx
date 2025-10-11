import { Link } from "expo-router";
import { ArrowLeft, Camera } from "lucide-react-native";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CameraComponent from "../components/CameraComponent";
import Input from "../components/Input";

const Information_input = () => {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");

  const [personal, setPersonal] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    suffix: "",
    dateOfBirth: "",
    placeOfBirth: "",
    sex: "",
    civilStatus: "",
    citizenship: "",
    profilePhoto: "", 
  });

  const [address, setAddress] = useState({
    houseNoStreet: "",
    barangay: "",
    cityMunicipality: "",
    province: "",
    zipCode: "",
    region: "",
  });

  const [contact, setContact] = useState({
    phonePrimary: "",
    phoneAlternate: "",
    email: "",
    telephone: "",
  });

  const handleSave = async (e: any) => {
    console.log("Personal:", personal);
    console.log("Address:", address);
    console.log("Contact:", contact);
    console.log("Profile Photo:", personal.profilePhoto);
  };

  const handlePhotoTaken = (photoUri: string) => {
    setProfilePhoto(photoUri);
    setPersonal({ ...personal, profilePhoto: photoUri }); 
    setIsCameraVisible(false);
  };

  return (
    <>
      {isCameraVisible && (
        <CameraComponent
          visible={isCameraVisible}
          onPhotoTaken={handlePhotoTaken}
          onClose={() => setIsCameraVisible(false)}
        />
      )}

      <ScrollView className="flex-1 bg-neutral-50">
        <View className="flex-row items-center px-4 py-4 bg-primary">
          <Link href="/(tabs)/profile" asChild>
            <TouchableOpacity>
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
          </Link>
          <Text className="flex-1 text-xl font-bold text-center text-white">
            My Information
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <View className="p-4 bg-white">
          <View className="mt-5">
            <Text className="pb-2 mb-4 text-lg font-bold border-b text-primary border-accent-100">
              Personal Information
            </Text>

            <View className="items-center mb-6 p-4 bg-neutral-50 rounded-lg">
              <Text className="mb-3 text-sm font-semibold text-primary">
                Profile Photo
              </Text>
              {personal.profilePhoto ? (
                <View className="items-center">
                  <Image
                    source={{ uri: personal.profilePhoto }}
                    className="w-24 h-24 mb-3 rounded-full"
                  />
                  <TouchableOpacity
                    onPress={() => setIsCameraVisible(true)}
                    className="px-4 py-2 bg-primary rounded-xl"
                  >
                    <Text className="text-sm text-white">Retake Photo</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => setIsCameraVisible(true)}
                  className="items-center justify-center w-24 h-24 border-2 border-dashed rounded-full border-primary bg-white"
                >
                  <Camera size={32} color="#3b82f6" />
                  <Text className="mt-2 text-xs text-primary">Add Photo</Text>
                </TouchableOpacity>
              )}
            </View>

            <View className="space-y-4">
              <View>
                <Input
                  text="First Name *"
                  labelClassName="text-primary"
                  placeholder="Enter first name"
                  value={personal.firstName}
                  onChangeText={(text) =>
                    setPersonal({ ...personal, firstName: text })
                  }
                  autoCapitalize="characters"
                />
              </View>

              <View>
                <Input
                  text="Last Name *"
                  labelClassName="text-primary"
                  placeholder="Enter last name"
                  value={personal.lastName}
                  onChangeText={(text) =>
                    setPersonal({ ...personal, lastName: text })
                  }
                  autoCapitalize="characters"
                />
              </View>

              <View className="mb-2">
                <Input
                  text="Middle Name"
                  labelClassName="text-primary"
                  inputClassName="mb-0"
                  placeholder="Enter middle name"
                  value={personal.middleName}
                  onChangeText={(text) =>
                    setPersonal({ ...personal, middleName: text })
                  }
                  autoCapitalize="characters"
                />
                <Text className="mt-1 text-xs text-neutral-500">
                  Enter only one letter
                </Text>
              </View>

              <View className="mb-2">
                <Input
                  text="Suffix"
                  labelClassName="text-primary"
                  inputClassName="mb-0"
                  placeholder="e.g., Jr., Sr., III"
                  value={personal.suffix}
                  onChangeText={(text) =>
                    setPersonal({ ...personal, suffix: text })
                  }
                  autoCapitalize="characters"
                />
                <Text className="mt-1 text-xs text-neutral-500">
                  Optional suffix
                </Text>
              </View>

              <View className="mb-2">
                <Input
                  text="Date of Birth *"
                  labelClassName="text-primary"
                  inputClassName="mb-0"
                  placeholder="MM/DD/YYYY"
                  value={personal.dateOfBirth}
                  onChangeText={(text) =>
                    setPersonal({ ...personal, dateOfBirth: text })
                  }
                  autoCapitalize="characters"
                />
                <Text className="mt-1 text-xs text-neutral-500">
                  Format: MM/DD/YYYY
                </Text>
              </View>

              <View>
                <Input
                  text="Place of Birth *"
                  labelClassName="text-primary"
                  placeholder="e.g., Quezon City, Metro Manila"
                  value={personal.placeOfBirth}
                  onChangeText={(text) =>
                    setPersonal({ ...personal, placeOfBirth: text })
                  }
                  autoCapitalize="characters"
                />
              </View>

              <View>
                <Input
                  text="Sex *"
                  labelClassName="text-primary"
                  placeholder="Male/Female"
                  value={personal.sex}
                  onChangeText={(text) =>
                    setPersonal({ ...personal, sex: text })
                  }
                  autoCapitalize="characters"
                />
              </View>

              <View>
                <Input
                  text="Civil Status"
                  labelClassName="text-primary"
                  placeholder="Single, Married, Widowed, Separated"
                  value={personal.civilStatus}
                  onChangeText={(text) =>
                    setPersonal({ ...personal, civilStatus: text })
                  }
                  autoCapitalize="characters"
                />
              </View>

              <View>
                <Input
                  text="Citizenship"
                  labelClassName="text-primary"
                  placeholder="Filipino, Dual Citizen, etc."
                  value={personal.citizenship}
                  onChangeText={(text) =>
                    setPersonal({ ...personal, citizenship: text })
                  }
                  autoCapitalize="characters"
                />
              </View>
            </View>
          </View>

          {/* Rest of your code remains the same */}
          <View className="mt-5">
            <Text className="pb-2 mb-4 text-lg font-bold border-b text-primary border-accent-100">
              Address Information
            </Text>

            <View>
              <Input
                text="House No. / Street"
                labelClassName="text-primary"
                placeholder="e.g., 123 J.P. Rizal St."
                value={address.houseNoStreet}
                onChangeText={(text) =>
                  setAddress({ ...address, houseNoStreet: text })
                }
                autoCapitalize="characters"
              />
            </View>

            <View>
              <Input
                text="Barangay"
                labelClassName="text-primary"
                placeholder="e.g., Barangay Poblacion"
                value={address.barangay}
                onChangeText={(text) =>
                  setAddress({ ...address, barangay: text })
                }
                autoCapitalize="characters"
              />
            </View>

            <View>
              <Input
                text="City / Municipality"
                labelClassName="text-primary"
                placeholder="e.g., Makati City"
                value={address.cityMunicipality}
                onChangeText={(text) =>
                  setAddress({ ...address, cityMunicipality: text })
                }
                autoCapitalize="characters"
              />
            </View>

            <View>
              <Input
                text="Province"
                labelClassName="text-primary"
                placeholder="e.g., Metro Manila"
                value={address.province}
                onChangeText={(text) =>
                  setAddress({ ...address, province: text })
                }
                autoCapitalize="characters"
              />
            </View>

            <View>
              <Input
                text="ZIP Code"
                labelClassName="text-primary"
                placeholder="e.g., 1100"
                value={address.zipCode}
                onChangeText={(text) =>
                  setAddress({ ...address, zipCode: text })
                }
                autoCapitalize="none"
              />
            </View>

            <View>
              <Input
                text="Region"
                labelClassName="text-primary"
                placeholder="e.g., NCR"
                value={address.region}
                onChangeText={(text) =>
                  setAddress({ ...address, region: text })
                }
                autoCapitalize="characters"
              />
            </View>
          </View>

          <View className="mt-5">
            <Text className="pb-2 mb-4 text-lg font-bold border-b text-primary border-accent-100">
              Contact Information
            </Text>

            <View>
              <Input
                text="Primary Phone Number *"
                labelClassName="text-primary"
                placeholder="(XXX) XXX-XXXX"
                value={contact.phonePrimary}
                onChangeText={(text) =>
                  setContact({ ...contact, phonePrimary: text })
                }
                autoCapitalize="characters"
              />
            </View>

            <View className="mb-2">
              <Input
                text="Alternate Phone Number"
                labelClassName="text-primary"
                inputClassName="mb-0"
                placeholder="(XXX) XXX-XXXX"
                value={contact.phoneAlternate}
                onChangeText={(text) =>
                  setContact({ ...contact, phoneAlternate: text })
                }
                autoCapitalize="characters"
              />
              <Text className="mt-1 text-xs text-neutral-500">Optional</Text>
            </View>

            <View>
              <Input
                text="Email Address"
                labelClassName="text-primary"
                placeholder="email@example.com"
                value={contact.email}
                onChangeText={(text) => setContact({ ...contact, email: text })}
                autoCapitalize="none"
              />
            </View>

            <View className="mb-2">
              <Input
                text="Telephone Number"
                labelClassName="text-primary"
                inputClassName="mb-0"
                placeholder="(XXX) XXX-XXXX"
                value={contact.telephone}
                onChangeText={(text) =>
                  setContact({ ...contact, telephone: text })
                }
                autoCapitalize="none"
              />
              <Text className="mt-1 text-xs text-neutral-500">
                Optional (for landline users)
              </Text>
            </View>
          </View>

          <TouchableOpacity
            className="items-center py-4 mx-2 mt-10 mb-8 shadow-lg bg-primary rounded-xl shadow-primary/25"
            onPress={handleSave}
          >
            <Text className="text-lg font-semibold text-white">
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default Information_input;