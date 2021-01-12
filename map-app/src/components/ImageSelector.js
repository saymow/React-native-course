import React from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Colors from "../constants/Colors";
import { useState } from "react";

const ImageSelector = ({ onImageTaken }) => {
  const [pickedImage, setPickedImage] = useState(null);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA);

    if (result.status !== "granted") {
      Alert.alert(
        "Insuficient permissions",
        "You need to grant permissions to use this app.",
        { text: "Okay" }
      );

      return false;
    }

    return true;
  };

  const handleTakeImage = async () => {
    if (!(await verifyPermissions())) return;

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
    onImageTaken(image.uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickedImage ? (
          <Text>No image picked yet</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take image"
        color={Colors.primary}
        onPress={handleTakeImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 15,
  },

  preview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },

  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageSelector;
