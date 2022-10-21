import { StatusBar } from "expo-status-bar";

import { useFonts } from "expo-font";
import Route from "./src/Route";

import HomeScreen from "./src/screen/HomeScreen";

export default function App() {
  const [loaded] = useFonts({
    TitanOne: require("./assets/Fonts/TitanOne-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return <Route />;
}
