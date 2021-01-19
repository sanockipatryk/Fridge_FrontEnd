import {
  SET_USER_RECIPES_LOADING,
  GET_USER_RECIPES,
  REQUEST_LOGOUT,
  HANDLE_USER_RECIPES_LOADING_ERROR,
  SET_SUFFICIENT_INGREDIENTS_LOADING,
  SET_SUFFICIENT_INGREDIENTS_LOADING_ENDED,
  SET_ADDING_RECIPE,
  SET_ADDING_RECIPE_DONE,
  SET_DELETING_RECIPE,
  SET_DELETING_RECIPE_DONE,
} from "../constants";

const initialState = {
  recipesList: [],
  recipesListLoading: false,
  sufficientIngredientsLoading: false,
  addingRecipe: false,
  deletingRecipe: false,
};

export const recipes = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_RECIPES_LOADING:
      return {
        ...state,
        recipesListLoading: true,
      };
    case GET_USER_RECIPES:
      return {
        ...state,
        recipesList: action.values,
        recipesListLoading: false,
      };
    case HANDLE_USER_RECIPES_LOADING_ERROR:
      return {
        ...initialState,
      };
    case SET_ADDING_RECIPE:
      return {
        ...state,
        addingRecipe: true,
      };
    case SET_ADDING_RECIPE_DONE:
      return {
        ...state,
        addingRecipe: false,
      };
    case SET_DELETING_RECIPE:
      return {
        ...state,
        deletingRecipe: true,
      };
    case SET_DELETING_RECIPE_DONE:
      return {
        ...state,
        deletingRecipe: false,
      };
    case SET_SUFFICIENT_INGREDIENTS_LOADING:
      return {
        ...state,
        sufficientIngredientsLoading: true,
      };
    case SET_SUFFICIENT_INGREDIENTS_LOADING_ENDED:
      return {
        ...state,
        sufficientIngredientsLoading: false,
      };
    case REQUEST_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
