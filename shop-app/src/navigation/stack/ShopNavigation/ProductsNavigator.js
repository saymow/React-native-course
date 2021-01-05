import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { StackScreenOptions } from "..";
import CustomHeaderButton from "../../../components/ui/HeaderButton";
import CartScreen from "../../../screens/shop/CartScreen";
import ProductDetailsScreen from "../../../screens/shop/ProductDetailsScreen";
import ProductsOverviewScreen from "../../../screens/shop/ProductsOverviewScreen";

const Stack = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProductsOverview"
      screenOptions={StackScreenOptions}
    >
      <Stack.Screen
        name="ProductsOverview"
        options={({ navigation }) => {
          return {
            title: "All products",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="menu"
                  IconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  size={24}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="cart"
                  iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                  onPress={() => {
                    navigation.navigate({
                      name: "cart",
                    });
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
        component={ProductsOverviewScreen}
      />

      <Stack.Screen
        name="ProductDetails"
        options={({ route }) => {
          const title = route.params.title ?? "Invalid product name";

          return {
            title,
          };
        }}
        component={ProductDetailsScreen}
      />

      <Stack.Screen
        name="cart"
        options={{ title: "Cart" }}
        component={CartScreen}
      />
    </Stack.Navigator>
  );
};

export default ProductsNavigator;
