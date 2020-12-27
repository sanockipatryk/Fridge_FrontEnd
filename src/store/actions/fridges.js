import {
  SET_USER_FRIDGES_LOADING,
  SET_USER_FRIDGES,
  HANDLE_USER_FRIDGES_LOADING_ERROR,
} from "../constants";

export const setUserFridgesLoading = () => {
  return {
    type: SET_USER_FRIDGES_LOADING,
  };
};

export const setUserFridges = (data) => {
  return {
    type: SET_USER_FRIDGES,
    values: data,
  };
};

export const handleUserFridgesLoadingError = () => {
  return {
    type: HANDLE_USER_FRIDGES_LOADING_ERROR,
  };
};
