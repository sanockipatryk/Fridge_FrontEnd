import axios from "axios";
import {
  setUserRecipesLoading,
  getUserRecipes,
  handleUserRecipesLoadingError,
} from "../../../../../store/actions/recipes";

export const loadUserRecipes = (dispatch) => {
  dispatch(setUserRecipesLoading());

  axios
    .get("https://localhost:44356/api/Recipes/getUserRecipes")
    .then((response) => response.data)
    .then((data) => dispatch(getUserRecipes(data)))
    .catch(() => dispatch(handleUserRecipesLoadingError()));
};
