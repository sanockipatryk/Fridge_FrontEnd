import { GET_INGREDIENTS, GET_INGREDIENT_CATEGORIES } from "../constants";

export const getIngredients = (data) => {
  return {
    type: GET_INGREDIENTS,
    values: data,
  };
};

export const getIngredientCategories = (data) => {
  return {
    type: GET_INGREDIENT_CATEGORIES,
    values: data,
  };
};
