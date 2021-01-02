import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Platform } from "react-native";
import Colors from "../constants/colors";
import DrawerNavigator from "./DrawerNavigator";

const Router = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export const stackScreenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS ? "white" : Colors.primaryColor,
  title: "Default screen name",
};

// React-navigation V5 CONFIGURATION FILE

export default Router;
