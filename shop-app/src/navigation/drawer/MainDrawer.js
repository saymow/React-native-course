import { Ionicons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import React from "react";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { useDispatch } from "react-redux";
import AdminNavigator from "../stack/AdminNavigation/AdminNavigator";
import OrderNavigatior from "../stack/OrdersNavigation/OrderNavigator";
import ProductsNavigator from "../stack/ShopNavigation/ProductsNavigator";
import { logout } from "../../store/actions/auth";

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  const dispatch = useDispatch();

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Logout"
            icon={() => (
              <Ionicons name="exit-outline" size={24} color="black" />
            )}
            onPress={() => dispatch(logout())}
          />
        </DrawerContentScrollView>
      )}
    >
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
  );
};

export default MainDrawer;
