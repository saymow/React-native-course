import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import StartupScreen from "../screens/StartupScreen";
import MainDrawer from "./drawer/MainDrawer";
import AuthNavigator from "./stack/AuthNavigation/AuthNavigator";

const Navigator = () => {
  const [isLoading, setIsLoading] = useState(true);

  const authenticated = useSelector((state) => state.auth.isAuth);

  return (
    <NavigationContainer>
      {isLoading ? (
        <StartupScreen onLoad={() => setIsLoading(false)} />
      ) : authenticated ? (
        <MainDrawer />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default Navigator;
