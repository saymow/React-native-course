import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import Title from "../components/Title";
import Colors from "../constants/colors";

function Home({ onStartGame }) {
  const [enteredValue, setEnteredValue] = useState();
  const [selectedNumber, setSelectedNumber] = useState();
  const [confirmed, setConfirmed] = useState(false);

  let confirmedOutput;

  const handleNumberInput = (text) => {
    setEnteredValue(text.replace(/[^0-9]/g, ""));
  };

  const handleResetNumberInput = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const handleConfirmNumberInput = () => {
    const chosenNumber = parseInt(enteredValue);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid number!", "Number has to be between 0 and 99", [
        { text: "ok", style: "destructive", onPress: handleResetNumberInput },
      ]);
      return;
    }

    setConfirmed(true);
    setEnteredValue(""); // As these changing react state is in batch, there is no problem here
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss();
  };

  if (confirmed) {
    confirmedOutput = (
      <View>
        <Text style={styles.confirmText}>You selected</Text>
        <NumberContainer
          style={styles.numberContainer}
          number={selectedNumber}
        />

        <View style={styles.buttonContainer}>
          <Button
            style={styles.resetButtonContainer}
            color="red"
            onPress={handleResetNumberInput}
          >
            Go Back
          </Button>
          <Button
            color="green"
            style={styles.confirmButtonContainer}
            onPress={() => onStartGame(selectedNumber)}
          >
            Continue
          </Button>
        </View>
      </View>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.container}>
            <Title style={styles.title}>Start your game</Title>
            <Card style={styles.main}>
              {confirmedOutput ? (
                confirmedOutput
              ) : (
                <>
                  <Input
                    label="Select a number"
                    style={{
                      container: styles.inputContainer,
                      input: styles.input,
                      label: styles.label,
                    }}
                    blurOnSubmit
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="number-pad"
                    onChangeText={handleNumberInput}
                    value={enteredValue}
                    maxLength={2}
                  />
                  <View style={styles.buttonContainer}>
                    <Button
                      style={styles.resetButtonContainer}
                      color="red"
                      onPress={handleResetNumberInput}
                    >
                      Reset
                    </Button>
                    <Button
                      color="green"
                      style={styles.confirmButtonContainer}
                      onPress={handleConfirmNumberInput}
                    >
                      Confirm
                    </Button>
                  </View>
                </>
              )}
            </Card>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginVertical: 10,
  },

  main: {
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    paddingVertical: 5,
  },

  inputContainer: {
    paddingVertical: 10,
  },

  input: {
    width: 50,
    textAlign: "center",
    alignSelf: "center",
  },

  label: {
    textAlign: "center",
  },

  buttonContainer: {
    marginVertical: 10,
    flexDirection: "row",
    width: "100%",
  },

  resetButtonContainer: {
    flex: 2,
  },

  confirmButtonContainer: {
    flex: 3,
  },

  confirmText: {
    fontSize: 24,
    color: Colors.text,
    textAlign: "center",
    paddingVertical: 10,
  },

  numberContainer: {
    alignSelf: "center",
  },
});

export default Home;
