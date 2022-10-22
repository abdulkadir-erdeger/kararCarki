import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  image: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleContainer: {
    width: width - 15,
    padding: 10,
  },
  titleText: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontFamily: "TitanOne",
    color: "white",
    textAlignVertical: "center",
  },
  inputTitle: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
  },
  sectionContainer: {
    margin: -15,
    width: width - 15,
    padding: 10,
    height: height * 0.6,
  },
  button: {
    bottom: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    width: width - 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    borderWidth: 1,
  },
  buttonTitle: {
    fontFamily: "TitanOne",
    fontSize: 20,
  },
  listIncrementButton: {
    marginTop: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 10,
  },
});
