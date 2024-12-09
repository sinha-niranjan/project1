import { Link, useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

interface LoginForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const [show, setShow] = useState<boolean>(true);
  const [confirmShow, setConfirmShow] = useState<boolean>(true);
  const [strength, setStrength] = useState<string>("");
  const router = useRouter();

  const initialValues: LoginForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
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

  const handleSubmit = (data: LoginForm) => {
    // submit the form data here
    console.log("sign form value :", data);
    Toast.show({
      type: "success",
      text1: "Sign Up Successful!",
    });
    router.replace("/(screen)/home");
  };
  return (
    <SafeAreaView className="flex-1 ">
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
              <View className="px-8 " role="form" aria-label="sign-up-form">
                {/* Title */}
                <Text
                  id="signup-form"
                  className="text-3xl font-bold text-center text-white mb-8"
                >
                  Sign Up
                </Text>
                {/* Name Input */}
                <View className="mb-4">
                  <Text className="text-sm text-white mb-1" aria-label="Name">
                    Name
                  </Text>
                  <TextInput
                    className="h-12 bg-gray-100 px-4 rounded-lg border border-gray-300 text-gray-800"
                    placeholder="Enter your name"
                    keyboardType="name-phone-pad"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    autoCapitalize="none"
                    accessibilityLabel="Name input"
                  />
                  {touched.name && errors.name && (
                    <Text className="text-red-500">{errors.name}</Text>
                  )}
                </View>
                {/* Email Input */}
                <View className="mb-4">
                  <Text
                    className="text-sm text-white mb-1"
                    aria-label="Email address"
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
                {/*  Password Input */}
                <View className="mb-4">
                  <Text
                    className="text-sm text-white mb-1"
                    aria-label="password"
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
                      accessibilityLabel="Password input"
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
                {/* Confirm Password Input */}
                <View className="mb-4">
                  <Text
                    className="text-sm text-white mb-1"
                    aria-label="Confirm Password"
                  >
                    {" "}
                    Confirm Password
                  </Text>
                  <View>
                    <TextInput
                      className=" flex h-12 bg-gray-100 px-4 rounded-lg border border-gray-300 text-gray-800"
                      placeholder="Confirm your password  "
                      secureTextEntry={show}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      value={values.confirmPassword}
                      accessibilityLabel="Confirm Password input"
                    />
                    <TouchableOpacity
                      onPress={() => setConfirmShow((prev) => !prev)}
                      className="flex flex-row justify-end"
                    >
                      <Text
                        className={`text-sm text-blue-500 ${
                          !confirmShow ? "text-gray-600" : "text-blue-500"
                        }`}
                      >
                        {!confirmShow ? "Hide" : "Show"}
                      </Text>
                    </TouchableOpacity>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text className="text-red-500">
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </View>
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  className="h-12 bg-blue-500 rounded-lg justify-center items-center mt-4"
                  onPress={() => handleSubmit()}
                  accessibilityLabel="Signup button"
                >
                  <Text className="text-white font-bold text-lg">Sign Up</Text>
                </TouchableOpacity>

                {/* Sign Up Link */}
                <View className="flex-row justify-center mt-8">
                  <Text className="text-gray-600">
                    Already have an account?{" "}
                  </Text>
                  <Link href={"/login"}>
                    <Text
                      className="text-blue-500 font-bold "
                      accessibilityLabel="Go to Login Page"
                    >
                      Login
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

export default Signup;
