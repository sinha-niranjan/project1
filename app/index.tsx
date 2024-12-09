import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Link, Redirect, useRouter } from "expo-router";

const Welcome = () => {
  return <Redirect href={"/login"} />;
};

export default Welcome;
