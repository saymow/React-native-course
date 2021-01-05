import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProductsNavigator from "./stack/ShopNavigation/ProductsNavigator";
import OrderNavigatior from "./stack/OrdersNavigation/OrderNavigator";
import AdminNavigator from "./stack/AdminNavigation/AdminNavigator";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

const Drawer = createDrawerNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Shop"
          options={{
            drawerIcon: (drawerConfig) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={23}
                color={drawerConfig.color}
              />
            ),
          }}
          component={ProductsNavigator}
        />

        <Drawer.Screen
          name="Orders"
          options={{
            drawerIcon: (drawerConfig) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={drawerConfig.color}
              />
            ),
          }}
          component={OrderNavigatior}
        />

        <Drawer.Screen
          name="Admin"
          options={{
            drawerIcon: (drawerConfig) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-create" : "ios-create"}
                size={23}
                color={drawerConfig.color}
              />
            ),
          }}
          component={AdminNavigator}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
