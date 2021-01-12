import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ navigation, route }) => {
  const initialLocation = route.params?.initialLocation;
  const readonly = route.params?.readonly;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  let markerCordinates;

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lon : 22.11,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleSelectedLocation = (e) => {
    if (readonly) return;
    setSelectedLocation({
      lat: e.nativeEvent.coordinate.latitude,
      lon: e.nativeEvent.coordinate.longitude,
    });
  };

  const handleSaveSelectedLocation = useCallback(() => {
    if (!selectedLocation) return;

    navigation.navigate({
      name: "NewPlaceScreen",
      params: { selectedLocation },
    });
  }, [selectedLocation]);

  useEffect(() => {
    navigation.setParams({ saveLocation: handleSaveSelectedLocation });
  }, [handleSaveSelectedLocation]);

  if (selectedLocation) {
    markerCordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lon,
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={handleSelectedLocation}
    >
      {markerCordinates && (
        <Marker title="Picked location" coordinate={markerCordinates} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapScreen;
