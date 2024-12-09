import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { Link, useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

interface LoginForm {
  email: string;
  password: string;
}

const storeData = async ({ key, value }: { key: string; value: string }) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value)); // Store as a string
    console.log("Data successfully stored");
  } catch (error) {
    console.log("Error storing data", error);
  }
};

const Login = () => {
  const [show, setShow] = useState<boolean>(true);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [strength, setStrength] = useState<string>("");
  const router = useRouter();
  const initialValues: LoginForm = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const checkPasswordStrength = (password: string) => {
    let strengthLevel = 0;

    if (password.length >= 8) strengthLevel++; // Length check
    if (/[A-Z]/.test(password)) strengthLevel++; // Uppercase
    if (/[a-z]/.test(password)) strengthLevel++; // Lowercase
    if (/[0-9]/.test(password)) strengthLevel++; // Numbers
    if (/[^A-Za-z0-9]/.test(password)) strengthLevel++; // Special characters

    if (strengthLevel <= 2) setStrength("Weak");
    else if (strengthLevel === 3) setStrength("Medium");
    else if (strengthLevel >= 4) setStrength("Strong");
  };

  const handleSubmit = async (data: LoginForm) => {
    console.log("login form value :", data);
    Toast.show({
      type: "success",
      text1: "Login Successful!",
      text2: "Welcome back!  ",
    });
    if (rememberMe) {
      await storeData({ key: "email", value: data.email });
    }
    router.replace("/(screen)/home");
  };

  return (
    <SafeAreaView className="flex-1 " aria-labelledby="login-form">
      <View className="flex-1 items-center justify-center  ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => {
            useEffect(() => {
              if (values.password) checkPasswordStrength(values.password);
            }, [values.password]);
            return (
              <View className="px-8">
                {/* Title */}
                <Text
                  id="login-form"
                  className="text-3xl font-bold text-center text-white mb-8"
                >
                  Login
                </Text>
                {/* Email Input */}
                <View className="mb-4">
                  <Text
                    className="text-sm text-white mb-1"
                    aria-labelledby="Email address"
                  >
                    Email
                  </Text>
                  <TextInput
                    className="h-12 bg-gray-100 px-4 rounded-lg border border-gray-300 text-gray-800"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    autoCapitalize="none"
                    accessibilityLabel="Email input"
                  />
                  {touched.email && errors.email && (
                    <Text className="text-red-500">{errors.email}</Text>
                  )}
                </View>
                {/* Password Input */}
                <View className="mb-4">
                  <Text
                    className="text-sm text-white mb-1"
                    aria-labelledby="password "
                  >
                    Password
                  </Text>
                  <View>
                    <TextInput
                      className=" flex h-12 bg-gray-100 px-4 rounded-lg border border-gray-300 text-gray-800"
                      placeholder="Enter your password"
                      secureTextEntry={show}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      accessibilityLabel="password input"
                    />
                    <View className="flex flex-row justify-between">
                      {strength && (
                        <Text
                          className={` text-sm ${
                            strength == "Weak"
                              ? "text-red-400"
                              : strength == "Medium"
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        >
                          {strength}
                        </Text>
                      )}
                      <TouchableOpacity
                        onPress={() => setShow((prev) => !prev)}
                      >
                        <Text
                          className={`text-sm text-blue-500 ${
                            !show ? "text-gray-600" : "text-blue-500"
                          }`}
                        >
                          {!show ? "Hide" : "Show"}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {touched.password && errors.password && (
                      <Text className="text-red-500">{errors.password}</Text>
                    )}
                  </View>
                </View>
                {/* check box for remember  */}
                <View className="mb-4 flex flex-row items-start gap-4">
                  <Checkbox
                    value={rememberMe}
                    onValueChange={setRememberMe}
                    color={"#0041C2"}
                    accessibilityLabel="remember me"
                  />
                  <Text className="text-blue-500 text-sm">Remember Me</Text>
                </View>
                {/* Login Button */}
                <TouchableOpacity
                  className="h-12 bg-blue-500 rounded-lg justify-center items-center mt-4"
                  onPress={() => handleSubmit()}
                  accessibilityLabel="Login button"
                >
                  <Text className="text-white font-bold text-lg">Login</Text>
                </TouchableOpacity>

                {/* Sign Up Link */}
                <View className="flex-row justify-center mt-8">
                  <Text className="text-gray-600">Don't have an account? </Text>
                  <Link href={"/signup"}>
                    <Text
                      className="text-blue-500 font-bold"
                      accessibilityLabel="Go to Sing Up Page"
                    >
                      Sign Up
                    </Text>
                  </Link>
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default Login;
