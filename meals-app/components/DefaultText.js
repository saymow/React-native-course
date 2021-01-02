import React from "react";
import { Text, StyleSheet } from "react-native";

const DefaultText = ({ style = {}, ...props }) => {
  return <Text style={{ ...style, ...styles.text }}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
  },
});

export default DefaultText;
