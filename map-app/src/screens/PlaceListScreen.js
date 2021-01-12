import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PlaceItem from "../components/PlaceItem";
import * as placesActions from "../store/places-actions";
import { useEffect } from "react";

const PlaceListScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, []);

  const { places } = useSelector((state) => state.placeList);

  const handleItemNavigation = (id, title) => {
    props.navigation.navigate({
      name: "PlaceDetailsScreen",
      params: {
        id,
        title,
      },
    });
  };

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() =>
            handleItemNavigation(itemData.item.id, itemData.item.title)
          }
        />
      )}
    />
  );
};

export default PlaceListScreen;

const styles = StyleSheet.create({});
