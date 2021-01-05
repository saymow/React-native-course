import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React from "react";
import { Provider } from "react-redux";
import Navigator from "./src/navigation";
import store from "./src/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
