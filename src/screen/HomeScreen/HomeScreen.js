import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import styles, { iconSize } from "./HomeScreen.styles";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>
          Bir seçim yapmak zorundaysan ve karar veremiyorsan, seçimini{" "}
          <Text style={{ color: "black" }}> Karar Çarkı</Text> ile belirle.
        </Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Selection")}
        >
          <Image
            source={require("../../../assets/buttonImage.png")}
            style={styles.buttonImage}
          />
          <View style={styles.button}>
            <AntDesign name="caretright" size={iconSize} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
