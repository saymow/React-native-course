import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import MealItem from "./MealItem";

const MealList = ({ listData, navigation }) => {
  const Item = (itemData) => {
    const handleNavigateToDetails = () => {
      navigation.navigate({
        name: "MealDetails",
        params: {
          id: itemData.item.id,
        },
      });
    };

    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onSelect={handleNavigateToDetails}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList data={listData} renderItem={Item} style={{ width: "100%" }} />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealList;
