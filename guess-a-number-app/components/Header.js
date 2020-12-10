import React from "react";
import { View, Platform, StyleSheet } from "react-native";

import Title from "../components/Title";
import Colors from "../constants/colors";

const Header = ({ title }) => {
  return (
    <View
      style={{
        ...styles.container,
        ...Platform.select({
          ios: styles.headerIos,
          android: styles.headerAndroid,
        }),
      }}
    >
      <Title style={styles.title}>{title}</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90,
    padding: 36,
    borderColor: Colors.lightGrey,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  headerIos: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },

  headerAndroid: {
    backgroundColor: Colors.primary,
  },

  title: {
    color: Platform.OS === "ios" ? Colors.primary : "white",
  },
});

export default Header;
