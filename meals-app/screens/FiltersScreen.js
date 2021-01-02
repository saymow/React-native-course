import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { useDispatch } from "react-redux";

import { setFilters as setFiltersAction } from "../store/actions/meals";

import Colors from "../constants/colors";

function FiltersScreen({ navigation }) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    gluttenFree: false,
    lactoseFree: false,
    vegan: false,
    vegetarian: false,
  });

  const handleSwitchChange = (name, value) =>
    setFilters({ ...filters, [name]: value });

  const saveFilters = useCallback(() => {
    dispatch(setFiltersAction(filters));
  }, [filters]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten-free"
        propertyName={"gluttenFree"}
        value={filters.gluttenFree}
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
        propertyName={"vegan"}
        value={filters.vegan}
        onChange={handleSwitchChange}
      />
      <FilterSwitch
        label="Vegetarian"
        propertyName={"vegetarian"}
        value={filters.vegetarian}
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
