import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/colors";

function NumberContainer({ number, style }) {
  return (
    <View style={{ ...styles.container, ...style }}>
      <Text style={styles.number}>{number}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: Colors.lighterGrey,
    borderWidth: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  number: {
    fontSize: 38,
    color: Colors.text,
  },
});

export default NumberContainer;
