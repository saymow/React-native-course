import React, { useEffect, useCallback } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DefaultText from "../components/DefaultText";
import { toggleFavorite } from "../store/actions/meals";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

function MealDetailsScreen({ route, navigation }) {
  const mealId = route.params.id ?? "invalid";
  const dispatch = useDispatch();

  const { meals } = useSelector((state) => state.meals);
  const isFavorited = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );

  const meal = meals.find((_meal) => _meal.id === mealId);

  const handleToggleFavorite = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  // useEffect(() => {
  //   navigation.setParams({ mealTitle: meal.title });
  // }, [meal]);

  useEffect(() => {
    navigation.setParams({ isFav: isFavorited });
  }, [isFavorited]);

  useEffect(() => {
    navigation.setParams({ toggleFav: handleToggleFavorite });
  }, [handleToggleFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{meal.duration}m</DefaultText>
        <DefaultText>{meal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{meal.affordability.toUpperCase()}</DefaultText>
      </View>

      <DefaultText style={styles.title}>Ingredients</DefaultText>
      {meal.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}

      <DefaultText style={styles.title}>Steps</DefaultText>
      {meal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
}

MealDetailsScreen.navigationOptions = (navigationData) => {};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },

  details: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
  },

  title: {
    fontSize: 22,
    fontFamily: "open-sans-bold",
    textAlign: "center",
  },

  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailsScreen;
