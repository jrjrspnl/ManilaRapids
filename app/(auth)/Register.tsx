import { Link, router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Check, Eye, EyeClosed, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Toast } from "toastify-react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import { supabase } from "@/services/supabase-client";
const Register = () => {
  const params = useLocalSearchParams<{ email?: string }>();
  const emailParam = Array.isArray(params.email)
    ? params.email[0]
    : params.email;
  const Logo = require("../../assets/images/mrapids-logo-1024x1024.png");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: emailParam || "",
    password: "",
    confirmPassword: "",
  });

  const isValidEmail = /\S+@\S+\.\S+/;
  const passwordValidation = [
    { label: "At least 8 characters", test: /.{8,}/ },
    { label: "One uppercase letter", test: /[A-Z]/ },
    { label: "One lowercase letter", test: /[a-z]/ },
    { label: "At least one number", test: /[0-9]/ },
    { label: "At least special character", test: /[!@#$%^&*(),.?":{}|<>]/ },
  ];

  const validateForm = () => {
    const isEmailValid = isValidEmail.test(formData.email);
    const isPasswordValid = passwordValidation.every((rule) =>
      rule.test.test(formData.password)
    );
    const isConfirmValid = formData.password === formData.confirmPassword;
    return isEmailValid && isPasswordValid && isConfirmValid;
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { display_name: "User" },
        },
      });

      if (error) {
        Toast.show({
          type: "error",
          text1: "Failed to sign up",
          backgroundColor: "#e63946",
          textColor: "#fff",
          iconColor: "#fff",
          progressBarColor: "#e63946",
        });
        return;
      }

      router.push({
        pathname: "/(auth)/Verify",
        params: { email: formData.email },
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Unexpected error",
        backgroundColor: "#e63946",
        textColor: "#fff",
        iconColor: "#fff",
        progressBarColor: "#e63946",
      });
    }
  };

  const showPass = () => setShowPassword(!showPassword);
  const showConfirmPass = () => setConfirmPassword(!showConfirmPassword);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="justify-start flex-1 px-5 bg-white pt-7">
        <Link href="/(auth)/Login">
          <ArrowLeft size={24} color="#1d3557" strokeWidth={3} />
        </Link>
        <View className="items-center">
          <Image source={Logo} style={{ width: 100, height: 100 }} />
        </View>
        <View className="mt-2">
          <Text className="text-3xl font-medium text-primary">
            {`Let's get started!`}
          </Text>
          <Text className="max-w-xs mb-5 text-neutral-500">
            Register your account today using as valid email and password.
          </Text>

          <Input
            text="Email"
            placeholder="example@gmail.com"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            error="Invalid email"
            showError={
              formData.email.length > 0 && !isValidEmail.test(formData.email)
            }
          />
          <View>
            <Input
              text="Password"
              placeholder="Password"
              icon={showPassword ? Eye : EyeClosed}
              onIconPress={showPass}
              secureTextEntry={!showPassword}
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
            />
          </View>

          <Input
            text="Confirm Password"
            placeholder="Confirm Password"
            icon={showConfirmPassword ? Eye : EyeClosed}
            onIconPress={showConfirmPass}
            secureTextEntry={!showConfirmPassword}
            onChangeText={(text) =>
              setFormData({ ...formData, confirmPassword: text })
            }
            error="Password don't match"
            showError={
              formData.confirmPassword.length > 0 &&
              formData.password !== formData.confirmPassword
            }
          />
          {formData.password.length > 0 && (
            <View className="mb-2">
              {passwordValidation.map((rule, index) => {
                const passed = rule.test.test(formData.password);
                return (
                  <View key={index} className="flex-row items-center space-x-2">
                    {passed ? (
                      <Check color="green" size={16} />
                    ) : (
                      <X color="red" size={16} />
                    )}
                    <Text
                      className={`text-sm ${
                        passed ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {rule.label}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}

          <View className="px-5">
            <Text className="text-sm text-center text-neutral-600">
              By tapping{" "}
              <Text className="font-medium text-primary">
                Create new account
              </Text>{" "}
              , you agree with the
              <Text className="font-medium text-primary">
                {" "}
                Terms and Conditions{" "}
              </Text>
              and{" "}
              <Text className="font-medium text-primary">
                Privacy Notice
              </Text>{" "}
            </Text>
          </View>
          <View className="mt-3">
            <Button
              textClassName="flex-1"
              onPress={handleSubmit}
              disabled={!validateForm()}
            >
              Create new Account
            </Button>
          </View>
          <Text className="mt-5 text-sm text-center text-neutral-500">
            Already have an account?{" "}
            <Link href="/(auth)/Login">
              <Text className="font-semibold text-primary">Login here</Text>
            </Link>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
