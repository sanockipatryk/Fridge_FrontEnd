import axios from "axios";
import {
  setUserFridgesLoading,
  setUserFridges,
  handleUserFridgesLoadingError,
} from "../../../../../store/actions/fridges";

export const loadUserFridges = (dispatch) => {
  dispatch(setUserFridgesLoading());

  axios
    .get("https://localhost:44356/api/Fridges/getUserFridges")
    .then((response) => response.data)
    .then((data) => dispatch(setUserFridges(data)))
    .catch(() => dispatch(handleUserFridgesLoadingError()));
};
