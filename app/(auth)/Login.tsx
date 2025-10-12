import { router } from "expo-router";
import { Eye, EyeClosed } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Toast } from "toastify-react-native";

import { supabase } from "@/services/supabase-client";
import Button from "../components/Button";
import Input from "../components/Input";
const Login = () => {
  const Logo = require("../../assets/images/mrapids-logo-1024x1024.png");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = /\S+@\S+\.\S+/;

  const showPass = () => {
    setShowPassword(!showPassword);
  };
  const validateForm = () => {
    const isEmailValid = isValidEmail.test(email);
    const isPassNotEmpty = password.trim().length > 0;
    return isEmailValid && isPassNotEmpty;
  };
  const handleRegister = async () => {
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (loginError) {
      Toast.show({
        type: "error",
        text1: "Invalid Credentials",
        backgroundColor: "#e63946",
        textColor: "#fff",
        iconColor: "#fff",
        progressBarColor: "#e63946",
      });
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 15}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="items-center justify-start flex-1 pt-10 bg-white">
            <Image source={Logo} style={{ width: 150, height: 150 }} />
            <View className="gap-2">
              <Text className="max-w-xl text-3xl font-medium text-center text-primary">
                Welcome to{"\n"}Manila Rapids App
              </Text>
              <Text className="max-w-xs text-center text-neutral-500">
                An online app that helps you manage and process your files
                quickly and easily,no long lines, no hassle.
              </Text>
            </View>
            <View className="w-full px-5 mt-10">
              <Input
                text="Email"
                placeholder="example@gmail.com"
                value={email}
                keyboardType="email-address"
                onChangeText={setEmail}
                error="Invalid Email"
                showError={email.length > 0 && !isValidEmail.test(email)}
              />
              <Input
                text="Password"
                placeholder="Password"
                icon={showPassword ? Eye : EyeClosed}
                onIconPress={showPass}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                importantForAutofill="no"
                autoComplete="off"
              />
              <Text className="text-sm text-right text-primary ">
                Forgot Password?
              </Text>
              <View className="mt-5">
                <Button
                  textClassName="flex-1"
                  onPress={handleRegister}
                  disabled={!validateForm()}
                >
                  Login
                </Button>
              </View>
              <Text className="mt-5 text-sm text-center text-neutral-500">
                Don’t have an account?{" "}
                <Text
                  className="font-semibold text-primary"
                  onPress={() => {
                    setEmail("");
                    setPassword("");
                    router.push("/(auth)/Register");
                  }}
                >
                  Register
                </Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
