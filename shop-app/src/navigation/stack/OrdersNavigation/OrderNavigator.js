import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../../components/ui/HeaderButton";
import OrdersScreen from "../../../screens/shop/OrdersScreen";
import { StackScreenOptions } from "..";

const Stack = createStackNavigator();

const OrderNavigatior = () => {
  return (
    <Stack.Navigator screenOptions={StackScreenOptions}>
      <Stack.Screen
        name="Orders"
        options={({ navigation }) => ({
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
        })}
        component={OrdersScreen}
      />
    </Stack.Navigator>
  );
};

export default OrderNavigatior;
