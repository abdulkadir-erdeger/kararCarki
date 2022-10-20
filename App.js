import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Wheel from "./src/components/Wheel";

export default function App() {
  const participants = [
    "Reyna",
    "Jett",
    "Omen",
    "Yoru",
    "Sage",
    "Chamber",
    "Kay/o",
    "Viper",
    "Raze",
  ];
  const wheelOptions = {
    rewards: participants,
    knobSize: 50,
    borderWidth: 5,
    borderColor: "#000",
    innerRadius: 50,
    duration: 4000,
    backgroundColor: "transparent",
    textAngle: "horizontal",
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Wheel options={wheelOptions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
