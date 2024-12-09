import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const home = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-lg  font-bold">Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default home;
