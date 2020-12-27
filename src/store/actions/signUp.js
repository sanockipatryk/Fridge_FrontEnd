import {
  SET_USER_SIGNING_UP,
  HANDLE_USER_SIGNING_UP_SUCCESS,
  HANDLE_USER_SIGNING_UP_ERROR,
} from "../constants";

export const setUserSigningUp = () => {
  return {
    type: SET_USER_SIGNING_UP,
  };
};

export const handleUserSigningUpSuccess = () => {
  return {
    type: HANDLE_USER_SIGNING_UP_SUCCESS,
  };
};

export const handleUserSigningUpError = () => {
  return {
    type: HANDLE_USER_SIGNING_UP_ERROR,
  };
};
