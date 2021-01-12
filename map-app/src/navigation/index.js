import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Platform, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

import MapScreen from "../screens/MapScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import PlaceListScreen from "../screens/PlaceListScreen";
import CustomHeaderButton from "../components/HeaderButton";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
          },
          headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
        }}
        initialRouteName="PlaceListScreen"
      >
        <Stack.Screen
          options={(navData) => {
            return {
              headerTitle: "All Places",
              headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                  <Item
                    title="Add place"
                    iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
                    onPress={() => {
                      navData.navigation.navigate("NewPlaceScreen");
                    }}
                  />
                </HeaderButtons>
              ),
            };
          }}
          name="PlaceListScreen"
          component={PlaceListScreen}
        />
        <Stack.Screen
          name="NewPlaceScreen"
          options={{ headerTitle: "Add place" }}
          component={NewPlaceScreen}
        />
        <Stack.Screen
          name="PlaceDetailsScreen"
          component={PlaceDetailsScreen}
          options={(navData) => {
            const title = navData.route.params.title ?? "Invalid title";

            return {
              title,
            };
          }}
        />
        <Stack.Screen
          name="MapScreen"
          options={(navData) => {
            const saveLocationFn =
              navData.route.params.saveLocation ?? (() => {});
            const readonly = navData.route.params.readonly;

            if (readonly) {
              return {
                title: "Map",
              };
            }

            return {
              title: "Map",
              headerRight: () => (
                <TouchableOpacity
                  style={styles.headerButton}
                  onPress={saveLocationFn}
                >
                  <Text style={styles.headerButtonText}>Save</Text>
                </TouchableOpacity>
              ),
            };
          }}
          component={MapScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});

export default Navigator;
