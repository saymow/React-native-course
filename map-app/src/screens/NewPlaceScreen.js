import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  Button,
} from "react-native";
import Colors from "../constants/Colors";
import * as placesActions from "../store/places-actions";
import ImageSelector from "../components/ImageSelector";
import LocationSelector from "../components/LocationSelector";
import { useCallback } from "react";

const NewPlaceScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [location, setLocation] = useState();

  const handleTitleChange = (value) => setTitle(value);

  const handleImageTaken = (imagePath) => {
    setImage(imagePath);
  };

  const handleSelectedLocation = useCallback((loc) => {
    setLocation(loc);
  }, []);

  const handleSavePlace = () => {
    dispatch(placesActions.addPlace(title, image, location));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={handleTitleChange}
        />
        <ImageSelector onImageTaken={handleImageTaken} />
        <LocationSelector
          navigation={navigation}
          route={route}
          onLocationSelected={handleSelectedLocation}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={handleSavePlace}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },

  label: {
    fontSize: 18,
    marginBottom: 15,
  },

  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
