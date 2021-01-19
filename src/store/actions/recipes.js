import {
  SET_USER_RECIPES_LOADING,
  GET_USER_RECIPES,
  HANDLE_USER_RECIPES_LOADING_ERROR,
  SET_SUFFICIENT_INGREDIENTS_LOADING,
  SET_SUFFICIENT_INGREDIENTS_LOADING_ENDED,
  SET_ADDING_RECIPE,
  SET_ADDING_RECIPE_DONE,
  SET_DELETING_RECIPE,
  SET_DELETING_RECIPE_DONE,
} from "../constants";

export const setUserRecipesLoading = () => {
  return {
    type: SET_USER_RECIPES_LOADING,
  };
};

export const getUserRecipes = (data) => {
  return {
    type: GET_USER_RECIPES,
    values: data,
  };
};

export const handleUserRecipesLoadingError = () => {
  return {
    type: HANDLE_USER_RECIPES_LOADING_ERROR,
  };
};

export const setAddingRecipe = () => {
  return {
    type: SET_ADDING_RECIPE,
  };
};
export const setAddingRecipeDone = () => {
  return {
    type: SET_ADDING_RECIPE_DONE,
  };
};

export const setDeletingRecipe = () => {
  return {
    type: SET_DELETING_RECIPE,
  };
};
export const setDeletingRecipeDone = () => {
  return {
    type: SET_DELETING_RECIPE_DONE,
  };
};

export const setSufficientIngredientsLoading = () => {
  return {
    type: SET_SUFFICIENT_INGREDIENTS_LOADING,
  };
};

export const setSufficientIngredientsLoadingEnded = () => {
  return {
    type: SET_SUFFICIENT_INGREDIENTS_LOADING_ENDED,
  };
};
