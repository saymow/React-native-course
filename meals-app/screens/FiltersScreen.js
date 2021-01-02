import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";

import Colors from "../constants/colors";

function FiltersScreen({ navigation }) {
  const [filters, setFilters] = useState({
    glutenFree: false,
    lactoseFree: false,
    veganFree: false,
    vegetarianFree: false,
  });

  const handleSwitchChange = (name, value) =>
    setFilters({ ...filters, [name]: value });

  const saveFilters = useCallback(() => {
    console.log(filters);
  }, [filters]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten-free"
        propertyName={"glutenFree"}
        value={filters.glutenFree}
        onChange={handleSwitchChange}
      />
      <FilterSwitch
        label="Lactose-free"
        propertyName={"lactoseFree"}
        value={filters.lactoseFree}
        onChange={handleSwitchChange}
      />
      <FilterSwitch
        label="Vegan"
        propertyName={"veganFree"}
        value={filters.veganFree}
        onChange={handleSwitchChange}
      />
      <FilterSwitch
        label="Vegetarian"
        propertyName={"vegetarianFree"}
        value={filters.vegetarianFree}
        onChange={handleSwitchChange}
      />
    </View>
  );
}

const FilterSwitch = ({ label, value, onChange, propertyName }) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{label}</Text>
      <Switch
        trackColor={{
          true: Colors.primaryColor,
        }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        value={value}
        onValueChange={(newValue) => onChange(propertyName, newValue)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },

  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },

  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 10,
  },
});

export default FiltersScreen;
