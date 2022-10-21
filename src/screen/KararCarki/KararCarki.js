import { View, Text, ImageBackground } from "react-native";
import React from "react";
import styles from "./KararCarki.styles";
import Wheel from "../../components/Wheel";

const KararCarki = () => {
  const participants = [
    "Reyna",
    "Jett",
    "Omen",
    "Yoru",
    "Sage",
    "Chamber",
    "Kay/o",
    "Viper",
  ];
  const wheelOptions = {
    rewards: participants,
    knobSize: 5,
    borderWidth: 5,
    borderColor: "#000",
    innerRadius: 50,
    duration: 4000,
    backgroundColor: "transparent",
    textAngle: "horizontal",
  };
  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <Wheel options={wheelOptions} />
      </View>
    </ImageBackground>
  );
};

export default KararCarki;
