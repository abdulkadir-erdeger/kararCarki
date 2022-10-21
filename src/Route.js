import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screen/HomeScreen";
import SelectionScreen from "./screen/SelectionScreen";
import KararCarki from "./screen/KararCarki";

const Stack = createNativeStackNavigator();

const Route = () => {
  const CustomTabBarButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name="arrow-back-circle"
        size={35}
        color="white"
        style={{ marginStart: 3 }}
      />
    </TouchableOpacity>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Selection"
          component={SelectionScreen}
          options={({ navigation }) => ({
            title: "Seçim Ekranı",
            headerTitleAlign: "center",
            headerBackground: () => (
              <Image
                style={StyleSheet.absoluteFill}
                source={require("../assets/headerBackground.png")}
              />
            ),
            headerTintColor: "#fff",
            headerLeft: () => (
              <CustomTabBarButton onPress={() => navigation.goBack()} />
            ),
          })}
        />
        <Stack.Screen
          name="Karar"
          component={KararCarki}
          options={({ navigation }) => ({
            title: "Karar Çarkı",
            headerTitleAlign: "center",
            headerBackground: () => (
              <Image
                style={StyleSheet.absoluteFill}
                source={require("../assets/headerBackground.png")}
              />
            ),
            headerTintColor: "#fff",
            headerLeft: () => (
              <CustomTabBarButton onPress={() => navigation.goBack()} />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
