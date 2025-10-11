import { ArrowLeft, ArrowRight } from "lucide-react-native";
import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

type ButtonProps = TouchableOpacityProps & {
  children: React.ReactNode;
  containerClassName?: string;
  textClassName?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  withShadow?: boolean;
  disabled?: boolean;
};

const Button = ({
  //gamitin motong button sa buong app
  // para sa document tab pwede mo nalng icopy paste ung gawa kona nandun sa index.tsx
  children,
  containerClassName,
  textClassName,
  iconLeft,
  iconRight,
  withShadow = false,
  disabled = false,
  ...props
}: ButtonProps) => {
  const shadowConfig = {
    // iOS shadow properties
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,

    // Android shadow property
    elevation: 7,
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      className={`flex-row items-center p-3 rounded-xl ${
        disabled ? "bg-gray-400" : "bg-primary "
      } ${containerClassName || ""}`}
      style={withShadow ? shadowConfig : undefined}
      {...props}
    >
      <View className="flex-row items-center justify-center">
        {iconLeft && <View className="mx-5">{iconLeft}</View>}
        <Text
          className={`font-bold text-center text-white ${textClassName || ""}`}
        >
          {children}
        </Text>
        {iconRight && <View className="ml-2">{iconRight}</View>}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

interface BackButtonProps {
  onPress?: () => void;
}

export const BackButton = ({ onPress }: BackButtonProps) => {
  return (
    <ArrowLeft onPress={onPress} size={24} color="#1d3557" strokeWidth={3} />
  ); // ito icons lang to na arrow left back button
};

export const ForwardButton = ({ color }: any) => {
  return <ArrowRight size={24} color={color} strokeWidth={3} />; // ito icons lang to na arrow right forward button
};

type IconProps = {
  children: React.ReactNode;
  onPress?: () => void;
  icon?: React.ReactNode;
};

export const IconButton = ({ children, icon, ...props }: IconProps) => {
  return (
    <View className="flex items-center">
      <TouchableOpacity
        activeOpacity={0.7}
        {...props}
        className="items-center p-3 rounded-full shadow-md bg-primary"
      >
        {icon}
      </TouchableOpacity>
      <Text className="mt-1 text-xs text-center">{children}</Text>
    </View>
  );
};
