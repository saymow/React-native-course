import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Title from "./Title";

import Colors from "../constants/colors";

const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <Title>{title}</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90,
    padding: 36,
    backgroundColor: Colors.bgPrimary,
    borderColor: Colors.lightGrey,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontFamily: "open-sans-bold",
    color: Colors.text,
    fontSize: 18,
  },
});

export default Header;
