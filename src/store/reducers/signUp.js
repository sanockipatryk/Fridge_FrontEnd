import {
  SET_USER_SIGNING_UP,
  HANDLE_USER_SIGNING_UP_SUCCESS,
  HANDLE_USER_SIGNING_UP_ERROR,
} from "../constants";

const initialState = {
  userSigningUp: false,
};

export const signUp = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_SIGNING_UP:
      return {
        userSigningUp: true,
      };
    case HANDLE_USER_SIGNING_UP_SUCCESS:
    case HANDLE_USER_SIGNING_UP_ERROR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
