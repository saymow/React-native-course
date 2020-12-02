import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function GoalItem({ children, onDelete, id }) {
  return (
    <TouchableOpacity onPress={onDelete.bind(null, id)}>
      <View style={styles.listItem}>
        <Text>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "rgba(255,255,255,.1)",
    padding: 10,
    borderColor: "#151616",
    borderWidth: 1,
    marginTop: 10,
  },
});

export default GoalItem;
