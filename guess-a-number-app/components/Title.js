import React from "react";
import { Text, StyleSheet } from "react-native";

import Colors from "../constants/colors";

function Title({ children, style }) {
  return <Text style={{ ...styles.text, ...style }}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: Colors.text,
    fontFamily: "open-sans-bold",
  },
});

export default Title;
