import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";

import ENV from "../../env";

const MapPreview = ({ location, onPress, style, children }) => {
  let imagePreviewUrl;
  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lon}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lon}&key=${ENV.googleApiKey}`;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.container, ...style }}
    >
      {location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
