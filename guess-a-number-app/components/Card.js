import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "../constants/colors";

const Card = ({ children, style }) => {
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    shadowColor: Colors.text,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowRadius: 16,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: Colors.bgPrimary,
  },
});

export default Card;
