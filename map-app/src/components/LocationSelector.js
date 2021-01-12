import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";
import { useEffect } from "react";

const LocationSelector = ({ onLocationSelected, ...props }) => {
  const mapSelectedLocation = props.route.params?.selectedLocation;

  const [selectedLocation, setSelectedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (mapSelectedLocation) {
      setSelectedLocation(mapSelectedLocation);
      onLocationSelected(mapSelectedLocation);
    }
  }, [mapSelectedLocation, onLocationSelected]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);

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

  const handleGetLocation = async () => {
    if (!(await verifyPermissions())) return;

    try {
      setIsFetching(true);

      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });

      setSelectedLocation({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      });
      props.onLocationSelected({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could not fetch location",
        "Please try again later, or picker a location on the map",
        [{ text: "Okay" }]
      );
    }

    setIsFetching(false);
  };

  const handlePickOnMap = async () => {
    props.navigation.navigate("MapScreen");
  };

  return (
    <View style={styles.container}>
      <MapPreview
        style={styles.preview}
        location={selectedLocation}
        onPress={handlePickOnMap}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No Location chosen yet</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get user location"
          color={Colors.primary}
          onPress={handleGetLocation}
        />
        <Button
          title="Pick on map"
          color={Colors.primary}
          onPress={handlePickOnMap}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },

  preview: {
    marginBottom: 15,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LocationSelector;
