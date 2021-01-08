import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/actions/auth";

const StartupScreen = ({ onLoad }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userDataString = await AsyncStorage.getItem("user");
      const userData = JSON.parse(userDataString);

      if (!userData) return;

      console.log(userData);

      const { token, userId, expiryDate } = userData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate < new Date() || !token || !userId) return;

      const expiryTime = expirationDate.getTime() - new Date().getTime();

      dispatch(authenticate(userId, token, expiryTime));
    };

    tryLogin().then(() => onLoad());
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default StartupScreen;
