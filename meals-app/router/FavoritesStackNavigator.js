import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { stackScreenOptions } from ".";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/colors";
import FavoriteScreens from "../screens/FavoritesScreens";
import MealDetailsScreen from "../screens/MealDetailsScreen";

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
          const mealTitle = route.params.mealTitle ?? "Cannot find meal title";
          const toggleFav = route.params.toggleFav;
          const isFavorite = route.params.isFav;

          return {
            title: mealTitle,
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Favorite"
                  iconName={isFavorite ? "ios-star" : "ios-star-outline"}
                  onPress={toggleFav}
                />
              </HeaderButtons>
            ),
          };
        }}
        component={MealDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default FavoritesStackNavigator;
