import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
export const iconSize = width * 0.25;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: { flex: 1 },
  title: {
    textAlign: "center",
    maxWidth: width - 25,
    color: "white",
    fontFamily: "TitanOne",
    fontSize: 20,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: height / 6,
  },
  button: {
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: "white",
    borderRadius: (width * 0.5) / 2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  buttonImage: {
    width: width * 0.65,
    height: width * 0.65,
  },
});
