import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import Button from "../components/Button";
import Title from "../components/Title";
import BodyText from "../components/BodyText";

import Colors from "../constants/colors";

function GameOverScreen({ rounds, userNumber, onRestart }) {
  const [imageSize, setImageSize] = useState(
    Dimensions.get("window").width *
      0.9 *
      ((Dimensions.get("window").height * 0.8) /
        Dimensions.get("window").height)
  );

  useEffect(() => {
    const updateLayout = () => {
      setImageSize(
        Dimensions.get("window").width *
          0.9 *
          ((Dimensions.get("window").height * 0.8) /
            Dimensions.get("window").height)
      );
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  }, [Dimensions]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title>The game is over</Title>
        <View
          style={{
            ...styles.imageContainer,
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
          }}
        >
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
          Your phone phone needed{" "}
          <Text style={styles.hightlight}>{rounds}</Text> to guess the number{" "}
          <Text style={styles.hightlight}>{userNumber}</Text>.
        </BodyText>
        <Button onPress={onRestart} style={styles.button}>
          New game
        </Button>
      </View>
    </ScrollView>
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
    width:
      Dimensions.get("window").width *
      0.9 *
      ((Dimensions.get("window").height * 0.9) /
        Dimensions.get("window").height),
    height:
      Dimensions.get("window").width *
      0.9 *
      ((Dimensions.get("window").height * 0.9) /
        Dimensions.get("window").height),
    borderRadius:
      (Dimensions.get("window").width *
        0.9 *
        ((Dimensions.get("window").height * 0.9) /
          Dimensions.get("window").height)) /
      2,
    marginVertical: Dimensions.get("window").height * 0.05,
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
