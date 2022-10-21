import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
  },
  inputSection: {
    height: 40,
    flex: 1,
    // borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "lightgrey",
  },
  trashIcon: {
    margin: 8,
  },
});
