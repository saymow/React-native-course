// import { Platform } from "react-native";
// import { createNavigatorFactory } from "react-navigation-native";
// import { createStackNavigator } from "react-navigation-stack";
// import { createBottomTabNavigator } from "react-navigation-bottom-tabs";
// import { enableScreens } from "react-native-screens";

// import CategoriesScreen from "../screens/CategoriesScreen";
// import CategoryMealsScreen from "../screens/CategoryMealsScreen";
// import MealDetailsScreen from "../screens/MealDetailsScreen";
// import FavoritesScreens from "../screens/FavoritesScreens";
// import Colors from "../constants/colors";

// enableScreens();

// const MealsNavigator = createStackNavigator(
//   {
//     Categories: CategoriesScreen,
//     CategoryMeals: {
//       screen: CategoryMealsScreen,
//     },
//     MealDetails: MealDetailsScreen,
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
//       },
//       headerTintColor: Platform.OS ? "white" : Colors.primaryColor,
//     },
//   }
// );

// const MealsFavTabNavigator = createBottomTabNavigator({
//   Meals: MealsNavigator,
//   Favorites: FavoritesScreens,
// });

// export default createNavigatorFactory(MealsFavTabNavigator);

// React-navigation V4 CONFIGURATION FILE
