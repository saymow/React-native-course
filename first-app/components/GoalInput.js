import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";

function GoalInput({ onAddGoal, onCancel, visible }) {
  const [goal, setGoal] = useState("");

  const handleAddButton = () => {
    onAddGoal(goal);
    setGoal("");
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course goal"
          style={styles.input}
          onChangeText={setGoal}
          value={goal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.cancelButtonContainer}>
            <Button title="CANCEL" color="red" onPress={onCancel} />
          </View>
          <View style={styles.addlButtonContainer}>
            <Button title="ADD" color="#151616" onPress={handleAddButton} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  input: {
    borderColor: "grey",
    borderBottomWidth: 1,
    padding: 10,
    marginVertical: 10,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  cancelButtonContainer: {
    flex: 1,
  },

  addlButtonContainer: {
    flex: 2,
  },
});

export default GoalInput;
