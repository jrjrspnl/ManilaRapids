import { LucideIcon } from "lucide-react-native";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

type Props = TextInputProps & {
  text: string;
  icon?: LucideIcon;
  onIconPress?: () => void;
  error?: string;
  showError?: boolean;
  labelClassName?: string;
  inputClassName?: string;
};

const Input = ({
  text,
  icon: Icon,
  onIconPress,
  error,
  showError,
  labelClassName,
  inputClassName,

  ...props
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View>
      <View className="flex-row items-center justify-between mb-1">
        <Text
          className={`font-semibold text-neutral-700 ${labelClassName || " "}`}
        >
          {text}
        </Text>
        {showError && error && (
          <Text className="text-xs text-red-500">{error}</Text>
        )}
      </View>
      <View className="relative">
        <TextInput
          placeholderTextColor="#989898"
          className={`h-12 pl-4 pr-12 mb-4 border rounded-lg font-semibold text-neutral-700 ${
            isFocused ? "border-primary/70 border-2" : "border-gray-400"
          } ${inputClassName || ""}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {Icon && (
          <TouchableOpacity
            onPress={onIconPress}
            activeOpacity={1}
            className="absolute top-0 bottom-0 justify-center mb-4 right-3"
          >
            <Icon size={20} color="#989898" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
