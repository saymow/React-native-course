import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

import Colors from "../constants/colors";
import BodyText from "./BodyText";

const Input = ({ label, style, ...rest }) => {
  return (
    <View style={{ ...styles.container, ...style.container }}>
      <BodyText style={{ ...styles.label, ...style.label }}>{label}</BodyText>
      <TextInput {...rest} style={{ ...styles.input, ...style.input }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  label: {
    paddingVertical: 5,
  },

  input: {
    fontSize: 18,
    padding: 10,
    color: Colors.text,
    borderColor: Colors.lightGrey,
    borderBottomWidth: 1,
  },
});

export default Input;
