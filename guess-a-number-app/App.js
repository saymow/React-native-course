import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Colors from "./constants/colors";

import Header from "./components/Header";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import HomeScreen from "./screens/HomeScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState();

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  if (!dataLoaded)
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.error(err)}
      />
    );

  let content = <HomeScreen onStartGame={handleStartGame} />;

  function configureNewGame() {
    setGuessRounds(0);
    setUserNumber(null);
  }

  function handleStartGame(number) {
    setUserNumber(number);
    setGuessRounds(0);
  }

  function handleGameOver(numOfRounds) {
    setGuessRounds(numOfRounds);
  }

  if (userNumber && guessRounds <= 0)
    content = (
      <GameScreen userChoice={userNumber} onGameOver={handleGameOver} />
    );
  else if (guessRounds > 0)
    content = (
      <GameOverScreen
        rounds={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGame}
      />
    );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Guess a Number" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
});
