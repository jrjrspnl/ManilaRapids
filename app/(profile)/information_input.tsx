import { supabase } from "@/services/supabase-client";
import { Link } from "expo-router";
import { ArrowLeft, Camera } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Toast } from "toastify-react-native";
import CameraComponent from "../components/CameraComponent";
import Input from "../components/Input";
const Information_input = () => {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [personal, setPersonal] = useState<any>({
    firstName: "",
    middleName: "",
    lastName: "",
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

  const inputValidation = () => {
    return [
      personal.firstName,
      personal.lastName,
      personal.dateOfBirth,
      personal.placeOfBirth,
      personal.sex,
      personal.civilStatus,
      personal.citizenship,
      personal.profilePhoto,
      address.houseNoStreet,
      address.barangay,
      address.cityMunicipality,
      address.province,
      address.zipCode,
      address.region,
      contact.phonePrimary,
    ].some((field) => {
      if (field === null || field === undefined) return true;
      if (typeof field === "string") return !field.trim();
      return false;
    });
  };

  const isValidPhoneNumber = /^09\d{9}$/;
  const isValidLandline = /^(02|0\d{2})\d{7,8}$/;
  const isValidDate = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/; // MM/DD/YYYY format

  const formatDate = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, "");

    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4)
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(
      4,
      8
    )}`;
  };

  const handleSave = async (e: any) => {
    try {
      // Insert personal info
      const { error: personalError } = await supabase
        .from("personal")
        .upsert(personal);

      if (personalError) {
        Toast.show({
          type: "error",
          text1: "Error saving information",
          backgroundColor: "#e63946",
          textColor: "#fff",
          iconColor: "#fff",
          progressBarColor: "#e63946",
        });
        return;
      }

      // Insert address info
      const { error: addressError } = await supabase
        .from("address")
        .upsert(address);

      if (addressError) {
        Toast.show({
          type: "error",
          text1: "Error saving address",
          backgroundColor: "#e63946",
          textColor: "#fff",
          iconColor: "#fff",
          progressBarColor: "#e63946",
        });
        return;
      }

      // Insert contact info
      const { error: contactError } = await supabase
        .from("contact")
        .upsert(contact);

      if (contactError) {
        Toast.show({
          type: "error",
          text1: "Error saving contact",
          backgroundColor: "#e63946",
          textColor: "#fff",
          iconColor: "#fff",
          progressBarColor: "#e63946",
        });
        return;
      }
      Toast.show({
        type: "success",
        text1: "All data saved successfully!",
        backgroundColor: "#2ecc71",
        textColor: "#fff",
        iconColor: "#fff",
        progressBarColor: "#2ecc71",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserData = async (userId: string, userEmail: string) => {
    try {
      const { data: personalData, error: fetchPersonalDataError } =
        await supabase.from("personal").select("*").eq("id", userId).single();

      if (fetchPersonalDataError) {
        if (fetchPersonalDataError.code !== "PGRST116") {
          console.error(
            "Error fetching personal data:",
            fetchPersonalDataError
          );
        }
      } else if (personalData) {
        setPersonal(personalData);
      }

      const { data: addressData, error: fetchAddressDataError } = await supabase
        .from("address")
        .select("*")
        .eq("id", userId)
        .single();

      if (fetchAddressDataError) {
        if (fetchAddressDataError.code !== "PGRST116") {
          console.error("Error fetching address data:", fetchAddressDataError);
        }
      } else if (addressData) {
        setAddress(addressData);
      }

      const { data: contactData, error: fetchContactDataError } = await supabase
        .from("contact")
        .select("*")
        .eq("id", userId)
        .single();

      if (fetchContactDataError) {
        if (fetchContactDataError.code !== "PGRST116") {
          console.error("Error fetching contact data:", fetchContactDataError);
        }
        setContact((prev) => ({ ...prev, email: userEmail }));
      } else if (contactData) {
        setContact({ ...contactData, email: userEmail });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      Toast.show({
        type: "error",
        text1: "An unexpected error occurred. Please try again.",
        backgroundColor: "#e63946",
        textColor: "#fff",
        iconColor: "#fff",
        progressBarColor: "#e63946",
      });
    }
  };

  useEffect(() => {
    const getUserId = async () => {
      const {
        data: { user },
        error: getPersonalDataError,
      } = await supabase.auth.getUser();

      if (getPersonalDataError) {
        console.error("Error getting user:", getPersonalDataError);
        return;
      }

      if (!user) {
        console.error("No user found");
        return;
      }

      const email = user.email || "";
      setContact((prev) => ({ ...prev, email }));

      await fetchUserData(user.id, email);
    };

    getUserId();
  }, []);

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
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "red" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 15}
      >
        <ScrollView
          className="flex-1 bg-primary"
          keyboardShouldPersistTaps="handled"
        >
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
          <View className="bg-white">
            <Text className="px-4 pt-4 text-neutral-500">
              The personal information you provide will be used for verifying
              your identity and processing official documents. Please ensure all
              details are correct.
            </Text>
          </View>
          <View className="p-4 bg-white ">
            <View>
              <Text className="pb-2 mb-4 text-lg font-bold border-b text-primary border-accent-100">
                Personal Information
              </Text>

              <View className="items-center p-4 mb-6 rounded-lg bg-neutral-50">
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
                  <>
                    <TouchableOpacity
                      onPress={() => setIsCameraVisible(true)}
                      className="items-center justify-center w-24 h-24 bg-white border-2 border-dashed rounded-full border-primary"
                    >
                      <Camera size={32} color="#3b82f6" />
                      <Text className="mt-2 text-xs text-primary">
                        Add Photo
                      </Text>
                    </TouchableOpacity>
                    <Text className="mt-2 text-xs text-red-500">Required</Text>
                  </>
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
                    error="Required"
                    showError={personal.firstName.length === 0}
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
                    error="Required"
                    showError={personal.lastName.length === 0}
                  />
                </View>

                <View>
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
                </View>

                <View className="mb-2">
                  <Input
                    text="Suffix"
                    labelClassName="text-primary"
                    inputClassName="!mb-0"
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
                    inputClassName="!mb-0"
                    placeholder="MM/DD/YYYY"
                    value={formatDate(personal.dateOfBirth)}
                    onChangeText={(text) => {
                      const numbersOnly = text.replace(/[^0-9]/g, "");
                      const limited = numbersOnly.slice(0, 8);
                      setPersonal({ ...personal, dateOfBirth: limited });
                    }}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    error={
                      personal.dateOfBirth.length === 0
                        ? "Required"
                        : "Invalid date format"
                    }
                    showError={
                      personal.dateOfBirth.length === 0 ||
                      (personal.dateOfBirth.length > 0 &&
                        !isValidDate.test(formatDate(personal.dateOfBirth)))
                    }
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
                    error="Required"
                    showError={personal.placeOfBirth.length === 0}
                  />
                </View>

                <View className="mb-4">
                  <View className="flex-row justify-between flex-1">
                    <Text className="mb-1 text-sm font-bold text-primary">
                      Sex *
                    </Text>
                    {personal.sex.length === 0 && (
                      <Text className="mt-1 text-xs text-red-500">
                        Required
                      </Text>
                    )}
                  </View>

                  <View className="justify-center h-12 px-3 bg-white border border-gray-400 rounded-lg">
                    <Dropdown
                      style={{ flex: 1 }}
                      placeholderStyle={{ color: "#888", fontSize: 14 }}
                      selectedTextStyle={{ color: "#000", fontSize: 14 }}
                      itemTextStyle={{ fontSize: 14 }}
                      data={[
                        { label: "Male", value: "Male" },
                        { label: "Female", value: "Female" },
                      ]}
                      labelField="label"
                      valueField="value"
                      placeholder="Select Sex"
                      value={personal.sex}
                      onChange={(item) =>
                        setPersonal({ ...personal, sex: item.value })
                      }
                    />
                  </View>
                </View>

                <View className="mb-4">
                  <View className="flex-row justify-between flex-1">
                    <Text className="mb-1 text-sm font-bold text-primary">
                      Civil Status *
                    </Text>
                    {personal.civilStatus.length === 0 && (
                      <Text className="mt-1 text-xs text-red-500">
                        Required
                      </Text>
                    )}
                  </View>

                  <View className="justify-center h-12 px-3 bg-white border border-gray-400 rounded-lg">
                    <Dropdown
                      style={{ flex: 1 }}
                      placeholderStyle={{ color: "#888", fontSize: 14 }}
                      selectedTextStyle={{ color: "#000", fontSize: 14 }}
                      itemTextStyle={{ fontSize: 14 }}
                      data={[
                        { label: "Single", value: "Single" },
                        { label: "Married", value: "Married" },
                        { label: "Widowed", value: "Widowed" },
                        { label: "Separated", value: "Separated" },
                      ]}
                      labelField="label"
                      valueField="value"
                      placeholder="Select Civil Status"
                      value={personal.civilStatus}
                      onChange={(item) =>
                        setPersonal({ ...personal, civilStatus: item.value })
                      }
                    />
                  </View>
                </View>

                <View>
                  <Input
                    text="Citizenship *"
                    labelClassName="text-primary"
                    placeholder="Filipino, Dual Citizen, etc."
                    value={personal.citizenship}
                    onChangeText={(text) =>
                      setPersonal({ ...personal, citizenship: text })
                    }
                    autoCapitalize="characters"
                    error="Required"
                    showError={personal.citizenship.length === 0}
                  />
                </View>
              </View>
            </View>

            <View className="mt-5">
              <Text className="pb-2 mb-4 text-lg font-bold border-b text-primary border-accent-100">
                Address Information
              </Text>

              <View>
                <Input
                  text="House No. / Street *"
                  labelClassName="text-primary"
                  placeholder="e.g., 123 J.P. Rizal St."
                  value={address.houseNoStreet}
                  onChangeText={(text) =>
                    setAddress({ ...address, houseNoStreet: text })
                  }
                  autoCapitalize="characters"
                  error="Required"
                  showError={address.houseNoStreet.length === 0}
                />
              </View>

              <View>
                <Input
                  text="Barangay *"
                  labelClassName="text-primary"
                  placeholder="e.g., Barangay Poblacion"
                  value={address.barangay}
                  onChangeText={(text) =>
                    setAddress({ ...address, barangay: text })
                  }
                  autoCapitalize="characters"
                  error="Required"
                  showError={address.barangay.length === 0}
                />
              </View>

              <View>
                <Input
                  text="City / Municipality *"
                  labelClassName="text-primary"
                  placeholder="e.g., Makati City"
                  value={address.cityMunicipality}
                  onChangeText={(text) =>
                    setAddress({ ...address, cityMunicipality: text })
                  }
                  autoCapitalize="characters"
                  error="Required"
                  showError={address.cityMunicipality.length === 0}
                />
              </View>

              <View>
                <Input
                  text="Province *"
                  labelClassName="text-primary"
                  placeholder="e.g., Metro Manila"
                  value={address.province}
                  onChangeText={(text) =>
                    setAddress({ ...address, province: text })
                  }
                  autoCapitalize="characters"
                  error="Required"
                  showError={address.province.length === 0}
                />
              </View>

              <View>
                <Input
                  text="ZIP Code *"
                  labelClassName="text-primary"
                  placeholder="e.g., 1100"
                  value={address.zipCode}
                  onChangeText={(text) => {
                    const numbersOnly = text.replace(/[^0-9]/g, "");

                    const limited = numbersOnly.slice(0, 4);
                    setAddress({ ...address, zipCode: limited });
                  }}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  error={
                    address.zipCode.length === 0
                      ? "Required"
                      : "ZIP Code must be 4 digits"
                  }
                  showError={
                    address.zipCode.length === 0 ||
                    (address.zipCode.length > 0 && address.zipCode.length !== 4)
                  }
                />
              </View>

              <View>
                <Input
                  text="Region *"
                  labelClassName="text-primary"
                  placeholder="e.g., NCR"
                  value={address.region}
                  onChangeText={(text) =>
                    setAddress({ ...address, region: text })
                  }
                  autoCapitalize="characters"
                  error="Required"
                  showError={address.region.length === 0}
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
                  placeholder="09XXXXXXXXX"
                  value={contact.phonePrimary}
                  onChangeText={(text) => {
                    const numbersOnly = text.replace(/[^0-9]/g, "");
                    const limited = numbersOnly.slice(0, 11);
                    setContact({ ...contact, phonePrimary: limited });
                  }}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  error={
                    contact.phonePrimary.length === 0
                      ? "Required"
                      : "Invalid Phone No. Format"
                  }
                  showError={
                    contact.phonePrimary.length === 0 ||
                    (contact.phonePrimary.length > 0 &&
                      !isValidPhoneNumber.test(contact.phonePrimary))
                  }
                />
              </View>

              <View className="mb-2">
                <Input
                  text="Alternate Phone Number *"
                  labelClassName="text-primary"
                  inputClassName="!mb-0"
                  placeholder="09XXXXXXXXX"
                  value={contact.phoneAlternate}
                  onChangeText={(text) => {
                    const numbersOnly = text.replace(/[^0-9]/g, "");
                    const limited = numbersOnly.slice(0, 11);
                    setContact({ ...contact, phoneAlternate: limited });
                  }}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  error="Invalid Phone No. Format"
                  showError={
                    contact.phoneAlternate.length > 0 &&
                    !isValidPhoneNumber.test(contact.phoneAlternate)
                  }
                />
                <Text className="mt-1 text-xs text-neutral-500">Optional</Text>
              </View>

              <View>
                <Input
                  text="Email Address"
                  labelClassName="text-primary"
                  placeholder="email@example.com"
                  value={contact.email}
                  onChangeText={(text) =>
                    setContact({ ...contact, email: text })
                  }
                  autoCapitalize="none"
                  editable={false}
                  inputClassName="bg-gray-100 text-gray-600"
                />
              </View>

              <View className="mb-2">
                <Input
                  text="Telephone Number"
                  labelClassName="text-primary"
                  inputClassName="!mb-0"
                  placeholder="02XXXXXXXX"
                  value={contact.telephone}
                  onChangeText={(text) => {
                    const numbersOnly = text.replace(/[^0-9]/g, "");
                    const limited = numbersOnly.slice(0, 10);
                    setContact({ ...contact, telephone: limited });
                  }}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  error="Invalid Landline Format"
                  showError={
                    contact.telephone.length > 0 &&
                    !isValidLandline.test(contact.telephone)
                  }
                />
                <Text className="mt-1 text-xs text-neutral-500">
                  Optional (for landline users)
                </Text>
              </View>
            </View>
            <View>
              <Text className="pt-2 text-sm text-center text-neutral-500">
                By submitting,{" "}
                <Text className="font-bold text-primary">
                  I certify that the information provided is true and correct
                </Text>
                , and I consent to its use for official government document
                processing.
              </Text>
            </View>
            <TouchableOpacity
              className={`items-center py-4 mx-2 mt-10 mb-8 shadow-lg ${
                inputValidation()
                  ? "bg-gray-400 shadow-gray-400/25 rounded-lg"
                  : "bg-primary shadow-primary/25 rounded-lg"
              }`}
              onPress={handleSave}
              disabled={inputValidation()}
            >
              <Text className="text-lg font-semibold text-white">
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Information_input;
