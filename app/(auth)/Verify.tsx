import { Link, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Input from "../components/Input";
import { supabase } from "@/services/supabase-client";
const Verify = () => {
  const params = useLocalSearchParams<{ email: string }>();
  const email = Array.isArray(params.email)
    ? params.email[0]
    : params.email || "";
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleVerify = async () => {
    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: "email",
    });

    if (verifyError) {
      setShowError(true);
      setErrorMessage(verifyError.message || "Invalid or expired OTP code");
      console.log("Invalid OTP:", verifyError.message);
    } else {
      setShowError(false);
    }
  };

  const resendOtp = async () => {
    if (timer > 0) return;

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      console.log("Failed to send OTP:", error.message);
    } else {
      console.log("OTP resent!");
      setTimer(60);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="justify-start flex-1 px-5 bg-white pt-7">
        <Link href="/(auth)/Register">
          <ArrowLeft size={24} color="#1d3557" strokeWidth={3} />
        </Link>
        <View className="flex-1 gap-2 mt-10">
          <Text className="text-2xl font-semibold text-primary">
            Verify your email
          </Text>
          <Text className="mb-4 text-neutral-500">
            We’ve sent an email to
            <Text className="font-semibold text-primary"> {email} </Text>
            containing a 6-digit code. Check entered email if correct.
          </Text>
          <Input
            text="Enter email code"
            placeholder="Enter 6-digit code"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
            onSubmitEditing={() => {
              Keyboard.dismiss();
              handleVerify();
            }}
            returnKeyType="done"
            maxLength={6}
            error={errorMessage}
            showError={showError && otp.length > 0}
          />
          <Text className="mx-auto mt-2 text-sm text-neutral-500">
            {timer > 0 ? (
              <>
                Resend email code in{" "}
                <Text className="font-bold text-primary">{timer}</Text> seconds
              </>
            ) : (
              <TouchableOpacity onPress={resendOtp}>
                <Text className="font-bold underline text-primary">
                  Resend code
                </Text>
              </TouchableOpacity>
            )}
          </Text>
        </View>
        <View className="gap-2 mx-auto">
          <Text className="text-sm text-neutral-500">
            Not <Text className="font-semibold text-primary">{email}</Text>
          </Text>
          <Link
            href={{
              pathname: "/(auth)/Register",
              params: { email: email },
            }}
            className="mb-10"
          >
            <Text
              className="text-sm font-bold text-center text-primary"
              style={{ textDecorationLine: "underline" }}
            >
              Edit email here
            </Text>
          </Link>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Verify;
