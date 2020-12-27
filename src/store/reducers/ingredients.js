import { GET_INGREDIENTS, GET_INGREDIENT_CATEGORIES } from "../constants";

const initialState = {
  ingredientsList: [],
  ingredientsCategoriesList: [],
};

export const ingredients = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_INGREDIENT_CATEGORIES:
      return {
        ...state,
        ingredientsCategoriesList: action.values,
      };
    case GET_INGREDIENTS:
      return {
        ...state,
        ingredientsList: action.values,
      };
    default:
      return state;
  }
};
