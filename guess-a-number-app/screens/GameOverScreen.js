import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "../components/Button";
import Title from "../components/Title";
import BodyText from "../components/BodyText";

import Colors from "../constants/colors";

function GameOverScreen({ rounds, userNumber, onRestart }) {
  return (
    <View style={styles.container}>
      <Title>The game is over</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="cover"
          // source={require("../assets/success.png")}
          source={{
            uri:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWgAi_LMISHBg_Jn8jFuMeKJ0lkmkbnkOV5Q&usqp=CAU",
          }}
        />
      </View>
      <BodyText style={styles.text}>
        Your phone phone needed <Text style={styles.hightlight}>{rounds}</Text>{" "}
        to guess the number <Text style={styles.hightlight}>{userNumber}</Text>.
      </BodyText>
      <Button onPress={onRestart} style={styles.button}>
        New game
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.bgPrimary,
  },

  button: {
    paddingVertical: 10,
  },

  imageContainer: {
    width: 300,
    height: 300,
    marginVertical: 30,
    borderRadius: 150,
    borderColor: Colors.lightGrey,
    borderWidth: 4,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  text: {
    fontSize: 20,
    paddingBottom: 10,
    textAlign: "center",
    width: "100%",
    maxWidth: "80%",
  },

  hightlight: {
    fontSize: 22,
    color: Colors.lighterGrey,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
