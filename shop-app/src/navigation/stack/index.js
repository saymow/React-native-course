import { Platform } from "react-native";
import Colors from "../../constants/Colors";

const ScreenOptions = {
  ios: {
    headerTintColor: Colors.primary,
  },
  android: {
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: "white",
  },
  common: {
    headerTitleStyle: {
      fontFamily: "open-sans-bold",
    },
    headerBackTitleStyle: {
      fontFamily: "open-sans",
    },
  },
};

export const StackScreenOptions = {
  ...ScreenOptions[Platform.OS],
  ...ScreenOptions.common,
};
