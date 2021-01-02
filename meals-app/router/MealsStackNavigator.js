import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { stackScreenOptions } from ".";
import HeaderButton from "../components/HeaderButton";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={stackScreenOptions}
    >
      <Stack.Screen
        name="Categories"
        options={(navData) => {
          return {
            title: "Categories",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="menu"
                  iconName="ios-menu"
                  onPress={() => {
                    navData.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
        component={CategoriesScreen}
      />

      <Stack.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        options={({ route }) => {
          {
            const catId = route.params?.categoryId ?? "invalid";

            const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

            return {
              title: selectedCategory.title,
            };
          }
        }}
      />

      <Stack.Screen
        name="MealDetails"
        component={MealDetailsScreen}
        options={({ route }) => {
          const mealId = route.params.id ?? "invalid";

          const meal = MEALS.find((_meal) => _meal.id === mealId);

          return {
            title: meal.title,
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Favorite"
                  iconName="ios-star"
                  onPress={() => {
                    console.log("Mark as favorite");
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
