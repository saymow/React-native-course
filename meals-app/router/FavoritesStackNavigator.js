import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { stackScreenOptions } from ".";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/colors";
import FavoriteScreens from "../screens/FavoritesScreens";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import { MEALS } from "../data/dummy-data";

const Stack = createStackNavigator();

const FavoritesStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...stackScreenOptions,
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.accentColor : "",
        },
      }}
    >
      <Stack.Screen
        name="Favorite"
        options={(navData) => {
          return {
            title: "Your favorites recipes",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="menu"
                  iconName="ios-menu"
                  onPress={() => navData.navigation.toggleDrawer()}
                />
              </HeaderButtons>
            ),
          };
        }}
        component={FavoriteScreens}
      />
      <Stack.Screen
        name="MealDetails"
        options={({ route }) => {
          const mealId = route.params.id ?? "invalid";

          const meal = MEALS.find((_meal) => _meal.id === mealId);

          return {
            title: meal.title,
          };
        }}
        component={MealDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default FavoritesStackNavigator;
