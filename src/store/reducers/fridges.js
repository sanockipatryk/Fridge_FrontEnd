import {
  SET_USER_FRIDGES_LOADING,
  SET_USER_FRIDGES,
  HANDLE_USER_FRIDGES_LOADING_ERROR,
  REQUEST_LOGOUT,
} from "../constants";

const initialState = {
  fridgesList: [],
  fridgesListLoading: false,
};

export const fridges = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_FRIDGES_LOADING:
      return {
        ...state,
        fridgesListLoading: true,
      };
    case SET_USER_FRIDGES:
      return {
        fridgesList: action.values,
        fridgesListLoading: false,
      };
    case HANDLE_USER_FRIDGES_LOADING_ERROR:
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
