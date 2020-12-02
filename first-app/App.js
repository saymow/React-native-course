import React, { useState } from "react";
import { FlatList, StyleSheet, View, Button } from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [goalsList, setGoalsList] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const handleAddGoal = (goal) => {
    setGoalsList((currentGoals) => [
      ...currentGoals,
      { id: Date.now().toString(), value: goal },
    ]);
    setIsAddMode(false);
  };

  const handleRemoveGoal = (id) => {
    const newCourseGoals = goalsList.filter((item) => item.id !== id);

    setGoalsList(newCourseGoals);
  };

  const handleDisableAddMode = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add new goal" onPress={() => setIsAddMode(true)} />

      <GoalInput
        visible={isAddMode}
        onAddGoal={handleAddGoal}
        onCancel={handleDisableAddMode}
      />
      {/* <ScrollView>
        {goalsList.map((item) => (
          <View style={styles.listItem} key={item.value}>
            <Text>{item.value}</Text>
          </View>
        ))}
      </ScrollView> */}
      <FlatList //Diff between ScrollView is that FlatList is more performant, sice it renders
        data={goalsList} //the items in chunks (Better for large ammount of data), it by default look for
        renderItem={(
          itemData // One property key (key or id) on the object, otherwise, you have to use keyExtractor to set it manually.
        ) => (
          <GoalItem id={itemData.item.id} onDelete={handleRemoveGoal}>
            {itemData.item.value}
          </GoalItem>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
