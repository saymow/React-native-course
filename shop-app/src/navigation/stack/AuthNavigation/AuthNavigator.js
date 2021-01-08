import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../../../screens/user/AuthScreen";
import { StackScreenOptions } from "..";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={StackScreenOptions}>
      <Stack.Screen
        name="Auth"
        options={{ title: "Authenticate" }}
        component={AuthScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
