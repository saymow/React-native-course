import React, { useState, useCallback, useReducer } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import Colors from "../../constants/Colors";
import * as AuthAction from "../../store/actions/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const UPDATE_FORM_INPUT = "UPDATE_FORM_INPUT";

const formReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM_INPUT: {
      const { name, text, isValid } = action.payload;
      const newValues = {
        ...state.values,
        [name]: { text, isValid },
      };
      const formIsValid = Object.keys(newValues).every(
        (key) => newValues[key].isValid
      );

      return {
        ...state,
        isValid: formIsValid,
        values: newValues,
      };
    }
    default:
      return state;
  }
};

const AuthScreen = () => {
  const dispatch = useDispatch();

  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [formState, formDispatch] = useReducer(formReducer, {
    values: {
      email: {
        text: "",
        isValid: false,
      },
      password: {
        text: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error ocurred", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const handleInputChange = useCallback(
    (name, text, isValid) => {
      formDispatch({
        type: UPDATE_FORM_INPUT,
        payload: { name, text, isValid },
      });
    },
    [formDispatch]
  );

  const handleAuth = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(
        isSignup
          ? AuthAction.signup(
              formState.values.email.text,
              formState.values.password.text
            )
          : AuthAction.login(
              formState.values.email.text,
              formState.values.password.text
            )
      );
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        {isLoading ? (
          <View>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          <Card style={styles.container}>
            <ScrollView>
              <Input
                id="email"
                onInputChange={handleInputChange}
                label="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                errorText="Please enter a valid email address"
                email
                required
              />
              <Input
                id="password"
                onInputChange={handleInputChange}
                label="Password"
                keyboardType="default"
                autoCapitalize="none"
                errorText="Please enter a valid password"
                secureTextEntry
                minLength={5}
                required
              />
              <View style={styles.buttonContainer}>
                <Button
                  title={isSignup ? "Sign Up" : "Login"}
                  color={Colors.primary}
                  onPress={handleAuth}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                  color={Colors.accent}
                  onPress={() => setIsSignup((prev) => !prev)}
                />
              </View>
            </ScrollView>
          </Card>
        )}
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  gradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 15,
  },

  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
