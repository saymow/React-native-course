import React from "react";
import MealList from "../components/MealList";
import { MEALS } from "../data/dummy-data";

function CategoryMealScreen({ route, navigation }) {
  const catId = route.params?.categoryId ?? "invalid";

  const displayedMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(catId)
  );

  return <MealList listData={displayedMeals} navigation={navigation} />;
}

export default CategoryMealScreen;
