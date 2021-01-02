import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import DefaultText from "./DefaultText";

function MealItem({
  title,
  image,
  duration,
  complexity,
  affordability,
  onSelect,
}) {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={onSelect}>
        <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
          <ImageBackground style={styles.bgImage} source={{ uri: image }}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            ...styles.mealRow,
            ...styles.mealDetail,
          }}
        >
          <DefaultText>{duration}m</DefaultText>
          <DefaultText>{complexity.toUpperCase()}</DefaultText>
          <DefaultText>{affordability.toUpperCase()}</DefaultText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
  mealHeader: {
    height: "85%",
  },

  titleContainer: {
    backgroundColor: "rgba(0,0,0, .7)",
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },

  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },

  mealRow: {
    flexDirection: "row",
  },

  mealDetail: {
    height: "15%",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default MealItem;
