import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Button from "../components/Button";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import NumberContainer from "../components/NumberContainer";
import Title from "../components/Title";
import Colors from "../constants/colors";

const genRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const randomNumber = Math.floor(Math.random() * (max - min) + min);

  if (randomNumber === exclude) return genRandomBetween(min, max, exclude);

  return randomNumber;
};

const renderListItem = (listLen, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLen - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

function GameScreen({ userChoice, onGameOver }) {
  const initialGuess = genRandomBetween(1, 100, userChoice);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) onGameOver(pastGuesses.length);
  }, [currentGuess, userChoice, onGameOver]);

  const handleNextGuess = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie", "You know that this wrong...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") currentHigh.current = currentGuess;
    else currentLow.current = currentGuess + 1;

    const nextNumber = genRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    setPastGuesses((prev) => [nextNumber.toString(), ...prev]);
  };

  return (
    <View style={styles.container}>
      <Title>Oponnent's Guess</Title>
      <NumberContainer number={currentGuess} />
      <Card style={styles.buttonContainer}>
        <Button onPress={handleNextGuess.bind(this, "lower")}>
          <Ionicons name="md-remove" size={30} />
        </Button>
        <Button onPress={handleNextGuess.bind(this, "greater")}>
          <Ionicons name="md-add" size={30} />
        </Button>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((value, i) =>
            renderListItem(value, pastGuesses.length - i)
          )}
        </ScrollView> */}

        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: Colors.bgPrimary,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },

  listContainer: {
    flex: 1,
    width: "60%",
    marginTop: 20,
  },

  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
  },

  listItem: {
    width: "100%",
    padding: 15,
    marginVertical: 15,
    backgroundColor: "rgba(0,0,0, .1)",
    borderColor: Colors.primary,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default GameScreen;
