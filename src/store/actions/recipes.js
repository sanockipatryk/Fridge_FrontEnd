import {
  SET_USER_RECIPES_LOADING,
  GET_USER_RECIPES,
  HANDLE_USER_RECIPES_LOADING_ERROR,
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
