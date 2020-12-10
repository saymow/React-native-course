import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Colors from "../constants/colors";

const Button = ({ children, style, color = Colors.primary, ...rest }) => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={{ ...styles.buttonContainer, ...style }}>
      <ButtonComponent {...rest}>
        <View style={{ ...styles.container, backgroundColor: color }}>
          <Text style={styles.text}>{children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 4,
    overflow: "hidden",
  },

  container: {
    paddingVertical: 12,
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    borderRadius: 15,
  },

  text: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "open-sans",
    color: Colors.text,
  },
});

export default Button;
