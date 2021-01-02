import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import FilterStackNavigator from "./FilterStackNavigator";
import MealsFavTabsNavigator from "./MealsFavTabsNavigator";

import Colors from "../constants/colors";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContentOptions={{
        activeTintColor: Colors.primaryColor,
        fontFamily: "open-sans",
      }}
    >
      <Drawer.Screen name="Home" component={MealsFavTabsNavigator} />
      <Drawer.Screen name="Filters" component={FilterStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
