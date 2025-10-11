import { Link } from 'expo-router';
import { ArrowLeft, Eye, EyeOff, Lock } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const change_password = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChangePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    
    if (formData.newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }
    
    Alert.alert('Success', 'Password changed successfully!');
  };

  return (
    <ScrollView className="bg-neutral-50 flex-1">

      <View className="flex-row items-center px-4 py-4 bg-primary">
        <Link href="/(tabs)/profile" asChild>
          <TouchableOpacity>
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
        </Link>
        <Text className="flex-1 text-xl font-bold text-center text-white">
          Change Password
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View className="p-4">
        <View className="bg-white rounded-xl p-4 shadow-sm border border-accent-100 mb-6">
          <Text className="text-lg font-bold text-primary mb-4 border-b border-accent-100 pb-2">
            Password Settings
          </Text>
          
          <View className="space-y-4">
            <View>
              <Text className="text-sm font-semibold text-primary mb-2">Current Password</Text>
              <View className="flex-row items-center border border-primary rounded-xl px-4 py-3 bg-white">
                <Lock size={20} color="#1d3557" className="mr-2" />
                <TextInput
                  className="flex-1 text-primary"
                  value={formData.currentPassword}
                  onChangeText={(value) => handleInputChange('currentPassword', value)}
                  placeholder="Enter current password"
                  placeholderTextColor="#6c757d"
                  secureTextEntry={!showCurrentPassword}
                />
                <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                  {showCurrentPassword ? <EyeOff size={20} color="#6c757d" /> : <Eye size={20} color="#6c757d" />}
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text className="text-sm font-semibold text-primary mb-2">New Password</Text>
              <View className="flex-row items-center border border-primary rounded-xl px-4 py-3 bg-white">
                <Lock size={20} color="#1d3557" className="mr-2" />
                <TextInput
                  className="flex-1 text-primary"
                  value={formData.newPassword}
                  onChangeText={(value) => handleInputChange('newPassword', value)}
                  placeholder="Enter new password"
                  placeholderTextColor="#6c757d"
                  secureTextEntry={!showNewPassword}
                />
                <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <EyeOff size={20} color="#6c757d" /> : <Eye size={20} color="#6c757d" />}
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text className="text-sm font-semibold text-primary mb-2">Confirm New Password</Text>
              <View className="flex-row items-center border border-primary rounded-xl px-4 py-3 bg-white">
                <Lock size={20} color="#1d3557" className="mr-2" />
                <TextInput
                  className="flex-1 text-primary"
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange('confirmPassword', value)}
                  placeholder="Confirm new password"
                  placeholderTextColor="#6c757d"
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff size={20} color="#6c757d" /> : <Eye size={20} color="#6c757d" />}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <Text className="text-neutral-500 text-sm mb-4">
          • Password must be at least 6 characters long
          {'\n'}• Include uppercase and lowercase letters
          {'\n'}• Include numbers and special characters
        </Text>

        <TouchableOpacity 
          className="bg-primary rounded-xl py-4 items-center shadow-lg shadow-primary/25"
          onPress={handleChangePassword}
        >
          <Text className="text-white text-lg font-semibold">Change Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default change_password;