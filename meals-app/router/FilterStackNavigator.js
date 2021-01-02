import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { stackScreenOptions } from ".";
import FiltersScreen from "../screens/FiltersScreen";

import HeaderButton from "../components/HeaderButton";

const Stack = createStackNavigator();

const FilterStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={stackScreenOptions}
      initialRouteName="Filters"
    >
      <Stack.Screen
        name="Filters"
        options={(navData) => {
          return {
            title: "Recipe filter",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="menu"
                  iconName="ios-menu"
                  onPress={() => navData.navigation.toggleDrawer()}
                />
              </HeaderButtons>
            ),
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="save"
                  iconName="ios-save"
                  onPress={() => navData.route.params?.save()}
                />
              </HeaderButtons>
            ),
          };
        }}
        component={FiltersScreen}
      />
    </Stack.Navigator>
  );
};

export default FilterStackNavigator;
