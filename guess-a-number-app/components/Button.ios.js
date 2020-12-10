import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

const Button = ({ children, style, color = Colors.primary, ...rest }) => {
  return (
    <ButtonComponent style={{ ...style }} {...rest}>
      <View style={{ ...styles.container, backgroundColor: color }}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </ButtonComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    borderRadius: 15,
  },

  text: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "open-sans",
    color: Colors.text,
  },
});

export default Button;
