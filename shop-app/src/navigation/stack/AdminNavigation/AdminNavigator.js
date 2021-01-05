import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserProductsScreen from "../../../screens/user/UserProductsScreen";
import { StackScreenOptions } from "..";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../../components/ui/HeaderButton";
import EditProductsScreen from "../../../screens/user/EditProductsScreen";

const Stack = createStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator screenOptions={StackScreenOptions}>
      <Stack.Screen
        name="UserProducts"
        options={({ navigation }) => ({
          title: "User products",
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
                title="Add"
                iconName={
                  Platform.OS === "android" ? "md-create" : "ios-create"
                }
                size={24}
                onPress={() => {
                  navigation.navigate({ name: "UserEditProducts" });
                }}
              />
            </HeaderButtons>
          ),
        })}
        component={UserProductsScreen}
      />

      <Stack.Screen
        name="UserEditProducts"
        options={({ navigation, route }) => {
          const existingPid = route?.params?.id;
          const submitFn = route?.params?.submit;

          return {
            title: existingPid ? "Edit Product" : "Add product",
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Save"
                  IconName={
                    Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
                  }
                  size={24}
                  onPress={submitFn}
                />
              </HeaderButtons>
            ),
          };
        }}
        component={EditProductsScreen}
      />
    </Stack.Navigator>
  );
};

export default UserNavigator;
