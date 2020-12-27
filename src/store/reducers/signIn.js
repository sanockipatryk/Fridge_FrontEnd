import jwtDecode from "jwt-decode";
import { isTokenSet } from "../../config/tokenHelpers";
import {
  SET_USER_SIGNING_IN,
  SET_CURRENT_USER,
  HANDLE_USER_SIGNING_IN_ERROR,
  REQUEST_LOGOUT,
} from "../constants";

const getUserDataFromToken = () => {
  const { UserId, Email, FirstName, LastName } = jwtDecode(
    localStorage.getItem("authToken")
  );
  return { id: UserId, email: Email, firstName: FirstName, lastName: LastName };
};

const initialState = {
  isAuthenticated: isTokenSet(),
  user: isTokenSet() ? getUserDataFromToken() : {},
  userSigningIn: false,
};

export const signIn = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_SIGNING_IN:
      return {
        ...state,
        userSigningIn: true,
      };
    case SET_CURRENT_USER:
      const { id, email, firstName, lastName } = action.user;
      return {
        isAuthenticated: isTokenSet(),
        user: { id, email, firstName, lastName },
        userSigningIn: false,
      };
    case HANDLE_USER_SIGNING_IN_ERROR:
    case REQUEST_LOGOUT:
      return {
        isAuthenticated: false,
        user: {},
        userSigningIn: false,
      };
    default:
      return state;
  }
};
