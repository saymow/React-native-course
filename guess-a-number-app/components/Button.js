import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/colors";

const Button = ({ children, style, color = Colors.primary, ...rest }) => {
  return (
    <TouchableOpacity style={{ ...style }} {...rest}>
      <View style={{ ...styles.container, backgroundColor: color }}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
  },

  text: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "open-sans",
    color: Colors.text,
  },
});

export default Button;
