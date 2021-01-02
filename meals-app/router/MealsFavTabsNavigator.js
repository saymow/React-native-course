import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { Text, Platform } from "react-native";
import Colors from "../constants/colors";
import FavoritesStackNavigator from "./FavoritesStackNavigator";
import MealsStackNavigator from "./MealsStackNavigator";

const BottomTab =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialBottomTabNavigator();

const MealsFavTabsNavigator = () => {
  return (
    <BottomTab.Navigator
      // in case of createBottomTabNavigator()
      tabBarOptions={{
        labelStyle: {
          fontFamily: "open-sans-bold",
        },
        activeTintColor: Colors.accentColor,
      }}
      // in case of createMaterialBottomTabNavigator();
      activeColor={"white"}
      shifting={true}
      // barStyle={{}}
    >
      <BottomTab.Screen
        name="Meals"
        options={{
          tabBarIcon: (tabInfo) => (
            <Ionicons name="ios-restaurant" size={25} color={tabInfo.color} />
          ),
          tabBarColor: Colors.primaryColor,
          tabBarLabel:
            Platform.OS === "android" ? (
              <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
            ) : (
              "Meals"
            ),
          // It by default sets the name as label, i'm doing this bc of the fontFamily.
        }}
        component={MealsStackNavigator}
      />

      <BottomTab.Screen
        name="Favorites"
        options={{
          tabBarIcon: (tabInfo) => (
            <Ionicons name="ios-star" size={25} color={tabInfo.color} />
          ),
          tabBarColor: Colors.accentColor,
          tabBarLabel:
            Platform.OS === "android" ? (
              <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
            ) : (
              "Favorites"
            ),
        }}
        component={FavoritesStackNavigator}
      />
    </BottomTab.Navigator>
  );
};

export default MealsFavTabsNavigator;
