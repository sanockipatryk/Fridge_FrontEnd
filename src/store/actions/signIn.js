import {
  SET_USER_SIGNING_IN,
  SET_CURRENT_USER,
  HANDLE_USER_SIGNING_IN_ERROR,
  REQUEST_LOGOUT,
} from "../constants";

export const setUserSigningIn = () => {
  return {
    type: SET_USER_SIGNING_IN,
  };
};

export const signIn = (user) => {
  return {
    type: SET_CURRENT_USER,
    user: user,
  };
};

export const handleUserSigningInError = () => {
  return {
    type: HANDLE_USER_SIGNING_IN_ERROR,
  };
};

export const requestLogout = () => {
  return {
    type: REQUEST_LOGOUT,
  };
};
