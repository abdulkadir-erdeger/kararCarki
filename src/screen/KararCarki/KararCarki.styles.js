import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  image: { flex: 1 },
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: {
    fontFamily: "TitanOne",
    fontSize: 20,
    bottom: -30,
    maxWidth: width - 25,
  },
});
