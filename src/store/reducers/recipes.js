import {
  SET_USER_RECIPES_LOADING,
  GET_USER_RECIPES,
  REQUEST_LOGOUT,
  HANDLE_USER_RECIPES_LOADING_ERROR,
} from "../constants";

const initialState = {
  recipesList: [],
  recipesListLoading: false,
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
        recipesList: action.values,
        recipesListLoading: false,
      };
    case HANDLE_USER_RECIPES_LOADING_ERROR:
      return {
        ...initialState,
      };
    case REQUEST_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
