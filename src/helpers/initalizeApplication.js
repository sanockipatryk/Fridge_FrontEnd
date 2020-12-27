import axios from "axios";
import {
  getIngredients,
  getIngredientCategories,
} from "../store/actions/ingredients";

export const initalizeIngredientCategories = (dispatch) => {
  axios
    .get("https://localhost:44356/api/IngredientCategories")
    .then((response) => response.data)
    .then((data) => dispatch(getIngredientCategories(data)))
    .catch((err) => console.log(err));
};

export const initalizeIngredients = (dispatch) => {
  axios
    .get("https://localhost:44356/api/Ingredients")
    .then((response) => response.data)
    .then((data) => dispatch(getIngredients(data)))
    .catch((err) => console.log(err));
};

export default async function initalizeApplication(dispatch) {
  initalizeIngredientCategories(dispatch);
  initalizeIngredients(dispatch);
}
