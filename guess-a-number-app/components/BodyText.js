import React from "react";
import { Text, StyleSheet } from "react-native";

import Colors from "../constants/colors";

function BodyText({ children, style, ...rest }) {
  return (
    <Text {...rest} style={{ ...styles.text, ...style }}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: "open-sans",
  },
});

export default BodyText;
