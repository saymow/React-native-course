import { MEALS } from "../../data/dummy-data";

import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/meals";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

export const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE: {
      let newFavoriteMeals = [];
      const mealId = action.payload.mealId;
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === mealId
      );

      if (existingIndex >= 0) {
        newFavoriteMeals = state.favoriteMeals.filter(
          (meal) => meal.id !== mealId
        );
      } else {
        const meal = state.meals.find((meal) => meal.id === mealId);
        newFavoriteMeals = [...state.favoriteMeals, meal];
      }

      return { ...state, favoriteMeals: newFavoriteMeals };
    }
    case SET_FILTERS: {
      const filters = action.payload.filters;
      let appliedFilters = Object.keys(filters)
        .filter((key) => filters[key])
        .map((filter) =>
          "is".concat(`${filter[0].toUpperCase()}${filter.substr(1)}`)
        ); // gluttenFree => isGluttenFree

      let newFilteredMeals = state.meals.filter((meal) => {
        let isValidMeal = appliedFilters.every(
          (filter) => meal[filter] === true
        );

        return isValidMeal;
      });

      return { ...state, filteredMeals: newFilteredMeals };
    }
    default:
      return state;
  }
};
